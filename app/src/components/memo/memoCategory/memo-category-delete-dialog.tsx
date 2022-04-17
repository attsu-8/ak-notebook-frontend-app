import { Box, ButtonProps, IconButtonProps, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectEditMemoCategory } from "../../../slices/memo/memoCategorySlice";
import { MemoDialog } from "../commons/dialog/memo-dialog";
import { MemoDeleteIcon } from "../commons/icon/memo-delete-icon";

interface MemoCategoryDeleteDialogProps {
    headerTitle: string;
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
    footerButton: IconButtonProps | ButtonProps;
    formId: string;
}

export const MemoCategoryDeleteDialog: VFC<MemoCategoryDeleteDialogProps> = (props) => {
    const {headerTitle, isOpen, onClose, footerButton, formId, ...other} = props; 
    const editMemoCategory = useSelector(selectEditMemoCategory);
    const theme = useTheme();

    return (
        <MemoDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
            headerTitle={headerTitle}
            footerButton={footerButton}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <MemoDeleteIcon
                        iconColor={theme.palette.error.light}
                    />
                    <Typography
                        color="textSecondary"
                        variant="h6"
                        sx={{mb:1}}
                    >
                        以下のメモカテゴリを削除します。
                    </Typography>
                </Box>

                <Typography
                    color="textSecondary"
                    variant="h6"
                    sx={{
                        width: "100%",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                    }}
                >
                    {`カテゴリ名： ${editMemoCategory.memoCategoryName}`}
                </Typography>
            </Box>
        </MemoDialog>

    );
};