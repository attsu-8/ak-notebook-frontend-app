import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from "@mui/material";
import { BarControllerChartOptions, ChartData, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { MouseEvent, useRef, VFC } from "react";
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
import { fetchAsyncGetEachParentMemoCategoryLearningEfficiency, resetSelectEachParentMemoCategoryLearningEfficiency, selectAggregateDate, selectEachNoteLearningEfficiencyOptions, setIsFetchParentMemoCategoryData, setSelectEachNoteLearningEfficiency } from "../../slices/home/learningEfficiencySlice";
import { omitName } from '../../utils/omitName';
import { fetchAsyncGetPurposesFilter } from '../../slices/memo/purposeSlice';

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

export const EachNoteLearningEfficiencyRate:VFC = () => {
    const eachNoteLearningEfficiencyOptions = useSelector(selectEachNoteLearningEfficiencyOptions);
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();
    
    const labels = eachNoteLearningEfficiencyOptions.map((option) => omitName(option.noteName));
    const chartData = eachNoteLearningEfficiencyOptions.map((option) => option.averageLearningEfficiencyRate);
    const aggregateDate = useSelector(selectAggregateDate)

    
    const titleItem = (tooltipItem) => {
      return eachNoteLearningEfficiencyOptions[tooltipItem[0].dataIndex].noteName
    };

    const labelItem = (tooltipItem) => {
      return `${tooltipItem.raw}%`
    };

    const handleClick = (event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
      const element = getElementAtEvent(chartRef.current, event);
      if(element.length !== 0) {
        const note = eachNoteLearningEfficiencyOptions[element[0].index]
        dispatch(setIsFetchParentMemoCategoryData());
        dispatch(resetSelectEachParentMemoCategoryLearningEfficiency())
        dispatch(setSelectEachNoteLearningEfficiency(note))
        dispatch(fetchAsyncGetEachParentMemoCategoryLearningEfficiency(note.noteId))
        dispatch(fetchAsyncGetPurposesFilter(note.noteId))
      }
    }      

    const data: BarData = {
      labels,
      datasets:[
        {
          label:"学習効率",
          data: chartData,
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
            p:1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
            <Box
              sx={{
                p:0.5,
                display:"flex",
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
                  {`ノート別学習効率`}
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
              <Bar 
                  ref={chartRef}
                  options={options}
                  data={data}
                  onClick={(event) => {
                      handleClick(event);
                  }}
              />
            </Box>
        </Card>
    );
}