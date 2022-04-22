import { useRef, useState, VFC } from 'react';
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import {
  ChildMemoCategory,
  ParentMemoCategory,
  UpdateChildMemoCategoryProps,
  UpdateParentMemoCategoryProps,
} from '../../../types/memo/memoCategory';
import { MemoEditIcon } from '../commons/icon/memo-edit-icon';
import { MemoDeleteIcon } from '../commons/icon/memo-delete-icon';
import { MemoPropertyIcon } from '../commons/icon/memo-property-icon';

interface MemoCategoryListItemPropertyProps {
  memoCategory?: ParentMemoCategory | ChildMemoCategory;
  onClickUpdateProperty: (parentMemoCategory: ParentMemoCategory | ChildMemoCategory) => void;
  onClickDeleteProperty: (parentMemoCategory: ParentMemoCategory | ChildMemoCategory) => void;
}

export const MemoCategoryListItemProperty: VFC<MemoCategoryListItemPropertyProps> = (props) => {
  const { memoCategory, onClickUpdateProperty, onClickDeleteProperty, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [isOpenProperty, setIsOpenProperty] = useState<boolean>(false);

  const onClickUpdateItem = (memoCategory: ParentMemoCategory | ChildMemoCategory) => {
    setIsOpenProperty(false);
    onClickUpdateProperty(memoCategory);
  };

  const onClickDeleteItem = (memoCategory: ParentMemoCategory | ChildMemoCategory) => {
    setIsOpenProperty(false);
    onClickDeleteProperty(memoCategory);
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={() => setIsOpenProperty(true)}>
        <MemoPropertyIcon fontSize='small' />
      </IconButton>

      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'center',
        }}
        keepMounted
        onClose={() => setIsOpenProperty(false)}
        open={isOpenProperty}
        transitionDuration={0}
        {...other}
      >
        <Box sx={{ my: 1 }}>
          <MenuItem onClick={() => onClickUpdateItem(memoCategory)}>
            <ListItemIcon>
              <MemoEditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>編集</Typography>} />
          </MenuItem>
        </Box>

        <Box sx={{ my: 1 }}>
          <MenuItem onClick={() => onClickDeleteItem(memoCategory)}>
            <ListItemIcon>
              <MemoDeleteIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>削除</Typography>} />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};
