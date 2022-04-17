import { TextField, IconButtonProps, ButtonProps, Box } from "@mui/material";
import { useState, VFC, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChildMemoCategoryProps, ParentMemoCategoryProps, UpdateChildMemoCategoryProps, UpdateParentMemoCategoryProps } from "../../../../types/memo/memoCategory";
import { changeEditMemoCategory, resetEditMemoCategory, selectEditMemoCategory } from "../../../../slices/memo/memoCategorySlice";
import { MemoDialog } from "../../commons/dialog/memo-dialog";
import { AsyncThunk } from "@reduxjs/toolkit";
import { MemoIconChangeButton } from "../../commons/button/memo-icon-change-button";
import { MemoEmojiIcon } from "../../commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../../commons/icon/memo-category-icon";
import { EmojiPickerPopOver } from "../../commons/picker/emoji-picker-popover";
import { resetMemoOption } from "../../../../slices/memo/memoSlice";

interface ChildMemoCategoryEditorDialogProps  {
    headerTitle: string;
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
    onCloseList?: (isOpenList: boolean) => void;
    footerButton: IconButtonProps | ButtonProps;
    formId: string;
    onSubmitAsyncThunk: AsyncThunk<any, ParentMemoCategoryProps | ChildMemoCategoryProps | UpdateParentMemoCategoryProps | UpdateChildMemoCategoryProps, {}>;
}

export const ChildMemoCategoryEditorDialog: VFC<ChildMemoCategoryEditorDialogProps> = (props) => {
    const { headerTitle, isOpen, onClose, onCloseList, footerButton, formId, onSubmitAsyncThunk, ...other } = props;
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false) 
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const dispatch = useDispatch();
    const editParentMemoCategory = useSelector(selectEditMemoCategory)

    const onChangeParentMemoCategoryIcon = (parentMemoCategoryIcon: String) => {
        dispatch(changeEditMemoCategory({
            memoCategoryName: formik.values.memoCategoryName,
            memoCategoryIcon: parentMemoCategoryIcon
        }))
    }

    const handleClosePopover = () => {
        setIsOpenEmojiPicker(false)
    }
    
    const validationSchema = Yup.object({
        memoCategoryName: Yup.string()
            .max(50, "子メモカテゴリは50文字以内に収めてください。")
            .required("子メモカテゴリを入力してください。"),
    });
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editParentMemoCategory,
        validationSchema: validationSchema,
        onSubmit: (parentMemoCategory=editParentMemoCategory) => {
            onClose(false);
            dispatch(changeEditMemoCategory({ memoCategoryName: formik.values.memoCategoryName}));
            dispatch(onSubmitAsyncThunk(parentMemoCategory));
            if (formId === "newChild") {
                dispatch(resetMemoOption());
                dispatch(resetEditMemoCategory())
                onCloseList(false)
            }
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
                            toolTipTitle="アイコン選択"
                            toolTipPlacement="top"
                            onClickAction={setIsOpenEmojiPicker}
                            icon={<MemoEmojiIcon
                                    emojiId={editParentMemoCategory.memoCategoryIcon}
                                    emojiSize={40}
                                    defaultIcon={<MemoCategoryIcon fontSize="large"/>}
                                    />}
                        />
                    </Box>

                    <EmojiPickerPopOver
                            anchorEl={anchorRef.current}
                            onClose={handleClosePopover}
                            open={isOpenEmojiPicker}
                            setEmoji={onChangeParentMemoCategoryIcon}
                    />

                    <TextField
                        autoFocus
                        id="memoCategoryName"
                        name="memoCategoryName"
                        label="子カテゴリ名"
                        fullWidth
                        value={formik.values.memoCategoryName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.memoCategoryName && Boolean(formik.errors.memoCategoryName)}
                        helperText={formik.touched.memoCategoryName && formik.errors.memoCategoryName} 
                    />
                </Box>
            </form>
        </MemoDialog>
    );
}
