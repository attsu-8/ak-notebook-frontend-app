import { Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { VFC } from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout, selectUser } from "../../slices/authentication/authSlice";
import  PropTypes from "prop-types"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../../store/store';

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
}

export const AccountPopover: VFC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const router = useRouter();
    const user = useSelector(selectUser);
    const dispatch: AppDispatch = useDispatch();

    const removeToken = () => {
        window.localStorage.removeItem('accessToken')
    }
    const handleLogout = async (): Promise<void> => {
        await removeToken();
        await router.push('/authentication/login')
        await dispatch(logout());
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            keepMounted
            onClose={onClose}
            open={open}
            PaperProps={{sx: { width: 300 } }}
            transitionDuration={0}
            {...other}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    p: 2,
                    display: 'flex'
                }}
            >
                <Avatar
                    // src={user.profileImage ? user.profileImage.toString() : null}
                    sx = {{
                        height:40,
                        width:40
                    }}
                >
                    <AccountCircleIcon fontSize="small"/>
                </Avatar>
                <Box
                    sx={{
                        ml: 1
                    }}
                >
                    <Typography variant="body1">
                        {/* {user.profileNickname} */}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={(
                            <Typography variant="body1">
                                ログアウト
                            </Typography>
                        )}
                    />
                </MenuItem>
            </Box>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool
};