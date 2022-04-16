import type { VFC, ReactNode } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEditMemoCategory, fetchAsyncCreateChildMemoCategory, fetchAsyncLogicalDeleteChildMemoCategory, fetchAsyncPatchChildMemoCategory, resetEditMemoCategory, selectChildMemoCategoryOptions, selectSelectParentMemoCategory } from "../../../../slices/memo/memoCategorySlice";
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


interface ChildMemoCategoryListDialogProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
  }

export const ChildMemoCategoryListDialog: VFC<ChildMemoCategoryListDialogProps> = (props) => {
    const {children, isOpen, onClose, ...other} = props;
    const dispatch = useDispatch();
    const childMemoCategoryOptions = useSelector(selectChildMemoCategoryOptions);
    const [isNewChildMemoCategoryOpen, setIsNewChildMemoCategoryOpen] = useState<boolean>(false);
    const [isUpdateChildMemoCategoryOpen, setIsUpdateChildMemoCategoryOpen] = useState<boolean>(false);
    const [isDeleteChildMemoCategoryOpen, setIsDeleteChildMemoCategoryOpen] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);

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
}