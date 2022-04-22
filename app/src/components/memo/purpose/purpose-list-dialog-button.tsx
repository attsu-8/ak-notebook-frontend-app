import { useState, VFC } from 'react';
import { Box, Button } from '@mui/material';
import { PurposeListDialog } from './purpose-list-dialog';

export const PurposeListDialogButton: VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box>
      <Button
        onClick={() => setIsOpen(true)}
        variant='contained'
        sx={{
          minWidth: 100,
        }}
      >
        目的編集
      </Button>
      <PurposeListDialog isOpen={isOpen} onClose={setIsOpen} />
    </Box>
  );
};
