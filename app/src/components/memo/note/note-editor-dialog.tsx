import { Box, TextField, ButtonProps, IconButtonProps} from "@mui/material";
import { useState, VFC, useRef, useEffect } from "react";
import { MemoDialog } from "../commons/dialog/memo-dialog";
import { NewNoteProps, UpdateNoteProps } from "../../../types/memo/note";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorPickerPopOver } from "../commons/picker/note-color-picker-popover";
import { useDispatch, useSelector } from "react-redux";
import { changeEditNote, selectEditNote } from "../../../slices/memo/noteSlice";
import { AsyncThunk } from "@reduxjs/toolkit";
import { MemoIconChangeButton } from "../commons/button/memo-icon-change-button";
import { MemoNoteIcon } from "../commons/icon/memo-note-icon";

interface NoteEditorDialogProps {
    headerTitle: string;
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
    footerButton: IconButtonProps | ButtonProps;
    formId: string;
    onSubmitAsyncThunk: AsyncThunk<any, NewNoteProps | UpdateNoteProps, {}>;
}

export const NoteEditorDialog: VFC<NoteEditorDialogProps> = (props) => {

    const {headerTitle, isOpen, onClose, footerButton, formId, onSubmitAsyncThunk, ...other} = props; 
    const [isOpenColorPicker, setIsOpenColorPicker] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const dispatch = useDispatch();
    const editNote = useSelector(selectEditNote);
    
    const onChangeNoteColor = (noteColor: string) => {
        dispatch(changeEditNote({
            noteColor: noteColor,
            noteName: formik.values.noteName
        }))
    }

    const validationSchema = Yup.object({
        noteName: Yup.string()
            .max(50, "ノート名は50文字以内に収めてください。")
            .required("ノート名を入力してください")
    })
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editNote,
        validationSchema: validationSchema,
        onSubmit: (note=editNote) => {
            dispatch(changeEditNote({noteName: formik.values.noteName}))
            dispatch(onSubmitAsyncThunk(note))
            onClose(false)
        },
    })

    useEffect(() => {
        formik.resetForm()
    },[isOpen])

    return (
        <MemoDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
            headerTitle={headerTitle}
            footerButton={footerButton}
        >

            <form
                onSubmit={formik.handleSubmit}
                id={formId}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        my:3,
                    }}                
                >

                    <Box ref={anchorRef}>
                        <MemoIconChangeButton
                            toolTipTitle="色を変更"
                            toolTipPlacement="top"
                            onClickAction={setIsOpenColorPicker}
                            icon={<MemoNoteIcon 
                                fontSize="large"
                                iconColor={editNote.noteColor}
                                />}
                        />
                    </Box>

                    <ColorPickerPopOver
                        isOpen={isOpenColorPicker}
                        onClose={setIsOpenColorPicker}
                        anchorEl={anchorRef.current}
                        onChange={onChangeNoteColor}
                        />

                    <TextField
                        id="noteName"
                        name="noteName"
                        label="ノート名"
                        fullWidth
                        value={formik.values.noteName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.noteName && Boolean(formik.errors.noteName)}
                        helperText={formik.touched.noteName && formik.errors.noteName} 
                    />

                </Box>

            </form>

        </MemoDialog>
    );
}