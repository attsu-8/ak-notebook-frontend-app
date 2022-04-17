import { useState, VFC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectChildMemoCategoryOptions, selectSelectChildMemoCategory,  changeEditMemoCategory, resetEditMemoCategory, fetchAsyncCreateChildMemoCategory, changeSelectChildMemoCategory, selectSelectParentMemoCategory, fetchAsyncLogicalDeleteChildMemoCategory, fetchAsyncPatchChildMemoCategory, selectIsChildMemoCategoryNewEditorOpen, resetIsChildMemoCategoryNewEditorOpen, setIsChildMemoCategoryNewEditorOpen } from "../../../../slices/memo/memoCategorySlice";
import { ChildMemoCategory as ChildMemo} from "../../../../types/memo/memoCategory";
import { MemoCategoryList } from "../memo-category-list";
import { MemoAddButton } from "../../commons/button/memo-add-button";
import { ChildMemoCategoryEditorDialog } from "./child-memo-category-editor-dialog";
import { selectSelectNote } from "../../../../slices/memo/noteSlice";
import { fetchAsyncGetMemosFilter, resetMemoOption, setIsMemoNextPageLoading } from "../../../../slices/memo/memoSlice";
// import { fetchAsyncGetPurposesFilter } from "../../../../slices/memo/purposeSlice";
import { MemoSubmitButton } from "../../commons/button/memo-submit-button";
import { DeleteMemoCategoryButton } from "../memo-category-delete-memo-category-button";
import { MemoCategoryDeleteDialog } from "../memo-category-delete-dialog";

export const ChildMemoCategory: VFC = () => {
    const dispatch = useDispatch();
    const childMemoCategoryOptions = useSelector(selectChildMemoCategoryOptions);
    const selectChildMemoCategory = useSelector(selectSelectChildMemoCategory);
    const isNewChildMemoCategoryOpen = useSelector(selectIsChildMemoCategoryNewEditorOpen);
    const [isUpdateChildMemoCategoryOpen, setIsUpdateChildMemoCategoryOpen] = useState<boolean>(false);
    const [isDeleteChildMemoCategoryOpen, setIsDeleteChildMemoCategoryOpen] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory)
    const isSelectParentMemoCategory = selectParentMemoCategory.memoCategoryId
    
    const onCloseNewChildMemoCategoryDialog = (isOpen: boolean) => {
        // isOpenはダミー
        dispatch(resetIsChildMemoCategoryNewEditorOpen())
    }

    const onClickListItem = (childMemoCategory: ChildMemo) => {
        dispatch(resetMemoOption())
        dispatch(changeSelectChildMemoCategory(childMemoCategory))
        dispatch(fetchAsyncGetMemosFilter({
            parentMemoCategoryId: childMemoCategory.parentMemoCategory,
            childMemoCategoryId: childMemoCategory.memoCategoryId
        }))
        dispatch(setIsMemoNextPageLoading())
        // dispatch(fetchAsyncGetPurposesFilter(childMemoCategory.note))
    }

    const onClickAddButton = () => {
        dispatch(resetEditMemoCategory())
        dispatch(changeEditMemoCategory({
            note: selectNote.noteId,
            parentMemoCategory: selectParentMemoCategory.memoCategoryId 
        }))
        dispatch(setIsChildMemoCategoryNewEditorOpen())
    }

    const onClickUpdateProperty = (childMemoCategory: ChildMemo) => {
        dispatch(changeEditMemoCategory({
            memoCategoryId: childMemoCategory.memoCategoryId,
            memoCategoryName: childMemoCategory.memoCategoryName,
            memoCategoryIcon: childMemoCategory.memoCategoryIcon,
            note: childMemoCategory.note,
        }))
        setIsUpdateChildMemoCategoryOpen(true)
    }

    const onClickDeleteProperty = (childMemoCategory: ChildMemo) => {
        dispatch(changeEditMemoCategory({
            memoCategoryId: childMemoCategory.memoCategoryId,
            memoCategoryName: childMemoCategory.memoCategoryName,
            memoCategoryIcon: childMemoCategory.memoCategoryIcon,
            note: childMemoCategory.note,
            parentMemoCategory: childMemoCategory.parentMemoCategory,
        }))
        setIsDeleteChildMemoCategoryOpen(true)
    }

    const onClickDeleteButton = async (childMemoCategoryId: string) => {
        const result: any = await dispatch(fetchAsyncLogicalDeleteChildMemoCategory(childMemoCategoryId));
        if (fetchAsyncLogicalDeleteChildMemoCategory.fulfilled.match(result)) {
            if (selectChildMemoCategory.memoCategoryId === childMemoCategoryId) {
                dispatch(resetMemoOption())
            }
        }
        setIsDeleteChildMemoCategoryOpen(false)
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
                        子カテゴリ
                    </Typography>
                    <Divider />
                </Box>
                {isSelectParentMemoCategory
                    ?
                        <>
                            <Box
                                sx={{
                                    overflow: 'scroll',
                                    height: "90%",
                                }}
                            >
                                <MemoCategoryList
                                    memoCategoryOptions={childMemoCategoryOptions}
                                    selectMemoCategory={selectChildMemoCategory}
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
                                    <Box
                                        sx={{mx:1}}
                                    >
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
                                親カテゴリを選択してください。
                            </Typography>
                        </Box>
                }
            </Box>

            <ChildMemoCategoryEditorDialog
                headerTitle="子カテゴリ新規追加"
                isOpen={isNewChildMemoCategoryOpen}
                onClose={onCloseNewChildMemoCategoryDialog}
                footerButton={
                    <MemoSubmitButton
                        form="newChild"
                        toolTipTitle="submit"
                    >
                        New
                    </MemoSubmitButton>
                }
                formId="newChild"
                onSubmitAsyncThunk={fetchAsyncCreateChildMemoCategory}
            />

            <ChildMemoCategoryEditorDialog
                headerTitle="子カテゴリ編集"
                isOpen={isUpdateChildMemoCategoryOpen}
                onClose={setIsUpdateChildMemoCategoryOpen}
                footerButton={
                    <MemoSubmitButton
                        form="updatechild"
                        toolTipTitle="submit"
                    >
                        Update
                    </MemoSubmitButton>
                }
                formId="updatechild"
                onSubmitAsyncThunk={fetchAsyncPatchChildMemoCategory}
            />

            <MemoCategoryDeleteDialog
                headerTitle="子カテゴリ削除"
                isOpen={isDeleteChildMemoCategoryOpen}
                onClose={setIsDeleteChildMemoCategoryOpen}
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