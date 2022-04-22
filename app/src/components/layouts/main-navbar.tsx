import { AppBar, IconButton, styled, Toolbar, Box } from '@mui/material';
import type { AppBarProps } from '@mui/material';
import PropTypes from 'prop-types';
import { ReactNode, useState, VFC } from 'react';
import { AccountButton } from '../accounts/account-button';
import MenuIcon from '@mui/icons-material/Menu';

interface MainNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const MainNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

export const MainNavbar: VFC<MainNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <MainNavbarRoot
      sx={{
        left: {
          lg: 280,
        },
        width: {
          lg: 'calc(100% - 280px)',
        },
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onOpenSidebar}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none',
            },
          }}
        >
          <MenuIcon fontSize='medium' />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <AccountButton />
      </Toolbar>
    </MainNavbarRoot>
  );
};

MainNavbar.propTypes = {
  children: PropTypes.node,
};
