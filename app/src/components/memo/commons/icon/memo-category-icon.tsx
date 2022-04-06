import { VFC } from "react";
import { IconProps } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


interface MemoCategoryIconProps {
    fontSize?: IconProps["fontSize"];
}

export const MemoCategoryIcon:VFC<MemoCategoryIconProps> = (props) => {
    const { fontSize, ...other} = props;
    return (
        <>
            <LocalOfferIcon
                fontSize={fontSize}
                sx={{
                    color: "#9BA3AF"
                }}
            />
        </>
    );
};

MemoCategoryIcon.defaultProps = {
    fontSize:"medium",
}