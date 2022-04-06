import { VFC } from "react";
import { Box, ListItemText, ButtonBase, IconButton } from "@mui/material";
import { ChildMemoCategory, ParentMemoCategory } from "../../../types/memo/memoCategory";
import { MemoEmojiIcon } from "../commons/icon/memo-emoji-icon";
import { MemoCategoryIcon } from "../commons/icon/memo-category-icon";

interface MemoCategoryListItemButtonProps {
    memoCategoryOption: ParentMemoCategory | ChildMemoCategory;
    selectMemoCategory: ParentMemoCategory | ChildMemoCategory;
    onClickListItem:( memoCategory: ParentMemoCategory | ChildMemoCategory) => void
}

export const MemoCategoryListItemButton: VFC<MemoCategoryListItemButtonProps> = (props) => {
    const {memoCategoryOption, selectMemoCategory, onClickListItem, ...other} = props

    return (
        <ButtonBase
            component="a"
            sx={{
                borderRadius: 1,
                color: 'text.secondary',
                width:"100%",
                py:1,
                ml:1,
                fontSize: (theme) => theme.typography.button.fontSize,
                fontWeight: (theme) => theme.typography.button.fontWeight,
                lineHeight: (theme) => theme.typography.button.lineHeight,
                '&:hover': {
                    backgroundColor: 'action.hover'
                },
                ...(memoCategoryOption.memoCategoryId === selectMemoCategory.memoCategoryId && {
                    backgroundColor: 'action.selected',
                    color: 'text.primary'
                })
            }}
            onClick={() => onClickListItem(memoCategoryOption) }
        >
            <ListItemText 
                primary={
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {memoCategoryOption.memoCategoryIcon
                            ?
                                <>
                                    <Box sx={{ 
                                        width: 30,
                                        pr:4,
                                        ml:1,   
                                    }}>
                                        <MemoEmojiIcon
                                            emojiId={memoCategoryOption.memoCategoryIcon}
                                            emojiSize={22}
                                        />
                                    </Box>
                                    <Box>
                                        {memoCategoryOption.memoCategoryName} 
                                    </Box>
                                </>
                            :
                                <>
                                    <Box sx={{ 
                                        width: 30,
                                        pr:4,
                                        ml:1,
                                    }}>
                                        <MemoCategoryIcon
                                            fontSize="medium" 
                                        />
                                    </Box>
                                    <Box>
                                        {memoCategoryOption.memoCategoryName}
                                    </Box>
                                </>
                        }
                    </Box>
                }
            />

        </ButtonBase>
    );
};