export interface Note {
    noteId: string;
    noteName: string;
    noteColor: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewNoteProps {
    noteName: string,
    noteColor: string
}

export interface UpdateNoteProps {
    noteId: String,
    noteName: string,
    noteColor: string
}

export interface NoteState {
    isMemoSidebarOpen: boolean;
    editNote: NewNoteProps | UpdateNoteProps;
    selectNote: Note;
    noteOptions: Note[];
}