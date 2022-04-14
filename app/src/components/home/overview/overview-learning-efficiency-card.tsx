import { Box, Card, Typography } from "@mui/material";
import { ChartData, CoreChartOptions, DatasetChartOptions, DoughnutControllerChartOptions, PluginChartOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { VFC } from "react";
import { Doughnut } from "react-chartjs-2";
import { LearningEfficiencyRateOfIncrease } from "./learning-efficiency-rate-of-increase";
import { Chart as ChartJS, ArcElement } from 'chart.js';


type DoughnutOptions = _DeepPartialObject<CoreChartOptions<"doughnut"> & PluginChartOptions<"doughnut"> & DatasetChartOptions<"doughnut"> & DoughnutControllerChartOptions>

interface OverviewLearningEfficiencyCardProps {
    chartData: ChartData<"doughnut", number[], string>;
    chartOptions: DoughnutOptions;
    subTitle: string;
    todayLearningEfficiencyRate: number;
    yesterdayLearningEfficiencyRate: number;
    todayLearningEfficiencyRateColor: string;
}

export const OverviewLearningEfficiencyCard: VFC<OverviewLearningEfficiencyCardProps> = (props) => {
    const {chartData, chartOptions, subTitle, todayLearningEfficiencyRate, yesterdayLearningEfficiencyRate, todayLearningEfficiencyRateColor, ...other} = props;
    const learningEfficiencyRateOfIncrease = Math.round((todayLearningEfficiencyRate - yesterdayLearningEfficiencyRate) * 10) / 10;

    ChartJS.register(ArcElement);

    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                width:"100%",
                p:1,
            }}
        >
                <Box
                    sx={{
                        height: "100%",
                        width: "30%",
                        p:1,
                    }}
                >
                    {todayLearningEfficiencyRate
                        &&
                            <Doughnut
                                data={chartData}
                                options={chartOptions}
                            />
                    }
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width:"60%",
                    }}
                >
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            align="center"
                        >
                            {`全体学習効率`}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            align="center"
                        >
                            {`（${subTitle}）`}
                        </Typography>
                        <Box>
                            <Typography
                                color={todayLearningEfficiencyRateColor}
                                variant="h4"
                            >
                                {`${todayLearningEfficiencyRate}%`}
                            </Typography>
                        </Box>

                </Box>

                <Box
                    sx={{
                        width: "10%",
                        mr: 2
                    }}
                >
                    {yesterdayLearningEfficiencyRate !== 0
                        &&
                            <LearningEfficiencyRateOfIncrease 
                                learningEfficiencyRateOfIncrease={learningEfficiencyRateOfIncrease}
                            />
                    }
                </Box>

        </Card>
    );
}