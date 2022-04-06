import { VFC } from "react";
import { IconProps } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


interface MemoEditIconProps {
    fontSize?: IconProps["fontSize"];
    iconColor?: string;
}

export const MemoEditIcon:VFC<MemoEditIconProps> = (props) => {
    const {fontSize,iconColor, ...other} = props;
    return (
        <>
            <EditIcon
                fontSize={fontSize}
                sx={{
                    color:iconColor
                }}
            />
        </>
    );
};

MemoEditIcon.defaultProps = {
    fontSize:"medium",
    iconColor:"#6A7280"
}