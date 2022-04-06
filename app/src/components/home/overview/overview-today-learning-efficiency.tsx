import { alpha, useTheme } from '@mui/material/styles';
import { ChartData, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, PluginChartOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { VFC } from "react";
import {  useSelector } from "react-redux";
import { selectAggregateDate, selectTodayLearningEfficiencyRate, selectYesterdayLearningEfficiencyRate } from "../../../slices/home/learningEfficiencySlice";
import { OverviewLearningEfficiencyCard } from "./overview-learning-efficiency-card";

type DoughnutOptions = _DeepPartialObject<CoreChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & DoughnutControllerChartOptions>

export const OverviewTodayLearningEfficiency: VFC = () => {
    const aggregateDate = useSelector(selectAggregateDate)
    const todayLearningEfficiencyRate = useSelector(selectTodayLearningEfficiencyRate)
    const yesterdayLearningEfficiencyRate = useSelector(selectYesterdayLearningEfficiencyRate)
    const theme = useTheme();

    const data: ChartData<"doughnut", number[], string> = {
        labels: ['学習効率','学習効率_空'],
        datasets: [
          {
            label: '本日時点の全体学習効率',
            data: [todayLearningEfficiencyRate, 100 - todayLearningEfficiencyRate],
            backgroundColor: [
                theme.palette.primary.main,
                alpha(theme.palette.primary.main,0.08)
            ],
            borderColor: [
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0)',
            ],
            hoverBackgroundColor: [
                theme.palette.primary.main,
                alpha(theme.palette.primary.main,0.08)
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
            subTitle={`${aggregateDate.toString()} 時点`}
            todayLearningEfficiencyRate={todayLearningEfficiencyRate}
            yesterdayLearningEfficiencyRate={yesterdayLearningEfficiencyRate}
            todayLearningEfficiencyRateColor={theme.palette.primary.main}
        />
    );
};