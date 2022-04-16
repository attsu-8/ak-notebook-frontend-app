import { Box, Popover, Typography } from "@mui/material";
import React, { VFC } from "react";
import { PriorityForm } from "./each-memo-priority-form";

interface PriorityFormPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
}

export const PriorityFormPopover: VFC<PriorityFormPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            keepMounted
            onClose={onClose}
            open={open}
            PaperProps={{sx: { width: 150 } }}
            transitionDuration={0}
            {...other}
        >
            <Box
                sx={{
                    display:"flex",
                    flexDirection: "column",
                    m:1,
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="body2"
                    align="center"
                >
                   {`重要度`}
                </Typography>

                <PriorityForm />
            </Box>

        </Popover>
    );
}