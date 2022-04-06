import { VFC, useState } from "react";
import { Box, Button } from "@mui/material";
import { NoteSelect } from "./note-select";
import { useSelector } from "react-redux";
import { selectSelectNote } from "../../../slices/memo/noteSlice";
import { NoteListDialog } from "./note-list-dialog";
import { MemoNoteIcon } from "../commons/icon/memo-note-icon";

export const Note:VFC = () => {
    const selectNote = useSelector(selectSelectNote);
    const [isOpenMemoListDialog, setIsOpenMemoListDialog] = useState<boolean>(false);

    return (
        <>
            <Box
                sx={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%",
                    ml:1,
                    py: 3
                }}
            >

                <MemoNoteIcon
                    fontSize="large"
                    iconColor={selectNote.noteColor}
                />

                <NoteSelect />
                
                <Box
                    sx={{mx: "auto"}}
                >
                    <Button
                        onClick={() => setIsOpenMemoListDialog(true)}
                        variant="contained"
                    >
                        ノート編集
                    </Button>
                </Box>

            </Box>

            <NoteListDialog
                isOpen={isOpenMemoListDialog}
                onClose={setIsOpenMemoListDialog}
            />
            
        </>
    )
}