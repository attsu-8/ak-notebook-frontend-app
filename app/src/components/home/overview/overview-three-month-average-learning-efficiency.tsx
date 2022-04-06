import { useTheme, alpha } from '@mui/material/styles';
import { ChartData, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, ElementChartOptions, PluginChartOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectThreeMonthAverageLearningEfficiencyRateToday, selectThreeMonthAverageLearningEfficiencyRateYesterday } from "../../../slices/home/learningEfficiencySlice";
import { OverviewLearningEfficiencyCard } from "./overview-learning-efficiency-card";

type DoughnutOptions = _DeepPartialObject<CoreChartOptions<"doughnut"> & ElementChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut">  & DoughnutControllerChartOptions>

export const OverviewThreeMonthAverageLearningEfficiency: VFC = () => {
    const threeMonthAverageLearningEfficiencyRateToday = useSelector(selectThreeMonthAverageLearningEfficiencyRateToday);
    const threeMonthAverageLearningEfficiencyRateYesterday = useSelector(selectThreeMonthAverageLearningEfficiencyRateYesterday);
    const theme = useTheme();

    const data: ChartData<"doughnut", number[], string> = {
      labels: ['学習効率','学習効率_空'],
      datasets: [
          {
            label: '３ヶ月平均の全体学習効率',
            data: [threeMonthAverageLearningEfficiencyRateToday,100 - threeMonthAverageLearningEfficiencyRateToday],
            backgroundColor: [
              theme.palette.secondary.main,
              alpha(theme.palette.secondary.main,0.08)
            ],
            borderColor: [
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0)',
            ],
            hoverBackgroundColor: [
              theme.palette.secondary.main,
              alpha(theme.palette.secondary.main,0.08)
            ],
          },
        ],
      };
    
    const options: DoughnutOptions | any = {
        datasets: {
            doughnut: {
                cutout: '70%',
            },
        },
        plugins: {
            tooltip: {
                enabled:false
            },
            legend: {
                display: false
            }
        },
    }

    return (
        <OverviewLearningEfficiencyCard
            chartData={data}
            chartOptions={options}
            subTitle={"3ヶ月平均"}
            todayLearningEfficiencyRate={threeMonthAverageLearningEfficiencyRateToday}
            yesterdayLearningEfficiencyRate={threeMonthAverageLearningEfficiencyRateYesterday}
            todayLearningEfficiencyRateColor={theme.palette.secondary.main}
        />
    );
};