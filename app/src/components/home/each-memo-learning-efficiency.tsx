import { Box, Card, CircularProgress, Divider, Typography } from "@mui/material";
import { MouseEvent, useRef, useState, VFC } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
} from 'chart.js';
import { getElementAtEvent, Scatter } from 'react-chartjs-2';
import { useSelector, useDispatch } from "react-redux";
import { selectEachMemoLearningEfficiencyOptions, fetchAsyncGetSelectMemoLearningEfficiency, selectSelectEachParentMemoCategoryLearningEfficiency, selectIsFetchMemoData, selectAggregateDate, fetchAsyncPatchLearningEfficiency, fetchAsyncGetEachMemoLearningEfficiency, selectSelectPriority } from "../../slices/home/learningEfficiencySlice";
import { _DeepPartialObject } from "chart.js/types/utils";
import { SelectMemoDialog } from "./select-memo-dialog";
import { MemoEmojiIcon } from "../memo/commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../memo/commons/icon/memo-category-icon";
import { useTheme } from '@mui/material/styles';
import { fetchAsyncCountBrowsingMemo } from "../../slices/memo/memoSlice";
import { formatDate } from "../../utils/date/formatDate";
import { PriorityForm } from "./each-memo-priority-form";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
interface memoData {memoId: string, childMemoCategoryName: string, title: string, x: number, y: number}
interface memoDataset {label: string; data: memoData[]; backgroundColor: string;};

type MemoScatterOption = _DeepPartialObject<CoreChartOptions<"scatter"> & ElementChartOptions<"scatter"> & PluginChartOptions<"scatter"> & DatasetChartOptions<"scatter"> & ScaleChartOptions<"scatter"> & LineControllerChartOptions>

export const EachMemoLearningEfficiency: VFC = () => {
    const eachMemoLearningEfficiencyOptions = useSelector(selectEachMemoLearningEfficiencyOptions);
    const selectParentMemoCategory = useSelector(selectSelectEachParentMemoCategoryLearningEfficiency)
    const isFetchMemoData = useSelector(selectIsFetchMemoData);
    const [isOpenSelectMemoDialog, setIsOpenSelectMemoDialog] = useState<boolean>(false);
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const aggregateDate = useSelector(selectAggregateDate);
    const theme = useTheme();
    const eachParentMemoCategoryLearningEfficiencySelectData = useSelector(selectSelectEachParentMemoCategoryLearningEfficiency);
    const priority = useSelector(selectSelectPriority);
    const priorityValues: any[] = Object.values(priority);
    const dummySets: [string | boolean] = ['dummy']; 
    const selectPriority = dummySets.concat(priorityValues);
    const filterdEachMemoLearningEfficiencyOptions = eachMemoLearningEfficiencyOptions.filter(
      (option) => {
        return selectPriority[option.memoPriority]
      }
    )
    
    const colorSets = [
      theme.palette.primary.dark,
      theme.palette.primary.main,
      theme.palette.primary.light,
    ]

    const handleOnClose = () => {
      setIsOpenSelectMemoDialog(false);
    }

    const titleItem = (tooltipItem) => {
      const ChildMemoCategoryName = datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].dataIndex].childMemoCategoryName
      return `子カテゴリ：${ChildMemoCategoryName}`
    };

    const afterTitleItem = (tooltipItem) => {
      const memoTitle = datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].dataIndex].title
      return `メモタイトル：${memoTitle}`
    }

    const labelItem = (tooltipItem) => {
      const elapsedDateCount = tooltipItem.raw.x
      const learningEfficiencyRate = tooltipItem.raw.y
      return `経過日数：${elapsedDateCount}日 | 学習効率：${learningEfficiencyRate}％`
    }
    
    const datasets:memoDataset[] = []
    let childMemoCategoryCount = 0
    
    filterdEachMemoLearningEfficiencyOptions.forEach((memoOption) => {
      const index = datasets.findIndex((dataset) => dataset.label === memoOption.childMemoCategoryName)
      //データセットに子カテゴリが存在しない場合は−1を返す
      if (index ===  -1) {
        const colorSetIndex = childMemoCategoryCount % colorSets.length
        datasets.push({
          label: memoOption.childMemoCategoryName,
          data: [], 
          backgroundColor: colorSets[colorSetIndex]
        })
        childMemoCategoryCount = childMemoCategoryCount + 1
      }
    })

    filterdEachMemoLearningEfficiencyOptions.forEach((memoOption, index) => {
      const datasetIndex = datasets.findIndex((data) => data.label === memoOption.childMemoCategoryName)
      datasets[datasetIndex].data.push({
        memoId: memoOption.memoId, 
        childMemoCategoryName: memoOption.childMemoCategoryName, 
        title:memoOption.memoTitle, 
        x:memoOption.elapsedDateCount, 
        y:memoOption.learningEfficiencyRate
      })
    })

    const data = {
        datasets: datasets,
      };

    const options: MemoScatterOption = {
        datasets: {
          scatter: {
            pointRadius: 8,
            pointHoverRadius: 10,
          },
        },
        plugins:{
          tooltip: {
            callbacks: {
              title: titleItem,
              afterTitle: afterTitleItem,
              label: labelItem,
            },
            mode: "nearest"
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "経過日数［日］"
            },
            grid: {
              color: "#EEE",
              drawBorder: false,
            },
            min: 0
          },
          y: {
            title: {
              display: true,
              text: "学習効率［％］",  
            },
            grid: {
              color: "#EEE",
              drawBorder: false,
            },
            beginAtZero: true,
            min: 0,
            max: 100,
          },
          
        },
    };

    const handleClick = async (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
      const element: any = getElementAtEvent(chartRef.current, event);
      if(element.length !== 0) {
        const memoId: string = element[0].element.$context.raw.memoId
        await dispatch(fetchAsyncGetSelectMemoLearningEfficiency(memoId));
        await setIsOpenSelectMemoDialog(true);
        await dispatch(fetchAsyncCountBrowsingMemo(memoId));
        await dispatch(fetchAsyncPatchLearningEfficiency(`${formatDate(new Date)}${memoId}`))
        await dispatch(fetchAsyncGetEachMemoLearningEfficiency(eachParentMemoCategoryLearningEfficiencySelectData.parentMemoCategoryId))
      }
    }      

    return (
      <>
        <Card
          sx={{
            width: "100%",
            p: 1
          }}
                >
            {selectParentMemoCategory
              ?
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      width: "85%"
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
                      
                      <Typography
                          color="textSecondary"
                          variant="body2"
                          sx={{
                            ml: "auto"
                          }}
                      >
                        {`(${aggregateDate} 時点)`}
                      </Typography>
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
                      </Box>
                    </Box>
                    
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      width: "100%"
                    }}
                  >

                    
                    <Box
                      sx={{
                        p:1,
                        width:"85%",
                      }}
                    >
                      <Scatter 
                          ref={chartRef}
                          options={options} 
                          data={data}     
                          onClick={(event) => {
                            handleClick(event);
                          }}      
                      />
                    </Box>
                    
                    <Divider 
                      orientation="vertical"
                      flexItem
                      sx={{mb: 1}}
                    />

                    <Box
                      sx={{
                        width:"15%",
                        px:1
                      }}
                    >
                      <Typography
                          color="textSecondary"
                          variant="body2"
                          align="center"
                      >
                        {`優先度`}
                      </Typography>

                      <Box
                        sx={{
                          px:1,
                          pt:1,
                        }}
                      >
                        <PriorityForm />
                      </Box>
                    </Box>
                  </Box>


                </Box>
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
                          variant="body2"
                      >
                        親カテゴリ別学習効率チャートよりノートを選択してください。
                      </Typography>
                  }
                </Box>
            }
        </Card>

        <SelectMemoDialog 
          isOpen={isOpenSelectMemoDialog}
          onClose={handleOnClose}
        />
      </>
    );
}