import { Breadcrumbs, Box, IconProps, Typography } from "@mui/material";
import { VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectChildMemoCategory, selectSelectParentMemoCategory } from "../../slices/memo/memoCategorySlice";
import { selectSelectNote } from "../../slices/memo/noteSlice";
import { MemoCategoryIcon } from "./commons/icon/memo-category-icon";
import { MemoEmojiIcon } from "./commons/icon/memo-emoji-icon";
import { MemoNoteIcon } from "./commons/icon/memo-note-icon";

interface MemoEmojiIconProps {
    emojiId: string | null;
    emojiSize?: Number;
    defaultIcon?: IconProps;
}

interface BreadcrumbsItemProps {
    selectIcon: IconProps | MemoEmojiIconProps
    selectName: string;
    breadcrumbName: string
}

const BreadcrumbsItem: VFC<BreadcrumbsItemProps> = (props) => {
    const {selectIcon, selectName, breadcrumbName} = props;
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={{mr: 0.75}}>
                {selectIcon}
            </Box>
            <Typography
                variant="subtitle2"
            >
                {selectName ? selectName : `${breadcrumbName}を選択してください`}
            </Typography>
        </Box>
    )
}

export const MemoHeaderBreadcrumbs: VFC = () => {
    const dispatch = useDispatch()
    const selectNote = useSelector(selectSelectNote)
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory)
    const selectChildMemoCategory = useSelector(selectSelectChildMemoCategory)

    return (
        <Box
        >

            <Breadcrumbs
                separator="/"
                sx={{
                    fontSize:1,
                }}
            >
                <BreadcrumbsItem
                    selectIcon={
                        <MemoNoteIcon
                            fontSize="small"
                            iconColor={selectNote.noteColor}
                        />
                    }
                    selectName={selectNote.noteName}
                    breadcrumbName="ノート"
                />
                
                <BreadcrumbsItem
                    selectIcon={
                        <MemoEmojiIcon
                            emojiId={selectParentMemoCategory.memoCategoryIcon}
                            emojiSize={20}
                            defaultIcon={<MemoCategoryIcon fontSize="small"/>}
                        />
                    }
                    selectName={selectParentMemoCategory.memoCategoryName}
                    breadcrumbName="親メモカテゴリ"
                />

                <BreadcrumbsItem
                    selectIcon={
                        <MemoEmojiIcon
                            emojiId={selectChildMemoCategory.memoCategoryIcon}
                            emojiSize={22}
                            defaultIcon={<MemoCategoryIcon fontSize="small"/>}
                        />
                    }
                    selectName={selectChildMemoCategory.memoCategoryName}
                    breadcrumbName="子メモカテゴリ"
                />
            </Breadcrumbs>
        </Box>
    );
};