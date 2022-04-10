import { Avatar, Box, IconButton, ButtonBase } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/authentication/authSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRef, useState } from "react";
import { AccountPopover } from "./account-popover";


export const AccountButton = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState(false);
    const user = useSelector(selectUser);

    const handleOpenPopover = ():void => {
        setOpenPopover(true);
    };

    const handleClosePopover = ():void => {
        setOpenPopover(false);
    };


    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: 2
                }}
            >
                <Avatar
                    sx={{
                        height: 40,
                        width: 40
                    }}
                    // src={user.profileImage? user.profileImage.toString() : null}
                >
                    <AccountCircleIcon fontSize="small" />
                </Avatar>
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    )
}