export interface ParentMemoCategory {
  memoCategoryId: string;
  memoCategoryName: string;
  memoCategoryIcon: string;
  parentMemoCategory: null;
  note: string;
  user: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChildMemoCategory {
  memoCategoryId: string;
  memoCategoryName: string;
  memoCategoryIcon: string;
  parentMemoCategory: string;
  note: string;
  user: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemoCategoryFamily {
  parentMemoCategory: ParentMemoCategory;
  childMemoCategory: ChildMemoCategory;
}

export interface MemoCategoryState {
  editMemoCategory:
    | ParentMemoCategoryProps
    | ChildMemoCategoryProps
    | UpdateParentMemoCategoryProps
    | UpdateChildMemoCategoryProps;
  selectMemoCategory: MemoCategoryFamily;
  memoCategoryOptions: {
    parentMemoCategories: ParentMemoCategory[];
    childMemoCategories: ChildMemoCategory[];
  };
  isParentMemoCategoryNewEditorOpen: boolean;
  isChildMemoCategoryNewEditorOpen: boolean;
  isCreatedChildMemoCategory: boolean;
}

export interface ParentMemoCategoryProps {
  memoCategoryName: string;
  memoCategoryIcon: string | null;
  note: string;
}

export interface ChildMemoCategoryProps {
  memoCategoryName: string;
  memoCategoryIcon: string | null;
  parentMemoCategory: string;
  note: string;
}

export interface UpdateParentMemoCategoryProps {
  memoCategoryId: string;
  memoCategoryName: string;
  memoCategoryIcon: string;
  note: string;
}

export interface UpdateChildMemoCategoryProps {
  memoCategoryId: string;
  memoCategoryName: string;
  memoCategoryIcon: string;
  parentMemoCategory: string;
  note: string;
}

export interface UpsertParentMemoCategory {}
