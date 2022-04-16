import { VFC, ReactNode, useEffect } from "react";
import { useState } from "react";
import { selectSelectNote } from "../../slices/memo/noteSlice";
import { MemoDialog } from "./commons/dialog/memo-dialog";
import { Box, Button, Divider, List } from "@mui/material"
import { MemoNoteIcon } from "./commons/icon/memo-note-icon";
import { useSelector } from "react-redux";
import { NoteListDialog } from "./note/note-list-dialog";
import { ParentMemoCategoryListDialog } from "./memoCategory/parentMemoCategory/parent-memo-category-list-dialog";
import { NoteSelect } from "./note/note-select";
import EditIcon from '@mui/icons-material/Edit';
import { ParentMemoCategorySelectMobile } from "./memoCategory/parentMemoCategory/parent-memo-category-select-mobile";
import { MemoEmojiIcon } from "./commons/icon/memo-emoji-icon";
import { selectIsCreatedChildMemoCategory, selectSelectChildMemoCategory, selectSelectParentMemoCategory } from "../../slices/memo/memoCategorySlice";
import { MemoCategoryIcon } from "./commons/icon/memo-category-icon";
import { ChildMemoCategoryListDialog } from "./memoCategory/childMemoCategory/child-memo-category-list-dialog";
import { ChildMemoCategorySelectMobile } from "./memoCategory/childMemoCategory/child-memo-category-select-mobile";

interface MemoListDialogMobileProps {
    children?: ReactNode;
    isOpen: boolean;
    onClose: (isOpen: boolean)=> void;
  }

export const MemoListDialogMobile: VFC<MemoListDialogMobileProps> = (props) => {
    const {children, isOpen, onClose, ...other} = props;
    const [isOpenNoteListDialog, setIsOpenNoteListDialog] = useState<boolean>(false);
    const [isOpenParentMemoCategoryListDialog, setIsOpenParentMemoCategoryListDialog] = useState<boolean>(false);
    const [isOpenChildMemoCategoryListDialog, setIsOpenChildMemoCategoryListDialog] = useState<boolean>(false);
    const selectNote = useSelector(selectSelectNote);
    const selectParentMemoCategory = useSelector(selectSelectParentMemoCategory);
    const selectChildMemoCategory = useSelector(selectSelectChildMemoCategory);
    const isCreatedChildMemoCategory = useSelector(selectIsCreatedChildMemoCategory);

    useEffect(() => {
        if (isCreatedChildMemoCategory) {
            onClose(false);
        }
    },[isCreatedChildMemoCategory])

    return (
        <>

            <MemoDialog
                isOpen={isOpen}
                onClose={onClose}
                headerTitle="選択リスト"
            >

                <List
                    sx={{
                        bgcolor: "Background.paper",    
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <MemoNoteIcon
                                fontSize="large"
                            iconColor={selectNote.noteColor}
                        />
                        <Box 
                            sx={{
                                ml:0.5,
                                width: "100%"
                            }}
                        >
                            <NoteSelect />
                        </Box>

                        <Box
                            sx={{
                                mx: "auto",
                                pl:1
                            }}
                        >
                            <Button
                                size="small"
                                onClick={() => setIsOpenNoteListDialog(true)}
                                variant="contained"
                            >
                                <EditIcon fontSize="small"/>
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{my:2}}
                    >
                        <Divider />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            {selectParentMemoCategory.memoCategoryIcon
                                ?
                                    <MemoEmojiIcon
                                        emojiId={selectParentMemoCategory.memoCategoryIcon}
                                        emojiSize={35}
                                    />
                                :
                                    <MemoCategoryIcon fontSize="large" />
                            }
                        </Box>
                        <Box 
                            sx={{
                                ml:0.5,
                                width: "100%"
                            }}
                        >
                            <ParentMemoCategorySelectMobile />
                        </Box>

                        <Box
                            sx={{
                                mx: "auto",
                                pl:1
                            }}
                        >
                            <Button
                                size="small"
                                onClick={() => setIsOpenParentMemoCategoryListDialog(true)}
                                variant="contained"
                            >
                                <EditIcon fontSize="small"/>
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{my:2}}
                    >
                        <Divider />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            {selectChildMemoCategory.memoCategoryIcon
                                ?
                                    <MemoEmojiIcon
                                        emojiId={selectChildMemoCategory.memoCategoryIcon}
                                        emojiSize={35}
                                    />
                                :
                                    <MemoCategoryIcon fontSize="large" />
                            }
                        </Box>
                        <Box 
                            sx={{
                                ml:0.5,
                                width: "100%"
                            }}
                        >
                            <ChildMemoCategorySelectMobile />
                        </Box>

                        <Box
                            sx={{
                                mx: "auto",
                                pl:1
                            }}
                        >
                            <Button
                                size="small"
                                onClick={() => setIsOpenChildMemoCategoryListDialog(true)}
                                variant="contained"
                            >
                                <EditIcon fontSize="small"/>
                            </Button>
                        </Box>
                    </Box>

                </List>

            </MemoDialog>

            <NoteListDialog
                isOpen={isOpenNoteListDialog}
                onClose={setIsOpenNoteListDialog}
            />
            <ParentMemoCategoryListDialog
                isOpen={isOpenParentMemoCategoryListDialog}
                onClose={setIsOpenParentMemoCategoryListDialog}
            />
            <ChildMemoCategoryListDialog
                isOpen={isOpenChildMemoCategoryListDialog}
                onClose={setIsOpenChildMemoCategoryListDialog}
            />
        </>
    );
}