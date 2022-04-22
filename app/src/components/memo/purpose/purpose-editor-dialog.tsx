import { TextField, IconButtonProps, ButtonProps } from '@mui/material';
import { Box } from '@mui/material';
import { useState, useEffect, VFC, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PurposeProps, UpdatePurposeProps } from '../../../types/memo/purpose';
import { changeEditPurpose, selectEditPurpose } from '../../../slices/memo/purposeSlice';
import { MemoDialog } from '../commons/dialog/memo-dialog';
import { AsyncThunk } from '@reduxjs/toolkit';
import { MemoIconChangeButton } from '../commons/button/memo-icon-change-button';
import { MemoEmojiIcon } from '../commons/icon/memo-emoji-icon';
import { MemoPurposeIcon } from '../commons/icon/memo-purpose-icon';
import { EmojiPickerPopOver } from '../commons/picker/emoji-picker-popover';

interface PurposeEditorDialogProps {
  headerTitle: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  footerButton: IconButtonProps | ButtonProps;
  formId: string;
  onSubmitAsyncThunk: AsyncThunk<any, PurposeProps | UpdatePurposeProps, {}>;
}

export const PurposeEditorDialog: VFC<PurposeEditorDialogProps> = (props) => {
  const { headerTitle, isOpen, onClose, footerButton, formId, onSubmitAsyncThunk, ...other } =
    props;
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const editPurpose = useSelector(selectEditPurpose);

  const onChangePurposeIcon = (purposeIcon: String) => {
    dispatch(
      changeEditPurpose({
        purposeName: formik.values.purposeName,
        purposeIcon: purposeIcon,
      }),
    );
  };

  const validationSchema = Yup.object({
    purposeName: Yup.string()
      .max(100, '目的は100文字以内に収めてください。')
      .required('目的を入力してください。'),
  });

  const handleClosePopover = (): void => {
    setIsOpenEmojiPicker(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editPurpose,
    validationSchema: validationSchema,
    onSubmit: (purpose = editPurpose) => {
      dispatch(changeEditPurpose({ purposeName: formik.values.purposeName }));
      dispatch(onSubmitAsyncThunk(purpose));
      onClose(false);
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  return (
    <>
      <MemoDialog
        isOpen={isOpen}
        onClose={() => onClose(false)}
        headerTitle={headerTitle}
        footerButton={footerButton}
      >
        <form onSubmit={formik.handleSubmit} id={formId}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 3,
            }}
          >
            <Box ref={anchorRef}>
              <MemoIconChangeButton
                toolTipTitle='choose emoji'
                toolTipPlacement='top'
                onClickAction={setIsOpenEmojiPicker}
                icon={
                  <MemoEmojiIcon
                    emojiId={editPurpose.purposeIcon}
                    emojiSize={40}
                    defaultIcon={<MemoPurposeIcon fontSize='large' />}
                  />
                }
              />
            </Box>

            <EmojiPickerPopOver
              anchorEl={anchorRef.current}
              onClose={handleClosePopover}
              open={isOpenEmojiPicker}
              setEmoji={onChangePurposeIcon}
            />

            <TextField
              id='purposeName'
              name='purposeName'
              label='purposeName'
              fullWidth
              value={formik.values.purposeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.purposeName && Boolean(formik.errors.purposeName)}
              helperText={formik.touched.purposeName && formik.errors.purposeName}
            />
          </Box>
        </form>
      </MemoDialog>
    </>
  );
};
