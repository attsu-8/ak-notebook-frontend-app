import { Typography, Rating } from "@mui/material";
import { useState, VFC } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncPatchPriority } from "../../../slices/memo/memoSlice";
import { Memo, memoPriorityProps } from "../../../types/memo/memo";
import { debounce } from "../../../utils/debounce";

interface MemoCardPriorityProps {
    memo: Memo;
}

export const MemoCardPriority: VFC<MemoCardPriorityProps> = (props) => {
    const {memo, ...other} = props;
    const [memoPriorityTimerId,setMemoPriorityTimerId] = useState(null);
    const [memoPriority, setMemoPriority] = useState<number>(memo.memoPriority)
    const dispatch = useDispatch()

    const handleChangePriority = (newValue: number) => {
        const memoPriorityData: memoPriorityProps = {
            memoId: memo.memoId,
            memoPriority: newValue,
        }

        setMemoPriority(newValue);
        
        debounce(
            () => {
                dispatch(fetchAsyncPatchPriority(memoPriorityData))
            },
            memoPriorityTimerId,
            setMemoPriorityTimerId,
            2000
        )();
    }   

    return (
        <>
            <Typography component="legend">優先度</Typography>
            <Rating 
                name="memoPriority"
                value={memoPriority}
                onChange={(event, newValue) => {
                    handleChangePriority(newValue)
                }}
            />

        </>
    );
};