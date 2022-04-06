import { ButtonProps, IconButtonProps } from "@mui/material";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectEditMemo } from "../../../slices/memo/memoSlice";
import { MemoDialog } from "../commons/dialog/memo-dialog";

interface MemoDeleteDialogProps {
    headerTitle: string;
    isOpen: boolean;
    onClose: (isOpen:boolean) => void;
    footerButton: IconButtonProps | ButtonProps;
    formId: string;
}

export const MemoDeleteDialog: VFC<MemoDeleteDialogProps> = (props) => {
    const {headerTitle, isOpen, onClose, footerButton, formId, ...other} = props; 

    const editMemo = useSelector(selectEditMemo);

    return (
        <MemoDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
            headerTitle={headerTitle}
            footerButton={footerButton}
        >  
        
            <>
                {`memoTitle: ${editMemo.memoTitle}`}
            </>

        </MemoDialog>

    );
};