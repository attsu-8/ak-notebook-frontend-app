import { useEffect, VFC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    selectNoteOptions,
    fetchAsyncGetNotes,
    changeSelectNote,
    selectSelectNote 
} from "../../../slices/memo/noteSlice";
import {fetchAsyncGetParentMemoCategoriesFilter, resetChildMemoCategoryOptions, resetSelectChildMemoCategory, resetSelectParentMemoCategory} from "../../../slices/memo/memoCategorySlice"
import BookIcon from '@mui/icons-material/Book';
import { Autocomplete, Box, TextField } from "@mui/material";
import type { Note } from "../../../types/memo/note";
import { resetMemoOption } from "../../../slices/memo/memoSlice";

export const NoteSelect:VFC = () => {
    const dispatch = useDispatch();
    const noteOptions = useSelector(selectNoteOptions)
    const selectNote = useSelector(selectSelectNote);
    useEffect(
        () => {
            dispatch(fetchAsyncGetNotes());
        }
    ,[])

    const handleChange = (note:Note) => {
        if (note.noteId !== selectNote.noteId){
            dispatch(resetMemoOption());
            dispatch(resetSelectChildMemoCategory())
            dispatch(resetChildMemoCategoryOptions());
            dispatch(resetSelectParentMemoCategory())
        }
        dispatch(changeSelectNote(note));
        dispatch(fetchAsyncGetParentMemoCategoriesFilter(note.noteId))
    }

    return (
        <>
            <Autocomplete
                id="note-select"
                size="small"
                sx={{ 
                    width: '60%',
                    mr:2,
                }}
                value={selectNote}
                options={noteOptions}
                disableClearable
                onChange={(event:any, note:Note) => {
                    handleChange(note);
                }}
                autoHighlight
                getOptionLabel={(option) => option.noteName}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        sx={{
                            '& > MennuBookIcon': {
                                mr:2,
                                flexShrink:0
                            }
                        }}
                        {...props}
                    >
                        <BookIcon 
                            sx={{ 
                                color: option.noteColor,
                            }} 
                            fontSize="medium"
                        />
                        {option.noteName}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="ノート"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password'
                        }}
                    />
                )}
            />
        </>
    );
};