import { useEffect, useState, VFC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMemoOptions, selectIsMemoNextPageLoading, fetchAsyncGetMemosNextPage, selectMemoNextPage, fetchAsyncCreateMemo, fetchAsyncLogicalDeleteMemo, selectIsMemoReflesh, startMemoReflesh, endMemoReflesh } from "../../../slices/memo/memoSlice";
import { fetchAsyncGetPurposes} from "../../../slices/memo/purposeSlice"; 
import { Box, CircularProgress, Typography } from "@mui/material";
import { MemoCard } from "./memo-card";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectSelectChildMemoCategory } from "../../../slices/memo/memoCategorySlice";
import { MemoProps } from "../../../types/memo/memo";
import { MemoAddButton } from "../commons/button/memo-add-button";
import { MemoDeleteDialog } from "./memo-delete-dialog";
import { DeleteMemoButton } from "./memo-delete-memo-button";

interface NewMemoButtonProps { 
    initialMemoProps: MemoProps;
    handleCreateNewMemo: (initialMemoProps: MemoProps) => void;
}

const NewMemoButton: VFC<NewMemoButtonProps> = (props) => {
    const {initialMemoProps, handleCreateNewMemo, ...other} = props;
    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <MemoAddButton 
                toolTipTitle="追加"
                onClickAction={() => handleCreateNewMemo(initialMemoProps)}
            >
                追加
            </MemoAddButton>
        </Box>
    )
}

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
            <CircularProgress sx={{my:3}}/>
        </Box>
    )
}

export const MemoMain: VFC = () => {
    const dispatch = useDispatch();
    const memoOptions = useSelector(selectMemoOptions);
    const isMemoNextPageLoading = useSelector(selectIsMemoNextPageLoading);
    const memoNextPage = useSelector(selectMemoNextPage);
    const selectChildeMemoCategory = useSelector(selectSelectChildMemoCategory);
    const scrollableTarget = "memoEditor"
    const hasMemoOptions = memoOptions[0]
    let isSelectChildMemoCategory = selectChildeMemoCategory.memoCategoryId
    const [isDeleteMemoOpen, setIsDeleteMemoOpen] = useState<boolean>(false);
    const isMemoReflesh = useSelector(selectIsMemoReflesh);

    const initialMemoProps: MemoProps = {
        memoTitle: null,
        memoPriority: 3,
        memoText: null,
        note: selectChildeMemoCategory.note,
        parentMemoCategory: selectChildeMemoCategory.parentMemoCategory,
        childMemoCategory: selectChildeMemoCategory.memoCategoryId,
        purpose: null,
    }

    const onClick = () => {
        dispatch(fetchAsyncGetMemosNextPage(memoNextPage));
    }

    const handleCreateNewMemo = (initialMemoProps: MemoProps) => {
        dispatch(fetchAsyncCreateMemo(initialMemoProps));
    }
    
    const endReflesh = () => dispatch(endMemoReflesh())

    const memoReflesh = () => {
        dispatch(startMemoReflesh());
        setTimeout(endReflesh,500);
    }
    
    const onClickDeleteButton = (memoId: string) => {
        dispatch(fetchAsyncLogicalDeleteMemo(memoId));
        setIsDeleteMemoOpen(false);
        memoReflesh();
    }


    useEffect(() => {
        dispatch(fetchAsyncGetPurposes());
    }, [] )

    return (
        
        <>
            <Box
                id={scrollableTarget}
                sx={{
                    height: "calc(100% - 64px)",
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    alignItems: 'center',
                    width: "100%",
                    pb:2,
                }}
            >

                <Typography
                    variant="h3"
                    sx={{my:1}}
                >
                    Memo
                </Typography>

                {isMemoReflesh &&
                
                    <Box
                        sx={{
                            width: '100%',
                            px:2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >

                            <InfiniteScroll
                                dataLength={memoOptions.length}
                                next={onClick}
                                hasMore={isMemoNextPageLoading}
                                loader={ hasMemoOptions && <MemoLoader/>}
                                scrollableTarget={scrollableTarget}
                                style={{width: "calc(100%-100px)"}}
                                endMessage={ 
                                    isSelectChildMemoCategory &&
                                        <NewMemoButton
                                            initialMemoProps={initialMemoProps}
                                            handleCreateNewMemo={() => handleCreateNewMemo(initialMemoProps)}
                                        />
                                }
                                
                            >
                                {isSelectChildMemoCategory
                                    ?
                                        <>
                                            {memoOptions.map((memoOption) => (
                                                <MemoCard 
                                                    memo={memoOption}
                                                    onClickDeletePropertyButton={setIsDeleteMemoOpen}
                                                />
                                            ))}
                                        </>
                                    :
                                        <Box>
                                            choose a childMemoCategory
                                        </Box>
                                }
                            </InfiniteScroll>

                    </Box>
                }

            </Box>

            <MemoDeleteDialog
                headerTitle="メモ削除"
                isOpen={isDeleteMemoOpen}
                onClose={setIsDeleteMemoOpen}
                footerButton={
                    <DeleteMemoButton
                        formId="memoCategoryDel"
                        onClick={onClickDeleteButton}
                    />}
                formId="memoCategoryDel"
            />
            
        </>
    );
};