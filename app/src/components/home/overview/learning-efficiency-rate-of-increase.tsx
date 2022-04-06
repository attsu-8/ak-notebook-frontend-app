import { Avatar, Tooltip } from "@mui/material";
import { alpha, useTheme } from '@mui/material/styles';
import { VFC } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface LearningEfficiencyRateOfIncreaseProps{
    learningEfficiencyRateOfIncrease: number;
};

interface RateOfIncrease {
    col: string;
    message: string;
    icon:  JSX.Element;
};

export const LearningEfficiencyRateOfIncrease: VFC<LearningEfficiencyRateOfIncreaseProps> = (props) => {
    const {learningEfficiencyRateOfIncrease, ...other} = props;
    let rateOfIncrease: RateOfIncrease = null;
    const theme = useTheme();

    learningEfficiencyRateOfIncrease > 0 
        ?
            rateOfIncrease = {
                col: theme.palette.success.main,
                message: `昨日比 +${learningEfficiencyRateOfIncrease}%`,
                icon: <KeyboardArrowUpIcon fontSize="medium" />
            }
        :
            learningEfficiencyRateOfIncrease === 0
                ?
                    rateOfIncrease = {
                        col: theme.palette.warning.main,
                        message: `昨日比 ±${learningEfficiencyRateOfIncrease}%`,
                        icon: <KeyboardArrowRightIcon fontSize="medium" />
                    }
                :
                    rateOfIncrease = {
                        col: theme.palette.error.main,
                        message: `昨日比 ${learningEfficiencyRateOfIncrease}%`,
                        icon: <KeyboardArrowDownIcon fontSize="medium" />
                    }
                        
    return (
            <Tooltip title={rateOfIncrease.message}>
                <Avatar
                    sx={{
                        backgroundColor: alpha(rateOfIncrease.col, 0.15),
                        color: rateOfIncrease.col
                    }}
                    variant="rounded"
                >
                    {rateOfIncrease.icon}
                </Avatar>
            </Tooltip>
    );
}