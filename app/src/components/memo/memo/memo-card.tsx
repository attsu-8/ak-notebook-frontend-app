import { useEffect, useState, VFC } from "react";
import { Box, Card,CardActions,Collapse } from "@mui/material";
import type { Memo } from "../../../types/memo/memo";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MemoCardTitle } from "./memo-card-title";
import { MemoCardPurpose } from "./memo-card-purpose";
import { MemoCardPriority } from "./memo-card-priority";
import { MemoCardContent } from "./memo-card-content";
import { MemoCardItemProperty } from "./memo-card-item-property";
import { changeEditMemo, fetchAsyncCountBrowsingMemo } from "../../../slices/memo/memoSlice";
import { useDispatch } from "react-redux";
import { debounce } from "../../../utils/debounce";


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
                            sx={{ width: "95%"}}
                        >
                            <MemoCardTitle memo={memo} />
                        </Box>

                        <Box
                            sx={{ 
                                width: "5%",
                                mx: 1
                            }}
                        >
                            <MemoCardItemProperty 
                                memo={memo}
                                onClickDeleteProperty={onClickDeleteProperty} 
                            />
                        </Box>
                    </Box>

                    <CardActions 
                        disableSpacing
                    >
                        <Box
                            sx={{
                                mb:2,
                                width:"70%"
                            }}
                        >
                            <MemoCardPurpose memo={memo} />
                        </Box>

                        <Box
                            sx={{
                                mb:2,
                                width:"30%"
                            }}
                        >
                            <MemoCardPriority memo={memo} />
                        </Box>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon fontSize="large" />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <MemoCardContent memo={memo} />
                    </Collapse>

                </Card>
            </Box>

        </>
    ); 
};
