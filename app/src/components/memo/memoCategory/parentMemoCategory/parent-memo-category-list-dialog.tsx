import type { VFC, ReactNode } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeEditMemoCategory,
  fetchAsyncCreateParentMemoCategory,
  fetchAsyncLogicalDeleteParentMemoCategory,
  fetchAsyncPatchParentMemoCategory,
  resetEditMemoCategory,
  resetIsParentMemoCategoryNewEditorOpen,
  resetSelectChildMemoCategory,
  selectIsParentMemoCategoryNewEditorOpen,
  selectParentMemoCategoryOptions,
  selectSelectParentMemoCategory,
  setIsParentMemoCategoryNewEditorOpen,
} from '../../../../slices/memo/memoCategorySlice';
import { selectSelectNote } from '../../../../slices/memo/noteSlice';
import { MemoCategoryDeleteDialog } from '../memo-category-delete-dialog';
import { ParentMemoCategoryEditorDialog } from './parent-memo-category-editor-dialog';
import { ParentMemoCategory as ParentMemo } from '../../../../types/memo/memoCategory';
import { MemoDialog } from '../../commons/dialog/memo-dialog';
import { MemoAddButton } from '../../commons/button/memo-add-button';
import { Box, List } from '@mui/material';
import { MemoSubmitButton } from '../../commons/button/memo-submit-button';
import { DeleteMemoCategoryButton } from '../memo-category-delete-memo-category-button';
import { MemoDialogListItem } from '../../commons/list/memo-dialog-list-item';
import { MemoEmojiIcon } from '../../commons/icon/memo-emoji-icon';
import { MemoCategoryIcon } from '../../commons/icon/memo-category-icon';
import { resetMemoOption } from '../../../../slices/memo/memoSlice';

interface ParentMemoCategoryListDialogProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

export const ParentMemoCategoryListDialog: VFC<ParentMemoCategoryListDialogProps> = (props) => {
  const { children, isOpen, onClose, ...other } = props;
  const dispatch = useDispatch();
  const parentMemoCategoryOptions = useSelector(selectParentMemoCategoryOptions);
  const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);
  const isNewParentMemoCategoryOpen = useSelector(selectIsParentMemoCategoryNewEditorOpen);
  const [isUpdateParentMemoCategoryOpen, setIsUpdateParentMemoCategoryOpen] =
    useState<boolean>(false);
  const [isDeleteParentMemoCategoryOpen, setIsDeleteParentMemoCategoryOpen] =
    useState<boolean>(false);
  const selectNote = useSelector(selectSelectNote);

  const onCloseNewParentMemoCategoryDialog = (isOpen: boolean) => {
    // isOpenはダミー
    dispatch(resetIsParentMemoCategoryNewEditorOpen());
  };

  const onClickAddButton = () => {
    dispatch(resetEditMemoCategory());
    dispatch(changeEditMemoCategory({ note: selectNote.noteId }));
    dispatch(setIsParentMemoCategoryNewEditorOpen());
  };

  const onClickUpdateProperty = (parentMemoCategory: ParentMemo) => {
    dispatch(
      changeEditMemoCategory({
        memoCategoryId: parentMemoCategory.memoCategoryId,
        memoCategoryName: parentMemoCategory.memoCategoryName,
        memoCategoryIcon: parentMemoCategory.memoCategoryIcon,
        note: parentMemoCategory.note,
      }),
    );
    setIsUpdateParentMemoCategoryOpen(true);
  };

  const onClickDeleteProperty = (parentMemoCategory: ParentMemo) => {
    dispatch(
      changeEditMemoCategory({
        memoCategoryId: parentMemoCategory.memoCategoryId,
        memoCategoryName: parentMemoCategory.memoCategoryName,
        memoCategoryIcon: parentMemoCategory.memoCategoryIcon,
        note: parentMemoCategory.note,
      }),
    );
    setIsDeleteParentMemoCategoryOpen(true);
  };

  const onClickDeleteButton = async (parentMemoCategoryId: string) => {
    const result: any = await dispatch(
      fetchAsyncLogicalDeleteParentMemoCategory(parentMemoCategoryId),
    );
    if (fetchAsyncLogicalDeleteParentMemoCategory.fulfilled.match(result)) {
      if (selectParentMemoCategory.memoCategoryId === parentMemoCategoryId) {
        dispatch(resetMemoOption());
        dispatch(resetSelectChildMemoCategory());
      }
    }
    setIsDeleteParentMemoCategoryOpen(false);
  };

  return (
    <>
      <MemoDialog
        isOpen={isOpen}
        onClose={onClose}
        headerTitle='親カテゴリエディタ'
        footerButton={
          <MemoAddButton toolTipTitle='親カテゴリ追加' onClickAction={() => onClickAddButton()}>
            追加
          </MemoAddButton>
        }
      >
        <List
          sx={{
            bgcolor: 'Background.paper',
          }}
        >
          {parentMemoCategoryOptions.map((option, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                }}
              >
                <MemoDialogListItem
                  listItemIcon={
                    option.memoCategoryIcon ? (
                      <MemoEmojiIcon emojiId={option.memoCategoryIcon} emojiSize={22} />
                    ) : (
                      <MemoCategoryIcon fontSize='medium' />
                    )
                  }
                  listText={option.memoCategoryName}
                  itemData={option}
                  editButtonClick={onClickUpdateProperty}
                  deleteButtonClick={onClickDeleteProperty}
                />
              </Box>
            );
          })}
        </List>
      </MemoDialog>

      <ParentMemoCategoryEditorDialog
        headerTitle='親カテゴリ新規追加'
        isOpen={isNewParentMemoCategoryOpen}
        onClose={onCloseNewParentMemoCategoryDialog}
        onCloseList={onClose}
        footerButton={
          <MemoSubmitButton form='newparent' toolTipTitle='submit'>
            New
          </MemoSubmitButton>
        }
        formId='newparent'
        onSubmitAsyncThunk={fetchAsyncCreateParentMemoCategory}
      />

      <ParentMemoCategoryEditorDialog
        headerTitle='親カテゴリ編集'
        isOpen={isUpdateParentMemoCategoryOpen}
        onClose={setIsUpdateParentMemoCategoryOpen}
        footerButton={
          <MemoSubmitButton form='updateparent' toolTipTitle='submit'>
            Update
          </MemoSubmitButton>
        }
        formId='updateparent'
        onSubmitAsyncThunk={fetchAsyncPatchParentMemoCategory}
      />

      <MemoCategoryDeleteDialog
        headerTitle='親カテゴリ削除'
        isOpen={isDeleteParentMemoCategoryOpen}
        onClose={setIsDeleteParentMemoCategoryOpen}
        footerButton={
          <DeleteMemoCategoryButton formId='memoCategoryDel' onClick={onClickDeleteButton} />
        }
        formId='memoCategoryDel'
      />
    </>
  );
};
