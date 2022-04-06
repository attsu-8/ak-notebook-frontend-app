import type { VFC } from "react";
import { IconButton, IconProps, Tooltip, TooltipProps } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface MemoDeleteButtonProps {
    fontSize?: IconProps["fontSize"];
    toolTipTitle: string;
    toolTipPlacement?: TooltipProps["placement"];
    onClick: () => void;
}

export const MemoDeleteButton: VFC<MemoDeleteButtonProps> = (props) => {
    const {fontSize, toolTipTitle, toolTipPlacement, onClick, ...other} = props;

    return (
        <IconButton
            onClick={onClick}
        >
            <Tooltip
                title={toolTipTitle}
                placement={toolTipPlacement}
            >
                <DeleteIcon fontSize={fontSize} />
            </Tooltip>
        </IconButton>
    );
};

MemoDeleteButton.defaultProps = {
    fontSize:"medium",
    toolTipPlacement:"left",
}