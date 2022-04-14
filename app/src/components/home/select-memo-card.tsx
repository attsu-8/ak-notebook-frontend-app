


import { VFC } from "react";
import { Box, Card,CardActions } from "@mui/material";
import type { Memo } from "../../types/memo/memo";
import { MemoCardTitle } from "../memo/memo/memo-card-title";
import { MemoCardPriority } from "../memo/memo/memo-card-priority";
import { MemoCardContent } from "../memo/memo/memo-card-content";


interface SelectMemoCardProps {
    memo: Memo;
    onClickDeletePropertyButton: (isDeleteMemoOpen: boolean) => void;
}
  

export const SelectMemoCard: VFC<SelectMemoCardProps> = (props) => {
    const { memo, onClickDeletePropertyButton, ...other} = props;
    
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

                    <CardActions 
                        disableSpacing
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                mb:2,
                                mr:5,
                                width:"70%"
                            }}
                        >
                            <MemoCardTitle memo={memo} />
                        </Box>

                        <Box
                            sx={{
                                mb:5,
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
