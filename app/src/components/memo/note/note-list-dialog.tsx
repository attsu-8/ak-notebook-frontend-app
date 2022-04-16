import type { VFC, ReactNode } from "react";
import { useState } from "react";
import { changeEditNote, fetchAsyncPatchNote, fetchAsyncCreateNote, resetEditNote,  selectNoteOptions, fetchAsyncLogicalDeleteNote, selectEditNote } from "../../../slices/memo/noteSlice";
import { MemoDialog } from "../commons/dialog/memo-dialog";
import { List } from "@mui/material"
import { MemoDialogListItem } from "../commons/list/memo-dialog-list-item";
import { MemoNoteIcon } from "../commons/icon/memo-note-icon";
import { MemoAddButton } from "../commons/button/memo-add-button";
import { NoteEditorDialog } from "./note-editor-dialog";
import { Note } from "../../../types/memo/note";
import { useSelector, useDispatch } from "react-redux";
import { NewNoteButton } from "./note-new-note-button";
import { UpdateNoteButton } from "./note-update-note-button";
import { NoteDeleteDialog } from "./note-delete-dialog";
import { DeleteNoteButton } from "./note-delete-note-button";

interface NoteListDialogProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
  }

export const NoteListDialog: VFC<NoteListDialogProps> = (props) => {
    const {children, isOpen, onClose, ...other} = props;
    const noteOptions = useSelector(selectNoteOptions);
    const [isOpenNewNoteEditor, setIsOpenNewNoteEditor] = useState<boolean>(false);
    const [isOpenUpdateNoteEditor, setIsOpenUpdateNoteEditor] = useState<boolean>(false);
    const [isOpenDeleteNoteEditor, setIsOpenDeleteNoteEditor] = useState<boolean>(false);
    const newNoteEditor = "newNoteEditor"
    const editNoteEditor = "editNoteEditor"
    const dispatch = useDispatch();
    const editNote = useSelector(selectEditNote)

    const editButtonClick = (note: Note) => {
        dispatch(changeEditNote({
            noteId: note.noteId,
            noteName: note.noteName,
            noteColor: note.noteColor,
        }));
        setIsOpenUpdateNoteEditor(true)
    }

    const deleteButtonClick = (note: Note) => {
        dispatch(changeEditNote({
            noteId: note.noteId,
            noteName: note.noteName,
            noteColor: note.noteColor,
        }));
        setIsOpenDeleteNoteEditor(true)
    }

    const onClickDelete = (noteId: string) => {
        dispatch(fetchAsyncLogicalDeleteNote(noteId));
        setIsOpenDeleteNoteEditor(false)
    }

    const newButtonClick = () => {
        dispatch(resetEditNote());
        setIsOpenNewNoteEditor(true)
    }

    return (
        <>

            <MemoDialog
                isOpen={isOpen}
                onClose={onClose}
                headerTitle="ノートエディタ"
                footerButton={
                    <MemoAddButton 
                        toolTipTitle="ノート追加"
                        onClickAction={() => newButtonClick()}
                    >
                        追加
                    </MemoAddButton>}
            >

                <List
                    sx={{
                        bgcolor: "Background.paper",    
                    }}
                >
                    {noteOptions.map((note) => {
                        return (
                            <MemoDialogListItem
                                listItemIcon={<MemoNoteIcon iconColor={note.noteColor}/>}
                                listText={note.noteName}
                                itemData={note}
                                editButtonClick={editButtonClick}
                                deleteButtonClick={deleteButtonClick}
                            />
                        )
                    })}
                </List>

            </MemoDialog>

            <NoteEditorDialog
                headerTitle="ノート新規追加"
                isOpen={isOpenNewNoteEditor}
                onClose={setIsOpenNewNoteEditor}
                onCloseList={onClose}
                footerButton={
                    <NewNoteButton 
                        formId={newNoteEditor}
                    />}
                formId={newNoteEditor}
                onSubmitAsyncThunk={fetchAsyncCreateNote}
                />

            <NoteEditorDialog
                headerTitle="ノート編集"
                isOpen={isOpenUpdateNoteEditor}
                onClose={setIsOpenUpdateNoteEditor}
                footerButton={
                    <UpdateNoteButton
                        formId={editNoteEditor}
                    />}
                formId={editNoteEditor}
                onSubmitAsyncThunk={fetchAsyncPatchNote}
                />

            <NoteDeleteDialog
                headerTitle="ノート削除"
                isOpen={isOpenDeleteNoteEditor}
                onClose={setIsOpenDeleteNoteEditor}
                footerButton={
                    <DeleteNoteButton
                        formId={editNoteEditor}
                        onClick={onClickDelete}
                    />}
                formId={editNoteEditor}
            />
        </>
    );
}