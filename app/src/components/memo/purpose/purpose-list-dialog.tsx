import { List } from "@mui/material";
import { useState, VFC, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeEditPurpose, fetchAsyncCreatePurpose, fetchAsyncLogicalDeletePurpose, fetchAsyncPatchPurpose, resetEditPurpose, selectPurposeOptions } from "../../../slices/memo/purposeSlice";
import { PurposeEditorDialog } from "./purpose-editor-dialog";
import { MemoEmojiIcon } from "../commons/icon/memo-emoji-icon";
import { MemoDialog } from "../commons/dialog/memo-dialog";
import { MemoAddButton } from "../commons/button/memo-add-button";
import { MemoPurposeIcon } from "../commons/icon/memo-purpose-icon";
import { Purpose } from "../../../types/memo/purpose";
import { MemoDialogListItem } from "../commons/list/memo-dialog-list-item";
import { NewPurposeButton } from "./purpose-new-purpose-button";
import { UpdatePurposeButton } from "./purpose-update-purpose-button";
import { selectSelectNote } from "../../../slices/memo/noteSlice";
import { PurposeDeleteDialog } from "./purpose-delete-dialog";
import { DeletePurposeButton } from "./purpose-delete-purpose-button";

interface PurposeListDialogProps  {
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
}

export const PurposeListDialog: VFC<PurposeListDialogProps> = (props) => {
    const {isOpen, onClose, ...other} = props;
    const dispatch = useDispatch();
    const [isOpenNewPurposeEditor, setIsOpenNewPurposeEditor] = useState<boolean>(false);
    const [isOpenUpdatePurposeEditor, setIsOpenUpdatePurposeEditor] = useState<boolean>(false);
    const [isOpenDeletePurposeEditor, setIsOpenDeletePurposeEditor] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const purposeOptions = useSelector(selectPurposeOptions);
    const newPurposeEditor = "newPurposeEditor"
    const editPurposeEditor = "editPurposeEditor"
    const selectNote = useSelector(selectSelectNote)


    const editButtonClick = (purpose: Purpose) => {
        dispatch(changeEditPurpose({
            purposeId: purpose.purposeId,
            purposeName: purpose.purposeName,
            purposeIcon: purpose.purposeIcon,
            note: purpose.note,
        }));
        setIsOpenUpdatePurposeEditor(true)
    }
    
    const deleteButtonClick = (purpose: Purpose) => {
        dispatch(changeEditPurpose({
            purposeId: purpose.purposeId,
            purposeName: purpose.purposeName,
            purposeIcon: purpose.purposeIcon,
            note: purpose.note,
        }));
        setIsOpenDeletePurposeEditor(true)
    }

    const onClickDelete = (purposeId: string) => {
        dispatch(fetchAsyncLogicalDeletePurpose(purposeId));
        setIsOpenDeletePurposeEditor(false)
    }

    const newButtonClick = () => {
        dispatch(resetEditPurpose());
        dispatch(changeEditPurpose({note: selectNote.noteId}))
        setIsOpenNewPurposeEditor(true);
    }

    return (
        <>
            <MemoDialog
                isOpen={isOpen}
                onClose={onClose}
                headerTitle="目的エディタ"
                footerButton={
                    <MemoAddButton
                        toolTipTitle="目的追加" 
                        onClickAction={()=> newButtonClick()}
                    >
                        追加
                    </MemoAddButton>}
            >
                <List
                    sx={{ bgcolor: "Background.paper"}}
                >
                    {purposeOptions.map((purpose) => {
                        return (
                            <MemoDialogListItem
                                listItemIcon={
                                    <MemoEmojiIcon 
                                        emojiId={purpose.purposeIcon} 
                                        emojiSize={22}
                                        defaultIcon={<MemoPurposeIcon fontSize="small" />}
                                    />}
                                listText={purpose.purposeName}
                                itemData={purpose}
                                editButtonClick={editButtonClick}
                                deleteButtonClick={deleteButtonClick}
                            />
                        )
                    })}
                </List>

            </MemoDialog>

            <PurposeEditorDialog
                headerTitle="目的新規追加"
                isOpen={isOpenNewPurposeEditor}
                onClose={setIsOpenNewPurposeEditor}
                footerButton={
                    <NewPurposeButton
                        formId={newPurposeEditor}
                    />}
                formId={newPurposeEditor}
                onSubmitAsyncThunk={fetchAsyncCreatePurpose}
                />

            <PurposeEditorDialog
                headerTitle="目的編集"
                isOpen={isOpenUpdatePurposeEditor}
                onClose={setIsOpenUpdatePurposeEditor}
                footerButton={
                    <UpdatePurposeButton
                        formId={editPurposeEditor}
                    />}
                formId={editPurposeEditor}
                onSubmitAsyncThunk={fetchAsyncPatchPurpose}
                />

            <PurposeDeleteDialog
                headerTitle="目的削除"
                isOpen={isOpenDeletePurposeEditor}
                onClose={setIsOpenDeletePurposeEditor}
                footerButton={
                    <DeletePurposeButton
                        formId={editPurposeEditor}
                        onClick={onClickDelete}
                    />}
                formId={editPurposeEditor}
            />

        </>
    );
};