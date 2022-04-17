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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Note } from "../../../types/memo/note";
import { resetMemoOption } from "../../../slices/memo/memoSlice";

export const NoteSelect:VFC = () => {
    const dispatch = useDispatch();
    const noteOptions = useSelector(selectNoteOptions)
    const selectNote = useSelector(selectSelectNote);
    
    const handleChange = (note:Note) => {
        if (note.noteId !== selectNote.noteId){
            dispatch(resetMemoOption());
            dispatch(resetSelectChildMemoCategory())
            dispatch(resetChildMemoCategoryOptions());
            dispatch(resetSelectParentMemoCategory())
        }
        dispatch(fetchAsyncGetParentMemoCategoriesFilter(note.noteId))
        dispatch(changeSelectNote(note));
    }

    useEffect(
        () => {
            dispatch(fetchAsyncGetNotes());
        }
    ,[])

    return (
        <>
            <FormControl 
                fullWidth
            >
                <InputLabel
                    id="note-select-label"
                >
                    ノート
                </InputLabel>
                <Select
                    size="small"
                    labelId="note-select-label"
                    id="note-select"
                    label="ノート"
                    value={selectNote}
                    onChange={(event) => {
                        handleChange(event.target.value);
                    }}
                    renderValue={(selected) => selected.noteName}
                >
                    {noteOptions.map((option) => (
                        <MenuItem value={option}>
                            <BookIcon 
                                sx={{ 
                                    color: option.noteColor,
                                    mr:0.5,
                                }} 
                                fontSize="medium"
                            />
                            {option.noteName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
      </>
    );
};