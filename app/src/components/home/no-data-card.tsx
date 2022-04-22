import { Card, Typography } from '@mui/material';
import { VFC } from 'react';

export const NoDataCard: VFC = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100px',
        p: 1,
      }}
    >
      <Typography color='textSecondary' variant='body1'>
        メモを作成してください。
      </Typography>
    </Card>
  );
};
