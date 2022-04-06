import { TextField } from "@mui/material";
import { useState, VFC } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncPatchMemoTitle } from "../../../slices/memo/memoSlice";
import { Memo, memoTitleProps } from "../../../types/memo/memo";
import { debounce } from "../../../utils/debounce";

interface MemoCardTitleProps {
    memo: Memo;
}

export const MemoCardTitle: VFC<MemoCardTitleProps> = (props) => {
    const {memo, ...other} = props;
    const [memoTitle, setMemoTitle] = useState<String>(memo.memoTitle);
    const [memoTitleTimerId,setMemoTitleTimerId] = useState(null);
    const dispatch = useDispatch()

    const handleChangeMemoTitle = (event) => {
        const memoTitleData: memoTitleProps = {
            memoId: memo.memoId,
            memoTitle: event.target.value,
        }
        setMemoTitle(event.target.value);
        debounce(
            () => {
                dispatch(fetchAsyncPatchMemoTitle(memoTitleData))
              },
            memoTitleTimerId,
            setMemoTitleTimerId,
            2000
        )();
    }  

    return (
        <>
            <TextField
                id="memoTitle"
                name="memoTitle"
                label="memoTitle"
                value={memoTitle}
                fullWidth
                size="small"
                onChange={ (e) => handleChangeMemoTitle(e)}
            />
        </>
    );
};