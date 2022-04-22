import { useEffect, useState, VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  openMemoSidebar,
  closeMemoSidebar,
  selectIsMemoSidebarOpen,
  selectSelectNote,
} from '../../slices/memo/noteSlice';
import { Box, IconButton, useMediaQuery, Theme, Button } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
// import { PurposeListDialogButton } from "./purpose/purpose-list-dialog-button";
import { MemoHeaderBreadcrumbs } from './memo-header-breadcrumbs';
import CategoryIcon from '@mui/icons-material/Category';
import { MemoListDialogMobile } from './memo-list-dialog-mobile';

export const MemoHeader: VFC = (props) => {
  const { ...other } = props;
  const dispatch = useDispatch();
  const isMemoSidebarOpen = useSelector(selectIsMemoSidebarOpen);
  const selectNote = useSelector(selectSelectNote);
  const [isOpenMemoListDialogMobile, setIsOpenMemoListDialogMobile] = useState<boolean>(false);
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const handleToggleMemoSidebar = (): void => {
    if (isMemoSidebarOpen) {
      dispatch(closeMemoSidebar());
    } else {
      dispatch(openMemoSidebar());
    }
  };

  useEffect(() => {
    if (!smUp) {
      dispatch(closeMemoSidebar());
    }
  }, [smUp]);

  return (
    <>
      {smUp ? (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            height: 64,
            overflow: 'hidden',
          }}
          {...other}
        >
          <Box sx={{ ml: 1 }}>
            <IconButton onClick={handleToggleMemoSidebar}>
              <DragHandleIcon fontSize='medium' />
            </IconButton>
          </Box>
          {!isMemoSidebarOpen && (
            <Box sx={{ ml: 2 }}>
              <MemoHeaderBreadcrumbs />
            </Box>
          )}

          {/* <Box
                            sx={{
                                ml: "auto",
                                mr:3
                            }}
                        >
                            {isSelectNote && <PurposeListDialogButton />}
                        </Box> */}
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 64,
            overflow: 'hidden',
          }}
          {...other}
        >
          <Box sx={{ pr: 2 }}>
            <Button onClick={() => setIsOpenMemoListDialogMobile(true)} variant='contained'>
              <CategoryIcon />
            </Button>
          </Box>
        </Box>
      )}

      {!smUp && (
        <MemoListDialogMobile
          isOpen={isOpenMemoListDialogMobile}
          onClose={setIsOpenMemoListDialogMobile}
        />
      )}
    </>
  );
};
