


import { VFC } from "react";
import { Box, Card,CardActions, Typography } from "@mui/material";
import type { Memo } from "../../types/memo/memo";
import { MemoCardTitle } from "../memo/memo/memo-card-title";
import { MemoCardPriority } from "../memo/memo/memo-card-priority";
import { MemoCardContent } from "../memo/memo/memo-card-content";
import { useSelector } from "react-redux";
import { selectSelectChildMemoCategoryName } from "../../slices/home/learningEfficiencySlice";


interface SelectMemoCardProps {
    memo: Memo;
    onClickDeletePropertyButton: (isDeleteMemoOpen: boolean) => void;
}
  

export const SelectMemoCard: VFC<SelectMemoCardProps> = (props) => {
    const { memo, onClickDeletePropertyButton, ...other} = props;
    const selectChildMemoCategoryName = useSelector(selectSelectChildMemoCategoryName)
    
    return (
        <>
        
            <Box
                sx={{
                    outline: 'none',
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
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                mb:5,
                                ml:1,
                                width: "100%"
                            }}
                        >
                            <Typography
                                color="textSecondary"
                                variant="h6"
                            >
                                {`子カテゴリ名：${selectChildMemoCategoryName}`}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "senter",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    mr:5,
                                    width:"70%"
                                }}
                            >
                                <MemoCardTitle memo={memo} />
                            </Box>

                            <Box
                                sx={{
                                    width:"30%"
                                }}
                            >
                                <MemoCardPriority memo={memo} />
                            </Box>
                        </Box>
                    </CardActions>

                    <MemoCardContent memo={memo} />

                </Card>
            </Box>

        </>
    ); 
};
