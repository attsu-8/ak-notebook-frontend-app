import { VFC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectChildMemoCategory, changeSelectChildMemoCategory, selectChildMemoCategoryOptions} from "../../../../slices/memo/memoCategorySlice";
import {ChildMemoCategory as ChildMemo} from "../../../../types/memo/memoCategory";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { fetchAsyncGetMemosFilter, resetMemoOption, setIsMemoNextPageLoading } from "../../../../slices/memo/memoSlice";
import { MemoEmojiIcon } from "../../commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../../commons/icon/memo-category-icon";

export const ChildMemoCategorySelectMobile:VFC = () => {
    const dispatch = useDispatch();
    const childMemoCategoryOptions = useSelector(selectChildMemoCategoryOptions);
    const selectChildMemoCategory = useSelector(selectSelectChildMemoCategory);

    const onChangeListItem = (childMemoCategory: ChildMemo) => {
        dispatch(resetMemoOption());
        dispatch(changeSelectChildMemoCategory(childMemoCategory))
        dispatch(fetchAsyncGetMemosFilter({
            parentMemoCategoryId: childMemoCategory.parentMemoCategory,
            childMemoCategoryId: childMemoCategory.memoCategoryId
        }))
        dispatch(setIsMemoNextPageLoading())
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="child-memo-category-select-label">
                子カテゴリ
            </InputLabel>
            <Select
                size="small"
                labelId="child-memo-category-select-label"
                id="child-memo-category-select"
                label="子カテゴリ"
                value={selectChildMemoCategory}
                onChange={(event) => onChangeListItem(event.target.value)}
                renderValue={(selected) => selected.memoCategoryName}
            >
                {childMemoCategoryOptions.map((option) => (
                    <MenuItem value={option}>
                        <Box
                            sx={{
                                display:"flex",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{mr:0.5}}>
                                {option.memoCategoryIcon
                                    ?
                                        <MemoEmojiIcon
                                            emojiId={option.memoCategoryIcon}
                                            emojiSize={22}
                                        />
                                    :
                                        <MemoCategoryIcon fontSize="small" />
                                }
                            </Box>
                            {option.memoCategoryName}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};