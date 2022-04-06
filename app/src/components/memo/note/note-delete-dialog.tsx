import { ButtonProps, IconButtonProps } from "@mui/material";
import { AsyncThunk } from "@reduxjs/toolkit";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectEditNote } from "../../../slices/memo/noteSlice";
import { MemoDialog } from "../commons/dialog/memo-dialog";

interface NoteDeleteDialogProps {
    headerTitle: string;
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
    footerButton: IconButtonProps | ButtonProps;
    formId: string;
    // onSubmitAsyncThunk: AsyncThunk<any, NewNoteProps | UpdateNoteProps, {}>;
}

export const NoteDeleteDialog: VFC<NoteDeleteDialogProps> = (props) => {
    const {headerTitle, isOpen, onClose, footerButton, formId, ...other} = props; 

    const editNote = useSelector(selectEditNote);

    return (
        <MemoDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
            headerTitle={headerTitle}
            footerButton={footerButton}
        >  
            <>
                {`noteName: ${editNote.noteName}`}
            </>

        </MemoDialog>

    );
};