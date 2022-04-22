import type { FC } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Logo } from './logo';

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'neutral.900',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000,
    }}
  >
    <Logo
      sx={{
        height: 100,
        width: 100,
      }}
    />
    <Box
      sx={{
        mt: 5,
        width: '25%',
      }}
    >
      <LinearProgress />
    </Box>
  </Box>
);
