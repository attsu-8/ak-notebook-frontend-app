import { Dialog } from "@mui/material";
import { useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectSelectMemoLearningEfficiency } from "../../slices/home/learningEfficiencySlice";
import { SelectMemoCard } from "./select-memo-card";

interface SelectMemoDialogProps {
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
  }


export const SelectMemoDialog: VFC<SelectMemoDialogProps> = (props) => {
    const {isOpen, onClose, ...other} = props;
    const [isDeleteMemoOpen, setIsDeleteMemoOpen] = useState<boolean>(false);
    const selectMemo = useSelector(selectSelectMemoLearningEfficiency);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={() => onClose(false)}
            open={isOpen}
        >
            <SelectMemoCard
                memo={selectMemo}
                onClickDeletePropertyButton={setIsDeleteMemoOpen}
            />
        </Dialog>
    );
}