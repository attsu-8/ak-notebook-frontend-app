


import { useEffect, useState, VFC } from "react";
import { Box, Card,CardActions,Collapse } from "@mui/material";
import type { Memo } from "../../types/memo/memo";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { MemoCardTitle } from "../memo/memo/memo-card-title";
import { MemoCardPurpose } from "../memo/memo/memo-card-purpose";
import { MemoCardPriority } from "../memo/memo/memo-card-priority";
import { MemoCardContent } from "../memo/memo/memo-card-content";
import { MemoCardItemProperty } from "../memo/memo/memo-card-item-property";
import { changeEditMemo, fetchAsyncCountBrowsingMemo } from "../../slices/memo/memoSlice";
import { useDispatch } from "react-redux";
import { debounce } from "../../utils/debounce";


interface SelectMemoCardProps {
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

export const SelectMemoCard: VFC<SelectMemoCardProps> = (props) => {
    const { memo, onClickDeletePropertyButton, ...other} = props;
    
    const dispatch = useDispatch();

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

                    </CardActions>

                    <MemoCardContent memo={memo} />

                </Card>
            </Box>

        </>
    ); 
};
