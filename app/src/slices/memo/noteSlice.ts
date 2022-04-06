import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import type { NewNoteProps, NoteState, UpdateNoteProps } from '../../types/memo/note';
import { LogicalDeleteProps } from './commons';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

export const fetchAsyncGetNotes = createAsyncThunk(
  'notes/get',
  async () => {
    const res = await axios.get(
      `${apiUrl}api/note/`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncGetSelectNote = createAsyncThunk(
  'note/get',
  async (noteId: string) => {
    const res = await axios.get(
      `${apiUrl}api/note/${noteId}/`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncCreateNote = createAsyncThunk(
  'note/post',
  async (note: NewNoteProps) => {
    const res = await axios.post(
      `${apiUrl}api/note/`,
      note,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncPatchNote = createAsyncThunk(
  'note/patch',
  async (note: UpdateNoteProps) => {
    const updateData: NewNoteProps = {
      noteName: note.noteName,
      noteColor: note.noteColor
    }
    const res = await axios.patch(
      `${apiUrl}api/note/${note.noteId}/`,
      updateData,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncLogicalDeleteNote = createAsyncThunk(
  'note/delete',
  async (noteId: string) => {
    const updateData: LogicalDeleteProps = {
      isActive: false
    }
    const res = await axios.patch(
      `${apiUrl}api/note/${noteId}/`,
      updateData,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data;
  }
);

const initialState: NoteState = {
    isMemoSidebarOpen: true,
    editNote: {
      noteName: "",
      noteColor: "#9CA3AF"
    },
    selectNote: {
      noteId: "",
      noteName: "",
      noteColor: "#9CA3AF",
      user: "",
      createdAt: "",
      updatedAt: "",  
    },
    noteOptions: []
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    openMemoSidebar(state) {
      state.isMemoSidebarOpen = true;
    },
    closeMemoSidebar(state) {
      state.isMemoSidebarOpen = false;
    },
    changeSelectNote(state, action) {
      state.selectNote = action.payload
    },
    changeEditNote(state, action) {
      state.editNote = {...state.editNote, ...action.payload}
    },
    resetEditNote(state) {
      state.editNote = initialState.editNote;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetNotes.fulfilled,
      (state, action) => {
          state.noteOptions = action.payload;
      }
    );
    builder.addCase(
      fetchAsyncCreateNote.fulfilled,
      (state, action) => {
        return {
          ...state,
          noteOptions: [...state.noteOptions, action.payload],
        };
      }
    );
    builder.addCase(
      fetchAsyncGetSelectNote.fulfilled,
      (state, action) => {
        state.selectNote = action.payload
      }
      );
    builder.addCase(
      fetchAsyncPatchNote.fulfilled,
      (state, action) => {
        if (state.selectNote.noteId === action.payload.noteId) {
          state.selectNote = action.payload
        }
        state.noteOptions = state.noteOptions.map((note) => 
        note.noteId === action.payload.noteId ? action.payload : note
        )
      }
    );
    builder.addCase(
      fetchAsyncLogicalDeleteNote.fulfilled,
      (state, action) => {
        if (state.selectNote.noteId === action.payload.noteId) {
          state.selectNote = initialState.selectNote;
        } 
        state.noteOptions = state.noteOptions.filter((note) => {
          return note.noteId !== action.payload.noteId
        })
      }
    );
  },
});

export const { 
  openMemoSidebar,
  closeMemoSidebar,
  changeEditNote,
  resetEditNote,
  changeSelectNote,
} = noteSlice.actions;

export const selectIsMemoSidebarOpen = (state: RootState) => state.note.isMemoSidebarOpen;
export const selectEditNote = (state: RootState) => state.note.editNote;
export const selectNoteOptions = (state: RootState) => state.note.noteOptions;
export const selectSelectNote = (state: RootState) => state.note.selectNote;

export default noteSlice.reducer;

export const { reducer } = noteSlice;