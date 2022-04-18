import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectSelectEachParentMemoCategoryLearningEfficiency, selectIsFetchMemoData } from "../../slices/home/learningEfficiencySlice";
import { _DeepPartialObject } from "chart.js/types/utils";
import { EachMemoLearningEfficiencyScatterCard } from "./each-memo-learning-efficiency-scatter-card";

export const EachMemoLearningEfficiency: VFC = () => {
    const selectParentMemoCategory = useSelector(selectSelectEachParentMemoCategoryLearningEfficiency)
    const isFetchMemoData = useSelector(selectIsFetchMemoData);

    return (
      <>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            p: 1
          }}
                >
            {selectParentMemoCategory
              ?
                <EachMemoLearningEfficiencyScatterCard />
              :
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    display:"flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {isFetchMemoData
                    ?
                      <CircularProgress />
                    :
                      <Typography
                          color="textSecondary"
                          variant="body1"
                      >
                        親カテゴリ別学習効率チャートより親カテゴリを選択してください。
                      </Typography>
                  }
                </Box>
            }
        </Card>
      </>
    );
}