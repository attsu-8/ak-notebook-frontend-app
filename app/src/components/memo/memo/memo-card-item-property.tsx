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
import { MemoDeleteIcon } from '../commons/icon/memo-delete-icon';
import { Memo } from '../../../types/memo/memo';
import { MemoPropertyIcon } from '../commons/icon/memo-property-icon';
import { useDispatch } from 'react-redux';

interface MemoCardItemPropertyProps {
  memo: Memo;
  onClickDeleteProperty: (memo: Memo) => void;
}

export const MemoCardItemProperty: VFC<MemoCardItemPropertyProps> = (props) => {
  const { memo, onClickDeleteProperty, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [isOpenProperty, setIsOpenProperty] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onClickDeleteItem = (memo: Memo) => {
    setIsOpenProperty(false);
    onClickDeleteProperty(memo);
  };

  return (
    <>
      <IconButton ref={anchorRef} onClick={() => setIsOpenProperty(true)}>
        <MemoPropertyIcon fontSize='medium' />
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
          <MenuItem onClick={() => onClickDeleteItem(memo)}>
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
