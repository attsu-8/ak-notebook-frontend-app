import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectParentMemoCategoryOptions,
  fetchAsyncGetChildMemoCategoriesFilter,
  changeSelectParentMemoCategory,
  selectSelectParentMemoCategory,
  resetSelectChildMemoCategory,
} from '../../../../slices/memo/memoCategorySlice';
import { ParentMemoCategory as ParentMemo } from '../../../../types/memo/memoCategory';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { resetMemoOption } from '../../../../slices/memo/memoSlice';
import { MemoEmojiIcon } from '../../commons/icon/memo-emoji-icon';
import { MemoCategoryIcon } from '../../commons/icon/memo-category-icon';

export const ParentMemoCategorySelectMobile: VFC = () => {
  const dispatch = useDispatch();
  const parentMemoCategoryOptions = useSelector(selectParentMemoCategoryOptions);
  const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);

  const onChangeListItem = (parentMemoCategory: ParentMemo) => {
    if (parentMemoCategory.memoCategoryId !== selectParentMemoCategory.memoCategoryId) {
      dispatch(resetMemoOption());
      dispatch(resetSelectChildMemoCategory());
    }
    dispatch(changeSelectParentMemoCategory(parentMemoCategory));
    dispatch(fetchAsyncGetChildMemoCategoriesFilter(parentMemoCategory.memoCategoryId));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='parent-memo-category-select-label'>親カテゴリ</InputLabel>
      <Select
        size='small'
        labelId='parent-memo-category-select-label'
        id='parent-memo-category-select'
        label='親カテゴリ'
        value={selectParentMemoCategory}
        onChange={(event) => onChangeListItem(event.target.value)}
        renderValue={(selected) => selected.memoCategoryName}
      >
        {parentMemoCategoryOptions.map((option, index) => (
          //ESLINTのエラーを回避するためにkeyを定義
          <MenuItem key={index} value={option}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mr: 0.5 }}>
                {option.memoCategoryIcon ? (
                  <MemoEmojiIcon emojiId={option.memoCategoryIcon} emojiSize={22} />
                ) : (
                  <MemoCategoryIcon fontSize='small' />
                )}
              </Box>
              {option.memoCategoryName}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
