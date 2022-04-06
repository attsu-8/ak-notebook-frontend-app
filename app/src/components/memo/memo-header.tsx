import { VFC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openMemoSidebar, closeMemoSidebar, selectIsMemoSidebarOpen, selectSelectNote } from "../../slices/memo/noteSlice";
import { Box, Divider, IconButton } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { PurposeListDialogButton } from "./purpose/purpose-list-dialog-button";
import { MemoHeaderBreadcrumbs } from "./memo-header-breadcrumbs";

export const MemoHeader: VFC = (props) => {
    const {...other} = props
    const dispatch = useDispatch();
    const isMemoSidebarOpen = useSelector(selectIsMemoSidebarOpen);
    const selectNote = useSelector(selectSelectNote);
    const isSelectNote = selectNote.noteId;

    const handleToggleMemoSidebar = (): void => {
        if (isMemoSidebarOpen) {
            dispatch(closeMemoSidebar());
        } else {
            dispatch(openMemoSidebar());
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: "center",
                height: 64,
                overflow: 'hidden'
            }}
            {...other}
        >
            <Box
                sx={{ml:1}}
            >
                <IconButton
                    onClick={handleToggleMemoSidebar}
                >
                    <DragHandleIcon fontSize="medium" />
                </IconButton>
            </Box>
            {!isMemoSidebarOpen &&
                <Box
                    sx={{ml:2}}
                >
                    <MemoHeaderBreadcrumbs />
                </Box>
            }
                
            <Box
                sx={{
                    ml: "auto",
                    mr:3
                }}
            >
                {isSelectNote && <PurposeListDialogButton />}
            </Box>

        </Box>
    );
};