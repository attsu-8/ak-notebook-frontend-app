import { ButtonProps, IconButtonProps } from "@mui/material";
import { VFC } from "react";
import { useSelector } from "react-redux";
import { selectEditMemoCategory } from "../../../slices/memo/memoCategorySlice";
import { MemoDialog } from "../commons/dialog/memo-dialog";

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

    return (
        <MemoDialog
            isOpen={isOpen}
            onClose={() => onClose(false)}
            headerTitle={headerTitle}
            footerButton={footerButton}
        >  
        
            <>
                {`memoCategoryName: ${editMemoCategory.memoCategoryName}`}
            </>

        </MemoDialog>

    );
};