import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { MainLayout } from '../../components/layouts/main-layout';
import { ReactNode, useRef } from 'react';
import { MemoSidebar } from '../../components/memo/memo-sidebar';
import { MemoHeader } from '../../components/memo/memo-header';
import { MemoMain } from '../../components/memo/memo/memo';
import { useSelector } from 'react-redux';
import { selectIsMemoSidebarOpen } from '../../slices/memo/noteSlice';
import { Box, Divider, styled } from '@mui/material';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const MemoInner = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'isMemoSidebarOpen' })<{ isMemoSidebarOpen?: boolean; }>(
    ({ theme, isMemoSidebarOpen }) => ({
      flexGrow: 1,
      overflow: 'hidden',
      [theme.breakpoints.up('md')]: {
        marginLeft: -560
      },
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      ...(isMemoSidebarOpen && {
        [theme.breakpoints.up('md')]: {
          marginLeft: 0
        },
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
     })
  })
)

const Memo: Page = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isMemoSidebarOpen = useSelector(selectIsMemoSidebarOpen);

  return (
    <>
      <Head>
        <title>
          ak-notebook: memo
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <MemoSidebar 
            containerRef={rootRef}
          />
          <MemoInner
            isMemoSidebarOpen={isMemoSidebarOpen}
          >
            <MemoHeader 
            />
            <Divider />
            <MemoMain />

          </MemoInner>
        </Box>
      </Box>
    </>
  )
}

Memo.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>
      {page}
    </MainLayout>
  </AuthGuard>
);

export default Memo;

