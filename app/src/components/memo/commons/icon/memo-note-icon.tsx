import { VFC } from "react";
import { IconProps } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';


interface MemoNoteIconProps {
    fontSize?: IconProps["fontSize"];
    iconColor?: string;
}

export const MemoNoteIcon:VFC<MemoNoteIconProps> = (props) => {
    const {fontSize,iconColor, ...other} = props;
    return (
        <>
            <BookIcon
                fontSize={fontSize}
                sx={{
                    color:iconColor
                }}
            />
        </>
    );
};

MemoNoteIcon.defaultProps = {
    fontSize:"medium",
    iconColor:"#2196f3"
}