import { useState, VFC } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectChildMemoCategoryOptions, selectSelectChildMemoCategory,  changeEditMemoCategory, resetEditMemoCategory, fetchAsyncCreateChildMemoCategory, changeSelectChildMemoCategory, selectSelectParentMemoCategory, fetchAsyncLogicalDeleteChildMemoCategory, fetchAsyncPatchChildMemoCategory } from "../../../../slices/memo/memoCategorySlice";
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
    const [isNewChildMemoCategoryOpen, setIsNewChildMemoCategoryOpen] = useState<boolean>(false);
    const [isUpdateChildMemoCategoryOpen, setIsUpdateChildMemoCategoryOpen] = useState<boolean>(false);
    const [isDeleteChildMemoCategoryOpen, setIsDeleteChildMemoCategoryOpen] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory)
    const isSelectParentMemoCategory = selectParentMemoCategory.memoCategoryId

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
        setIsNewChildMemoCategoryOpen(true);
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

    const onClickDeleteButton = (childMemoCategoryId: string) => {
        dispatch(fetchAsyncLogicalDeleteChildMemoCategory(childMemoCategoryId));
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
                                    mt: "auto",
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
                        <Box
                        sx={{width:280}}
                        >
                            choose a parent memo category
                        </Box>
                }
            </Box>

            <ChildMemoCategoryEditorDialog
                headerTitle="新規追加"
                isOpen={isNewChildMemoCategoryOpen}
                onClose={setIsNewChildMemoCategoryOpen}
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
                headerTitle="編集"
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
                headerTitle="メモカテゴリ削除"
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