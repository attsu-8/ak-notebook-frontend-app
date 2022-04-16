import { Box, Divider, Theme, Typography, useMediaQuery } from "@mui/material";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectSelectEachParentMemoCategoryLearningEfficiency, selectAggregateDate } from "../../slices/home/learningEfficiencySlice";
import { _DeepPartialObject } from "chart.js/types/utils";
import { MemoEmojiIcon } from "../memo/commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../memo/commons/icon/memo-category-icon";
import { PriorityForm } from "./each-memo-priority-form";
import { PriorityButton } from "./each-memo-priority-button";
import { EachMemoLearningEfficiencyScatter } from "./each-memo-learning-efficiency-scatter";

export const EachMemoLearningEfficiencyScatterCard: VFC = () => {
    const selectParentMemoCategory = useSelector(selectSelectEachParentMemoCategoryLearningEfficiency)
    const aggregateDate = useSelector(selectAggregateDate);
    const mdUp = useMediaQuery(
      (theme: Theme) => theme.breakpoints.up('md'),
          {
              noSsr: true
          }
    );      
    const smUp = useMediaQuery(
      (theme: Theme) => theme.breakpoints.up('sm'),
          {
              noSsr: true
          }
    );      

    let eachMemoLearningProps: any = {}

    if (mdUp) {
      eachMemoLearningProps = {
        chartWidth: "90%",
        priorityFormWidth: "10%",
      }
    } else if (smUp) {
      eachMemoLearningProps = {
        chartWidth: "92.5%",
        priorityFormWidth: "7.5%",
      }
    } else {
      eachMemoLearningProps = {
        chartWidth: "100%",
        priorityFormWidth: "0%",
      }
    }

    return (
      <Box
        sx={{ display: "flex",}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: eachMemoLearningProps.chartWidth
          }}
        >
          <Box
            sx={{
              p:0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
                color="textSecondary"
                variant="body2"
                align="center"
                sx={{
                  position: "absolute",
                  mx: "auto"
                }}
            >
              {`メモ別学習効率`}
            </Typography>
            
            {mdUp
              &&
                <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{
                      ml: "auto"
                    }}
                >
                  {`(${aggregateDate} 時点)`}
                </Typography>
            
            }
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                my:0.5,
                pt:1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                  color="textSecondary"
                  variant="body2"
                  align="center"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
              >
                選択中の親カテゴリ：
                {selectParentMemoCategory.parentMemoCategoryIcon
                  ? 
                    <MemoEmojiIcon
                      emojiId={selectParentMemoCategory.parentMemoCategoryIcon}
                      emojiSize={22}
                    />
                  :
                    <MemoCategoryIcon 
                      fontSize="small"
                    />
                }
                {`${selectParentMemoCategory.parentMemoCategoryName}`}
              </Typography>
              {!smUp
                &&
                    <Box
                      sx={{
                        marginLeft: 'auto',
                        position: 'absolute',
                        right:10,
                      }}
                    >
                      <PriorityButton />
                    </Box>

              }
            </Box>
          </Box>
          <Box
            sx={{
              p:1,
              width: "100%"
            }}
          >
            <EachMemoLearningEfficiencyScatter />
          </Box>
        </Box>
        
        {mdUp
          ?
            <Box
              sx={{
                display: "flex",
                pt: 5,
                width: eachMemoLearningProps.priorityFormWidth
              }}
            >
              <Divider  orientation="vertical"/>
              <Box
                sx={{
                  pt:1,
                  pl:1,
                }}
              >
                <Typography
                    color="textSecondary"
                    variant="body2"
                    align="center"
                >
                  {`重要度`}
                </Typography>
                
                <Box>
                  <PriorityForm />
                </Box>                
              </Box>
            </Box>
          :
            smUp
              &&
                <Box
                  sx={{
                    display: "flex",
                    width: eachMemoLearningProps.priorityFormWidth,
                    mt: 5,
                  }}
                >
                  <Divider 
                    orientation="vertical"
                  />
                  <Box sx={{ml:1}}>
                    <PriorityButton />
                  </Box>
                </Box>
        }
      </Box>
    );
}