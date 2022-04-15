import { useEffect, useState, VFC } from "react";
import { Box, Card, Collapse, Tooltip } from "@mui/material";
import type { Memo } from "../../../types/memo/memo";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MemoCardTitle } from "./memo-card-title";
import { MemoCardPriority } from "./memo-card-priority";
import { MemoCardContent } from "./memo-card-content";
import { MemoCardItemProperty } from "./memo-card-item-property";
import { changeEditMemo, fetchAsyncCountBrowsingMemo } from "../../../slices/memo/memoSlice";
import { useDispatch } from "react-redux";
import { debounce } from "../../../utils/debounce";
import { fetchAsyncPatchLearningEfficiency } from "../../../slices/home/learningEfficiencySlice";
import { formatDate } from "../../../utils/date/formatDate";


interface MemoCardProps {
    memo: Memo;
    onClickDeletePropertyButton: (isDeleteMemoOpen: boolean) => void;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
}));

export const MemoCard: VFC<MemoCardProps> = (props) => {
    const { memo, onClickDeletePropertyButton, ...other} = props;
    const [expanded, setExpanded] = useState(false);
    const [browsingCountTimerId,setBrowsingCountTimerId] = useState(null);
    const isPatchedMemo = memo.createdAt === memo.updatedAt 
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);

        !expanded ? 
            debounce(
                () => {
                    dispatch(fetchAsyncCountBrowsingMemo(memo.memoId))
                    dispatch(fetchAsyncPatchLearningEfficiency(`${formatDate(new Date)}${memo.memoId}`))
                },
                browsingCountTimerId,
                setBrowsingCountTimerId,
                2000
            )()
        :
            debounce(
                () => {
                    //メモテキストを閉じた場合は閲覧カウントを実施しないため、処理としては何もしない
                    //三項演算子で何もしない処理を指定しないとexpandの開閉を高速で行ったときにカウントされてしまう
                },
                browsingCountTimerId,
                setBrowsingCountTimerId,
                2000
            )()
            

    };

    const onClickDeleteProperty = (memo: Memo) => {
        dispatch(changeEditMemo({
            memoId: memo.memoId,
            memoTitle: memo.memoTitle
        }))
        onClickDeletePropertyButton(true);
    }
    
    useEffect(()=>{
        isPatchedMemo && setExpanded(true) 
    },[])

    return (
        <>
        
            <Box
                sx={{
                    outline: 'none',
                    py: 1,
                    width: "100%"
                }}
                {...other}
            >
                <Card            
                >

                    <Box sx={{
                        display: "flex",
                        p:2,
                    }}>
                        <Box
                            sx={{ 
                                width: "75%",
                                mt:2,
                            }}
                        >
                            <MemoCardTitle memo={memo} />
                        </Box>

                        <Box
                            sx={{
                                mb:2,
                                mx:2,
                                width:"20%"
                            }}
                        >
                            <MemoCardPriority memo={memo} />
                        </Box>

                        <Box
                            sx={{ 
                                width: "5%",
                                mt: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mr:2,
                                }}
                            >
                                <Box sx={{
                                    mb:2,
                                    }}>
                                    <MemoCardItemProperty 
                                        memo={memo}
                                        onClickDeleteProperty={onClickDeleteProperty} 
                                    />
                                </Box>
                                
                                <Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display:"flex"
                        }}
                    >

                        <Box
                            sx={{width:"95%"}}
                        >
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <MemoCardContent memo={memo} />
                            </Collapse>
                        </Box>
                        <Tooltip
                            title="メモの内容を確認"
                        >
                            <Box
                                sx={{
                                    width:"5%",
                                    mr:3.5,
                                    mb:2
                                }}
                            >
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon fontSize="large" />
                                    </ExpandMore>
                            </Box>
                        </Tooltip>
                    </Box>



                </Card>
            </Box>

        </>
    ); 
};
