import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { BarControllerChartOptions, ChartData, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { MouseEvent, useRef,VFC } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncGetEachMemoLearningEfficiency, selectAggregateDate, selectEachParentMemoCategoryLearningEfficiencyOptions, selectIsFetchParentMemoCategoryData, selectSelectEachNoteLearningEfficiency, selectTodayLearningEfficiencyRate, setSelectEachParentMemoCategoryLearningEfficiency } from "../../slices/home/learningEfficiencySlice";
import { useTheme } from '@mui/material/styles';
import { omitName } from "../../utils/omitName";
import { MemoNoteIcon } from "../memo/commons/icon/memo-note-icon";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

type BarOptions = _DeepPartialObject<CoreChartOptions<"bar"> & ElementChartOptions<"bar"> & PluginChartOptions<"bar"> & DatasetChartOptions<"bar"> & ScaleChartOptions<"bar"> & BarControllerChartOptions>
type BarData = ChartData<"bar", number[], unknown>

export const EachParentMemoCategoryLearningEfficiencyRate:VFC = () => {
    const eachParentMemoCategoryLearningEfficiencyOptions = useSelector(selectEachParentMemoCategoryLearningEfficiencyOptions);
    const selectNote = useSelector(selectSelectEachNoteLearningEfficiency);
    const isFetchParentMemoCategoryData = useSelector(selectIsFetchParentMemoCategoryData);
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const labels = eachParentMemoCategoryLearningEfficiencyOptions.map((option) => omitName(option.parentMemoCategoryName));
    const chartData = eachParentMemoCategoryLearningEfficiencyOptions.map((option) => option.averageLearningEfficiencyRate);
    const aggregateDate = useSelector(selectAggregateDate);
    
    const titleItem = (tooltipItem) => {
      return eachParentMemoCategoryLearningEfficiencyOptions[tooltipItem[0].dataIndex].parentMemoCategoryName
    };
    
    const labelItem = (tooltipItem) => {
      return `${tooltipItem.raw}%`
    };

    const handleClick = (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
      const element = getElementAtEvent(chartRef.current, event);
      if(element.length !== 0) {
        dispatch(setSelectEachParentMemoCategoryLearningEfficiency(eachParentMemoCategoryLearningEfficiencyOptions[element[0].index]))
        dispatch(fetchAsyncGetEachMemoLearningEfficiency(eachParentMemoCategoryLearningEfficiencyOptions[element[0].index].parentMemoCategoryId))
      }
    }      

    const data: BarData = {
        labels,
        datasets:[
            {
                label:"学習効率",
                data: chartData
            }
        ]
    }

    const options: BarOptions = {
      responsive: true,
      datasets: {
        bar: {
          backgroundColor: [theme.palette.primary.main],
          maxBarThickness: 50,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false
        },
        tooltip: {
          callbacks: {
            title: titleItem,
            label: labelItem,
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 0,
            minRotation: 0,
          },
          grid: {
            display: false,
            drawBorder: false,
          }
        },
        y: {
          title: {
            display: true,
            text: "学習効率［％］"
          },
          grid: {
            drawBorder: false
          },
          min: 0,
          max: 100,
        }
      },
  }

    return (
        <Card
          sx={{
            width: "100%",
            p: 1
          }}
        >
            {selectNote
              ?
                <>
                  <Box
                    sx={{
                      p:0.5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
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
                      {`親カテゴリ別学習効率`}
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
                      p:1,
                    }}
                  >
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
                          選択中のノート：
                          <MemoNoteIcon
                            fontSize='small'
                            iconColor={selectNote.noteColor}
                          />
                          {`${selectNote.noteName}`}
                        </Typography>
                      </Box>
                    </Box>

                    <Bar 
                        ref={chartRef}
                        options={options}
                        data={data}
                        onClick={(event) => {
                            handleClick(event);
                        }}
                    />
                  </Box>
                </>
              :
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display:"flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {isFetchParentMemoCategoryData
                    ?
                      <CircularProgress />
                    :
                      <Typography
                          color="textSecondary"
                          variant="body1"
                      >
                        ノート別学習効率チャートよりノートを選択してください。
                      </Typography>
                  }
                </Box>
            }


        </Card>
    );
}