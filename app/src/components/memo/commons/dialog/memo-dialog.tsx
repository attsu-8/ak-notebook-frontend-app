import type { VFC, ReactNode } from "react";
import { Dialog, Box, Typography, IconButton, Divider, IconButtonProps, ButtonProps, useMediaQuery, Theme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface MemoDialogProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
    headerTitle: string;
    footerButton?: IconButtonProps | ButtonProps;
  }

export const MemoDialog: VFC<MemoDialogProps> = (props) => {
    const {children, isOpen, onClose, headerTitle, footerButton, ...other} = props;
    const smUp = useMediaQuery(
        (theme: Theme) => theme.breakpoints.up('sm'),
            {
                noSsr: true
            }
      );
      
    let childWidth
    if (smUp){
        childWidth="80%"
    } else {
        childWidth="90%"
    }

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
                            color="textSecondary"
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
                        width: childWidth,
                        overflow: "scroll",
                        my:1
                    }}
                    >  
                    { children }
                </Box>

                <Box
                    sx={{
                        height: "10%",
                        mb:1
                    }}
                >  
                    { footerButton }
                </Box>

            </Box>

        </Dialog>
    );
};