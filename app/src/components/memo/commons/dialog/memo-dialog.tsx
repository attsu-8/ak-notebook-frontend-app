import type { VFC, ReactNode } from "react";
import { Dialog, Box, Typography, IconButton, Divider, IconButtonProps, ButtonProps } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface MemoDialogProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
    headerTitle: string;
    footerButton: IconButtonProps | ButtonProps;
  }

export const MemoDialog: VFC<MemoDialogProps> = (props) => {
    const {children, isOpen, onClose, headerTitle, footerButton, ...other} = props;
    return (

        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={() => onClose(false)}
            open={isOpen}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    maxHeight: "400px"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        height: "10%"
                    }}
                >
                    <Box sx={{mt: 1}}>
                        <Typography
                            align="center"
                            gutterBottom
                            variant="h5"
                        >
                            {headerTitle}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            marginLeft: 'auto',
                            position: 'absolute',
                            right:0,
                        }}
                    >
                        <IconButton onClick={() => onClose(false)} >
                            <CloseIcon fontSize="medium"/>
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{width: "95%"}} />

                <Box
                    sx={{
                        height: "80%",
                        width: "80%",
                        overflow: "scroll",
                        my:1
                    }}
                    >  
                    { children }
                </Box>
                <Divider sx={{width: "95%"}} />

                <Box
                    sx={{
                        height: "10%",
                        my:1
                    }}
                >  
                    { footerButton }
                </Box>

            </Box>

        </Dialog>
    );
};