import { useState, VFC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectParentMemoCategoryOptions, fetchAsyncGetChildMemoCategoriesFilter, changeSelectParentMemoCategory,  selectSelectParentMemoCategory,  changeEditMemoCategory, resetEditMemoCategory, fetchAsyncCreateParentMemoCategory, fetchAsyncPatchParentMemoCategory, fetchAsyncLogicalDeleteParentMemoCategory, resetSelectChildMemoCategory, selectIsParentMemoCategoryNewEditorOpen, setIsParentMemoCategoryNewEditorOpen, resetIsParentMemoCategoryNewEditorOpen} from "../../../../slices/memo/memoCategorySlice";
import {ParentMemoCategory as ParentMemo} from "../../../../types/memo/memoCategory";
import { MemoCategoryList } from "../memo-category-list";
import { MemoAddButton } from "../../commons/button/memo-add-button";
import { ParentMemoCategoryEditorDialog } from "./parent-memo-category-editor-dialog";
import { selectSelectNote } from "../../../../slices/memo/noteSlice";
import { MemoSubmitButton } from "../../commons/button/memo-submit-button";
import { MemoCategoryDeleteDialog } from "../memo-category-delete-dialog";
import { DeleteMemoCategoryButton } from "../memo-category-delete-memo-category-button";
import { resetMemoOption } from "../../../../slices/memo/memoSlice";


export const ParentMemoCategory: VFC = () => {
    const dispatch = useDispatch();
    const parentMemoCategoryOptions = useSelector(selectParentMemoCategoryOptions);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);
    const isNewParentMemoCategoryOpen = useSelector(selectIsParentMemoCategoryNewEditorOpen);
    const [isUpdateParentMemoCategoryOpen, setIsUpdateParentMemoCategoryOpen] = useState<boolean>(false);
    const [isDeleteParentMemoCategoryOpen, setIsDeleteParentMemoCategoryOpen] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const isSelectNote = selectNote.noteId

    const onCloseNewParentMemoCategoryDialog = (isOpen: boolean) => {
        dispatch(resetIsParentMemoCategoryNewEditorOpen())
    }

    const onClickListItem = (parentMemoCategory: ParentMemo) => {
        if (parentMemoCategory.memoCategoryId !== selectParentMemoCategory.memoCategoryId){
            dispatch(resetMemoOption());
            dispatch(resetSelectChildMemoCategory());
        }
        dispatch(changeSelectParentMemoCategory(parentMemoCategory));
        dispatch(fetchAsyncGetChildMemoCategoriesFilter(parentMemoCategory.memoCategoryId));
    }
    
    const onClickAddButton = () => {
        dispatch(resetEditMemoCategory())
        dispatch(changeEditMemoCategory({note: selectNote.noteId}))
        dispatch(setIsParentMemoCategoryNewEditorOpen())
    }

    const onClickUpdateProperty = (parentMemoCategory: ParentMemo) => {
        dispatch(changeEditMemoCategory({
            memoCategoryId: parentMemoCategory.memoCategoryId,
            memoCategoryName: parentMemoCategory.memoCategoryName,
            memoCategoryIcon: parentMemoCategory.memoCategoryIcon,
            note: parentMemoCategory.note,
        }))
        setIsUpdateParentMemoCategoryOpen(true)
    }

    const onClickDeleteProperty = (parentMemoCategory: ParentMemo) => {
        dispatch(changeEditMemoCategory({
            memoCategoryId: parentMemoCategory.memoCategoryId,
            memoCategoryName: parentMemoCategory.memoCategoryName,
            memoCategoryIcon: parentMemoCategory.memoCategoryIcon,
            note: parentMemoCategory.note,
        }))
        setIsDeleteParentMemoCategoryOpen(true)
    }

    const onClickDeleteButton = (parentMemoCategoryId: string) => {
        dispatch(fetchAsyncLogicalDeleteParentMemoCategory(parentMemoCategoryId));
        setIsDeleteParentMemoCategoryOpen(false)
    }

    return (
        <>
        
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                }}
            >
                <Box>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                        align="center"
                        sx={{py:1}}
                    >
                        親カテゴリ
                    </Typography>
                    <Divider />
                </Box>
                {isSelectNote
                    ?
                        <>
                            <Box
                                sx={{
                                    overflow: 'scroll',
                                    height: "90%",
                                }}
                            >
                                <MemoCategoryList
                                    memoCategoryOptions={parentMemoCategoryOptions}
                                    selectMemoCategory={selectParentMemoCategory}
                                    onClickListItem={onClickListItem}
                                    onClickUpdateProperty={onClickUpdateProperty}
                                    onClickDeleteProperty={onClickDeleteProperty}
                                />
                            </Box>

                            <Box
                                sx={{
                                    p: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "10%",
                                }}
                            >
                                <MemoAddButton
                                    toolTipTitle="新規追加"
                                    onClickAction={onClickAddButton}
                                >
                                    <Box sx={{mx:1}} >
                                        <Typography>
                                            追加
                                        </Typography>
                                    </Box>
                                </MemoAddButton>
                            </Box>

                        </>
                    :
                        <Box sx={{
                            width:280,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Typography
                                color="textSecondary"
                                variant="body1"    
                            >
                                ノートを選択してください。
                            </Typography>
                        </Box>
                }
            </Box>

            <ParentMemoCategoryEditorDialog
                headerTitle="新規追加"
                isOpen={isNewParentMemoCategoryOpen}
                onClose={onCloseNewParentMemoCategoryDialog}
                footerButton={
                    <MemoSubmitButton
                        form="newparent"
                        toolTipTitle="submit"
                    >
                        New
                    </MemoSubmitButton>
                }
                formId="newparent"
                onSubmitAsyncThunk={fetchAsyncCreateParentMemoCategory}
            />

            <ParentMemoCategoryEditorDialog
                headerTitle="編集"
                isOpen={isUpdateParentMemoCategoryOpen}
                onClose={setIsUpdateParentMemoCategoryOpen}
                footerButton={
                    <MemoSubmitButton
                        form="updateparent"
                        toolTipTitle="submit"
                    >
                        Update
                    </MemoSubmitButton>
                }
                formId="updateparent"
                onSubmitAsyncThunk={fetchAsyncPatchParentMemoCategory}
            />

            <MemoCategoryDeleteDialog
                headerTitle="メモカテゴリ削除"
                isOpen={isDeleteParentMemoCategoryOpen}
                onClose={setIsDeleteParentMemoCategoryOpen}
                footerButton={
                    <DeleteMemoCategoryButton
                        formId="memoCategoryDel"
                        onClick={onClickDeleteButton}
                    />}
                formId="memoCategoryDel"
            />
            
        </>
    );
};