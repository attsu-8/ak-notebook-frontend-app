import {
  Box,
  Drawer,
  styled,
  useMediaQuery,
  Typography,
  List,
  Divider,
  Button,
} from '@mui/material';
import { MutableRefObject, useState, VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMemoSidebarOpen, closeMemoSidebar } from '../../slices/memo/noteSlice';
import type { Theme } from '@mui/material';
import { Note } from './note/note';
import { ParentMemoCategory } from './memoCategory/parentMemoCategory/parent-memo-category-list';
import { ChildMemoCategory } from './memoCategory/childMemoCategory/child-memo-category-list';
const MemoSidebarDesktop = styled(Drawer)({
  flexShrink: 0,
  height: '100%',
  width: 560,
  '& .MuiDrawer-paper': {
    position: 'relative',
    width: 560,
  },
});

const MemoSidebarMobile = styled(Drawer)({
  width: 560,
  '& .MuiDrawer-paper': {
    top: 64,
    height: 'calc(100% - 64px)',
    width: 560,
  },
});

interface MemoSidebarProps {
  containerRef?: MutableRefObject<HTMLDivElement>;
}

export const MemoSidebar: VFC<MemoSidebarProps> = (props) => {
  const { containerRef, ...other } = props;
  const dispatch = useDispatch();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [isParentMemoCategoryOpen, setIsParentMemoCategoryOpen] = useState<boolean>(false);
  const [isChildMemoCategoryOpen, setIsChildMemoCategoryOpen] = useState<boolean>(false);

  const isMemoSidebarOpen = useSelector(selectIsMemoSidebarOpen);

  const closeParentMemoCategoryDialog = () => {
    setIsParentMemoCategoryOpen(false);
  };

  const closeChildMemoCategoryDialog = () => {
    setIsChildMemoCategoryOpen(false);
  };

  const content = (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          height: '64px',
        }}
      >
        <Note />
        <Divider />
      </Box>
      <Box
        sx={{
          // height: "calc(90% -64px)",
          height: 'calc(100% - 64px)',
          display: 'flex',
          overflow: 'hidden',
          // my:1
        }}
      >
        <ParentMemoCategory />
        <Divider orientation='vertical' flexItem />
        <ChildMemoCategory />
      </Box>
    </Box>
  );

  if (mdUp) {
    return (
      <MemoSidebarDesktop
        anchor='left'
        open={isMemoSidebarOpen}
        // SlideProps={{ container: containerRef?.current }}
        variant='persistent'
        {...other}
      >
        {content}
      </MemoSidebarDesktop>
    );
  }
  return (
    <MemoSidebarMobile
      anchor='left'
      open={isMemoSidebarOpen}
      SlideProps={{ container: containerRef?.current }}
      onClose={() => dispatch(closeMemoSidebar())}
      variant='temporary'
      {...other}
    >
      {content}
    </MemoSidebarMobile>
  );
};
