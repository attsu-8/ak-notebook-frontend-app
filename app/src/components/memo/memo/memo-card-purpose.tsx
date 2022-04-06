import { Box, Autocomplete, TextField } from "@mui/material";
import { useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncPatchPurpose } from "../../../slices/memo/memoSlice";
import { selectPurposeOptions } from "../../../slices/memo/purposeSlice";
import { Memo } from "../../../types/memo/memo";
import { Purpose } from "../../../types/memo/purpose";
import { MemoEmojiIcon } from "../commons/icon/memo-emoji-icon";
import { MemoPurposeIcon } from "../commons/icon/memo-purpose-icon";
import { debounce } from "../../../utils/debounce";

interface MemoCardPurposeProps {
    memo: Memo;
}

export const MemoCardPurpose: VFC<MemoCardPurposeProps> = (props) => {
    const {memo, ...other} = props;
    const [memoPurposeTimerId,setMemoPurposeTimerId] = useState(null);
    const purposeOptions = useSelector(selectPurposeOptions);
    const purpose = purposeOptions.filter(
        (purpose) => {
            return purpose.purposeId === memo.purpose
        })[0]    
    const [memoPurpose, setMemoPurpose] = useState<Purpose>(purpose);
    const dispatch = useDispatch()

    const handleChangePurpose = (purpose) => {
        const memoPurposeData = {
            memoId: memo.memoId,
            purpose: purpose.purposeId,
        }
        setMemoPurpose(purpose)
        debounce(
            () => {
                dispatch(fetchAsyncPatchPurpose(memoPurposeData))
            },
            memoPurposeTimerId,
            setMemoPurposeTimerId,
            2000
        )();
    }

    return (
        <>
            <Autocomplete
                id="purpose-select"
                size="small"
                sx={{
                    mr:2,
                }}
                value={memoPurpose}
                options={purposeOptions}
                disableClearable
                onChange={(event:any, purpose:Purpose) => handleChangePurpose(purpose)}
                getOptionLabel={(option) => option.purposeName}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                    >
                        <MemoEmojiIcon
                            emojiId={option.purposeIcon}
                            emojiSize={18}
                            defaultIcon={<MemoPurposeIcon fontSize="small" />}
                        />
                        {option.purposeName}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="choose a purpose"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password"
                        }}
                    />
                )}
            />

        </>
    );
};