import type { VFC, ReactNode } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEditMemoCategory, fetchAsyncCreateChildMemoCategory, fetchAsyncLogicalDeleteChildMemoCategory, fetchAsyncPatchChildMemoCategory, resetEditMemoCategory, resetIsChildMemoCategoryNewEditorOpen, selectChildMemoCategoryOptions, selectIsChildMemoCategoryNewEditorOpen, selectSelectChildMemoCategory, selectSelectParentMemoCategory, setIsChildMemoCategoryNewEditorOpen } from "../../../../slices/memo/memoCategorySlice";
import { selectSelectNote } from "../../../../slices/memo/noteSlice";
import { MemoCategoryDeleteDialog } from "../memo-category-delete-dialog";
import {ChildMemoCategory as ChildMemo} from "../../../../types/memo/memoCategory";
import { MemoDialog } from "../../commons/dialog/memo-dialog";
import { MemoAddButton } from "../../commons/button/memo-add-button";
import { List } from "@mui/material";
import { MemoSubmitButton } from "../../commons/button/memo-submit-button";
import { DeleteMemoCategoryButton } from "../memo-category-delete-memo-category-button";
import { MemoDialogListItem } from "../../commons/list/memo-dialog-list-item";
import { MemoEmojiIcon } from "../../commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../../commons/icon/memo-category-icon";
import { ChildMemoCategoryEditorDialog } from "./child-memo-category-editor-dialog";
import { resetMemoOption } from "../../../../slices/memo/memoSlice";


interface ChildMemoCategoryListDialogProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
  }

export const ChildMemoCategoryListDialog: VFC<ChildMemoCategoryListDialogProps> = (props) => {
    const {children, isOpen, onClose, ...other} = props;
    const dispatch = useDispatch();
    const childMemoCategoryOptions = useSelector(selectChildMemoCategoryOptions);
    const selectChildMemoCategory = useSelector(selectSelectChildMemoCategory);
    const isNewChildMemoCategoryOpen = useSelector(selectIsChildMemoCategoryNewEditorOpen);
    const [isUpdateChildMemoCategoryOpen, setIsUpdateChildMemoCategoryOpen] = useState<boolean>(false);
    const [isDeleteChildMemoCategoryOpen, setIsDeleteChildMemoCategoryOpen] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);

    const onCloseNewChildMemoCategoryDialog = (isOpen: boolean) => {
        // isOpenはダミー
        dispatch(resetIsChildMemoCategoryNewEditorOpen())
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
            <MemoDialog
                isOpen={isOpen}
                onClose={onClose}
                headerTitle="子カテゴリエディタ"
                footerButton={
                    <MemoAddButton 
                        toolTipTitle="子カテゴリ追加"
                        onClickAction={() => onClickAddButton()}
                    >
                        追加
                    </MemoAddButton>}
            >

                <List
                    sx={{
                        bgcolor: "Background.paper",    
                    }}
                >
                    {childMemoCategoryOptions.map((option) => {
                        return (
                            <MemoDialogListItem
                                listItemIcon={
                                    option.memoCategoryIcon
                                        ?
                                            <MemoEmojiIcon
                                                emojiId={option.memoCategoryIcon}
                                                emojiSize={22}
                                            />
                                        :
                                            <MemoCategoryIcon fontSize="medium" />
                                }
                                listText={option.memoCategoryName}
                                itemData={option}
                                editButtonClick={onClickUpdateProperty}
                                deleteButtonClick={onClickDeleteProperty}
                            />
                        )
                    })}
                </List>

            </MemoDialog>


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
}