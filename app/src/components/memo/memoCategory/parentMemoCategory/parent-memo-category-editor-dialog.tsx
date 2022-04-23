import { TextField, IconButtonProps, ButtonProps, Box } from '@mui/material';
import { useState, VFC, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ChildMemoCategoryProps,
  ParentMemoCategoryProps,
  UpdateChildMemoCategoryProps,
  UpdateParentMemoCategoryProps,
} from '../../../../types/memo/memoCategory';
import {
  changeEditMemoCategory,
  resetChildMemoCategoryOptions,
  resetEditMemoCategory,
  resetSelectChildMemoCategory,
  selectEditMemoCategory,
  selectSelectParentMemoCategory,
  setIsChildMemoCategoryNewEditorOpen,
} from '../../../../slices/memo/memoCategorySlice';
import { MemoDialog } from '../../commons/dialog/memo-dialog';
import { AsyncThunk } from '@reduxjs/toolkit';
import { MemoIconChangeButton } from '../../commons/button/memo-icon-change-button';
import { MemoEmojiIcon } from '../../commons/icon/memo-emoji-icon';
import { MemoCategoryIcon } from '../../commons/icon/memo-category-icon';
import { EmojiPickerPopOver } from '../../commons/picker/emoji-picker-popover';
import { resetMemoOption } from '../../../../slices/memo/memoSlice';

interface ParentMemoCategoryEditorDialogProps {
  headerTitle: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  onCloseList?: (isOpenList: boolean) => void;
  footerButton: IconButtonProps | ButtonProps;
  formId: string;
  onSubmitAsyncThunk: AsyncThunk<
    any,
    | ParentMemoCategoryProps
    | ChildMemoCategoryProps
    | UpdateParentMemoCategoryProps
    | UpdateChildMemoCategoryProps,
    {}
  >;
}

export const ParentMemoCategoryEditorDialog: VFC<ParentMemoCategoryEditorDialogProps> = (props) => {
  const {
    headerTitle,
    isOpen,
    onClose,
    onCloseList,
    footerButton,
    formId,
    onSubmitAsyncThunk,
    ...other
  } = props;
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const editParentMemoCategory = useSelector(selectEditMemoCategory);
  const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);

  const onChangeParentMemoCategoryIcon = (parentMemoCategoryIcon: String) => {
    dispatch(
      changeEditMemoCategory({
        memoCategoryName: formik.values.memoCategoryName,
        memoCategoryIcon: parentMemoCategoryIcon,
      }),
    );
  };

  const handleClosePopover = () => {
    setIsOpenEmojiPicker(false);
  };

  const validationSchema = Yup.object({
    memoCategoryName: Yup.string()
      .max(50, '親メモカテゴリは50文字以内に収めてください。')
      .required('親メモカテゴリを入力してください。'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editParentMemoCategory,
    validationSchema: validationSchema,
    onSubmit: (parentMemoCategory = editParentMemoCategory) => {
      onClose(false);
      dispatch(changeEditMemoCategory({ memoCategoryName: formik.values.memoCategoryName }));
      dispatch(onSubmitAsyncThunk(parentMemoCategory));
      if (formId === 'newparent') {
        dispatch(resetMemoOption());
        dispatch(resetSelectChildMemoCategory());
        dispatch(resetChildMemoCategoryOptions());
        dispatch(resetEditMemoCategory());
        dispatch(setIsChildMemoCategoryNewEditorOpen());
        onCloseList(false);
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [isOpen]);

  useEffect(() => {
    dispatch(
      changeEditMemoCategory({
        note: selectParentMemoCategory.note,
        parentMemoCategory: selectParentMemoCategory.memoCategoryId,
      }),
    );
  }, [selectParentMemoCategory]);

  return (
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
              toolTipTitle='アイコン選択'
              toolTipPlacement='top'
              onClickAction={setIsOpenEmojiPicker}
              icon={
                <MemoEmojiIcon
                  emojiId={editParentMemoCategory.memoCategoryIcon}
                  emojiSize={40}
                  defaultIcon={<MemoCategoryIcon fontSize='large' />}
                />
              }
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
            id='memoCategoryName'
            name='memoCategoryName'
            label='親カテゴリ名'
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
};
