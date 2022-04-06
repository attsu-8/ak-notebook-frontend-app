import { VFC } from "react";
import { IconProps } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


interface MemoDeleteIconProps {
    fontSize?: IconProps["fontSize"];
    iconColor?: string;
}

export const MemoDeleteIcon:VFC<MemoDeleteIconProps> = (props) => {
    const {fontSize,iconColor, ...other} = props;
    return (
        <>
            <DeleteIcon
                fontSize={fontSize}
                sx={{
                    color:iconColor
                }}
            />
        </>
    );
};

MemoDeleteIcon.defaultProps = {
    fontSize:"medium",
    iconColor:"#6A7280"
}