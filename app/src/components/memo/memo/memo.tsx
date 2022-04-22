import { useEffect, useState, VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMemoOptions,
  selectIsMemoNextPageLoading,
  fetchAsyncGetMemosNextPage,
  selectMemoNextPage,
  fetchAsyncCreateMemo,
  fetchAsyncLogicalDeleteMemo,
  selectIsMemoReflesh,
  startMemoReflesh,
  endMemoReflesh,
  selectLatestCreateMemo,
  resetLatestCreateMemo,
} from '../../../slices/memo/memoSlice';
// import { fetchAsyncGetPurposes} from "../../../slices/memo/purposeSlice";
import { Box, CircularProgress, Typography, useMediaQuery, Theme } from '@mui/material';
import { MemoCard } from './memo-card';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  resetIsCreatedChildMemoCategory,
  selectChildMemoCategoryOptions,
  selectIsCreatedChildMemoCategory,
  selectSelectChildMemoCategory,
} from '../../../slices/memo/memoCategorySlice';
import { MemoProps } from '../../../types/memo/memo';
import { MemoAddButton } from '../commons/button/memo-add-button';
import { MemoDeleteDialog } from './memo-delete-dialog';
import { DeleteMemoButton } from './memo-delete-memo-button';
import { fetchAsyncCreateLearningEfficiency } from '../../../slices/home/learningEfficiencySlice';
import { LearningEfficiencyPostData } from '../../../types/home/learningEfficiency';
import { formatDate } from '../../../utils/date/formatDate';
import CategoryIcon from '@mui/icons-material/Category';

interface NewMemoButtonProps {
  initialMemoProps: MemoProps;
  handleCreateNewMemo: (initialMemoProps: MemoProps) => void;
}

const NewMemoButton: VFC<NewMemoButtonProps> = (props) => {
  const { initialMemoProps, handleCreateNewMemo, ...other } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        my: 1,
      }}
    >
      <Box sx={{ width: '50%' }}>
        <MemoAddButton
          toolTipTitle='追加'
          onClickAction={() => handleCreateNewMemo(initialMemoProps)}
        >
          追加
        </MemoAddButton>
      </Box>
    </Box>
  );
};

const MemoLoader: VFC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ my: 3 }} />
    </Box>
  );
};

export const MemoMain: VFC = () => {
  const dispatch = useDispatch();
  const memoOptions = useSelector(selectMemoOptions);
  const isMemoNextPageLoading = useSelector(selectIsMemoNextPageLoading);
  const memoNextPage = useSelector(selectMemoNextPage);
  const selectChildeMemoCategory = useSelector(selectSelectChildMemoCategory);
  const scrollableTarget = 'memoEditor';
  const hasMemoOptions = memoOptions[0];
  let isSelectChildMemoCategory = selectChildeMemoCategory.memoCategoryId;
  const [isDeleteMemoOpen, setIsDeleteMemoOpen] = useState<boolean>(false);
  const isMemoReflesh = useSelector(selectIsMemoReflesh);
  const latestCreateMemo = useSelector(selectLatestCreateMemo);
  const isCreatedChildMemoCategory = useSelector(selectIsCreatedChildMemoCategory);

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const initialMemoProps: MemoProps = {
    memoTitle: null,
    memoPriority: 3,
    memoText: null,
    note: selectChildeMemoCategory.note,
    parentMemoCategory: selectChildeMemoCategory.parentMemoCategory,
    childMemoCategory: selectChildeMemoCategory.memoCategoryId,
    purpose: null,
  };

  const onClick = () => {
    dispatch(fetchAsyncGetMemosNextPage(memoNextPage));
  };

  const handleCreateNewMemo = (initialMemoProps: MemoProps) => {
    dispatch(fetchAsyncCreateMemo(initialMemoProps));
  };

  const endReflesh = () => dispatch(endMemoReflesh());

  const memoReflesh = () => {
    dispatch(startMemoReflesh());
    setTimeout(endReflesh, 500);
  };

  const onClickDeleteButton = (memoId: string) => {
    dispatch(fetchAsyncLogicalDeleteMemo(memoId));
    setIsDeleteMemoOpen(false);
    memoReflesh();
  };

  // useEffect(() => {
  //     dispatch(fetchAsyncGetPurposes());
  // }, [] )

  useEffect(() => {
    if (isCreatedChildMemoCategory) {
      handleCreateNewMemo(initialMemoProps);
      dispatch(resetIsCreatedChildMemoCategory());
    }
  }, [isCreatedChildMemoCategory]);

  useEffect(() => {
    const functions = async () => {
      if (latestCreateMemo.memoId !== '') {
        const date = await formatDate(new Date());
        const initialLearningEfficiencyProps: LearningEfficiencyPostData = await {
          id: `${date}${latestCreateMemo.memoId}`,
          aggregateDate: date,
          learningEfficiencyRate: 100,
          note: selectChildeMemoCategory.note,
          parentMemoCategory: selectChildeMemoCategory.parentMemoCategory,
          childMemoCategory: selectChildeMemoCategory.memoCategoryId,
          purpose: latestCreateMemo.purpose,
          memo: latestCreateMemo.memoId,
        };
        await dispatch(fetchAsyncCreateLearningEfficiency(initialLearningEfficiencyProps));
        await dispatch(resetLatestCreateMemo());
      }
    };
    functions();
  }, [latestCreateMemo]);

  return (
    <Box sx={{ height: 'calc(100% - 64px)' }}>
      <Box
        id={scrollableTarget}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll',
          alignItems: 'center',
          width: '100%',
          pb: 2,
        }}
      >
        <Typography
          color='textSecondary'
          variant='h5'
          sx={{
            mt: 2,
            height: '5%',
          }}
        >
          Memo
        </Typography>

        {isMemoReflesh && (
          <Box
            sx={{
              height: '95%',
              width: '100%',
              px: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                height: 'calc(100% - 40px)',
              }}
            >
              {isSelectChildMemoCategory ? (
                <InfiniteScroll
                  dataLength={memoOptions.length}
                  next={onClick}
                  hasMore={isMemoNextPageLoading}
                  loader={hasMemoOptions && <MemoLoader />}
                  scrollableTarget={scrollableTarget}
                  style={{
                    width: 'calc(100%-100px)',
                    height: '100%',
                  }}
                  endMessage={
                    isSelectChildMemoCategory && (
                      <NewMemoButton
                        initialMemoProps={initialMemoProps}
                        handleCreateNewMemo={() => handleCreateNewMemo(initialMemoProps)}
                      />
                    )
                  }
                >
                  <>
                    {memoOptions.map((memoOption, index) => (
                      <MemoCard
                        key={index} //ESLINTのエラーを回避するためにkeyを定義
                        memo={memoOption}
                        onClickDeletePropertyButton={setIsDeleteMemoOpen}
                      />
                    ))}
                  </>
                </InfiniteScroll>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color='textSecondary' variant='body1'>
                    {smUp ? (
                      '子カテゴリを選択してください。'
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <CategoryIcon sx={{ mr: 0.5 }} />
                        より表示するメモを選択してください。
                      </Box>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <MemoDeleteDialog
        headerTitle='メモ削除'
        isOpen={isDeleteMemoOpen}
        onClose={setIsDeleteMemoOpen}
        footerButton={<DeleteMemoButton formId='memoCategoryDel' onClick={onClickDeleteButton} />}
        formId='memoCategoryDel'
      />
    </Box>
  );
};
