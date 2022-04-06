import { VFC } from "react";
import { List, ListItem } from "@mui/material";
import { ChildMemoCategory, ParentMemoCategory } from "../../../types/memo/memoCategory";
import { MemoCategoryListItemButton } from "./memo-category-list-item-button";
import { MemoCategoryListItemProperty } from "./memo-category-list-item-property";

interface MemoCategoryListProps {
    memoCategoryOptions: ParentMemoCategory[] | ChildMemoCategory[];
    selectMemoCategory: ParentMemoCategory | ChildMemoCategory;
    onClickListItem: (memoCategory: ParentMemoCategory | ChildMemoCategory) => void;
    onClickUpdateProperty: (parentMemoCategory: ParentMemoCategory | ChildMemoCategory) => void;
    onClickDeleteProperty: (parentMemoCategory: ParentMemoCategory | ChildMemoCategory) => void;
}

export const MemoCategoryList: VFC<MemoCategoryListProps> = (props) => {
    const {memoCategoryOptions, selectMemoCategory, onClickListItem, onClickUpdateProperty, onClickDeleteProperty,  ...other} = props;

    return (
        <List>

            {memoCategoryOptions.map((memoCategoryOption) => (
                <ListItem
                    disableGutters
                    disablePadding
                    sx={{
                        '& + &': {
                            mt:1,
                        }
                    }}
                    >
                        <MemoCategoryListItemButton
                            memoCategoryOption={memoCategoryOption}
                            selectMemoCategory={selectMemoCategory}
                            onClickListItem={onClickListItem}
                        />

                        <MemoCategoryListItemProperty 
                            memoCategory={memoCategoryOption}
                            onClickUpdateProperty={onClickUpdateProperty}
                            onClickDeleteProperty={onClickDeleteProperty}
                        />

                </ListItem>
            ))}

        </List>
    );
};