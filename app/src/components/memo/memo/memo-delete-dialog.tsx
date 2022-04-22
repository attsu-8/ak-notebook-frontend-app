import { Box, ButtonProps, IconButtonProps, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { selectEditMemo } from '../../../slices/memo/memoSlice';
import { MemoDialog } from '../commons/dialog/memo-dialog';
import { MemoDeleteIcon } from '../commons/icon/memo-delete-icon';

interface MemoDeleteDialogProps {
  headerTitle: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  footerButton: IconButtonProps | ButtonProps;
  formId: string;
}

export const MemoDeleteDialog: VFC<MemoDeleteDialogProps> = (props) => {
  const { headerTitle, isOpen, onClose, footerButton, formId, ...other } = props;
  const editMemo = useSelector(selectEditMemo);
  const theme = useTheme();

  return (
    <MemoDialog
      isOpen={isOpen}
      onClose={() => onClose(false)}
      headerTitle={headerTitle}
      footerButton={footerButton}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <MemoDeleteIcon iconColor={theme.palette.error.light} />
          <Typography color='textSecondary' variant='h6' sx={{ mb: 1 }}>
            以下のメモを削除します。
          </Typography>
        </Box>

        <Typography
          color='textSecondary'
          variant='h6'
          sx={{
            width: '100%',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
          }}
        >
          {`タイトル： ${editMemo.memoTitle}`}
        </Typography>
      </Box>
    </MemoDialog>
  );
};
