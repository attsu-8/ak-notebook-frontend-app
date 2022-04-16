import { IconButton, Tooltip } from "@mui/material";
import { useRef, useState, VFC } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { PriorityFormPopover } from "./each-memo-priority-form-popover";

export const PriorityButton: VFC = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState(false);

    const handleOpenPopover = ():void => {
        setOpenPopover(true);
    };

    const handleClosePopover = ():void => {
        setOpenPopover(false);
    };

    return (
        <>
            <Tooltip
                title="重要度で絞り込み"
            >
                <IconButton
                    onClick={handleOpenPopover}
                    ref={anchorRef}
                >
                    <FilterAltIcon fontSize="large"/>
                </IconButton>
            </Tooltip>
            <PriorityFormPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    )
}