import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import { ChildMemoCategoryProps, MemoCategoryState, ParentMemoCategoryProps, UpdateChildMemoCategoryProps, UpdateParentMemoCategoryProps } from '../../types/memo/memoCategory';
import { LogicalDeleteProps } from './commons';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

export const fetchAsyncGetParentMemoCategories = createAsyncThunk(
  'parent-memo-category/get',
  async () => {
    const res = await axios.get(
      `${apiUrl}api/parent-memo-category/`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncGetParentMemoCategoriesFilter = createAsyncThunk(
  'parent-memo-category/get/noteid',
  async (noteId: string) => {
    const res = await axios.get(
      `${apiUrl}api/filter/parent-memo-category/?note=${noteId}`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncGetChildMemoCategories = createAsyncThunk(
  'child-memo-category/get',
  async () => {
    const res = await axios.get(
      `${apiUrl}api/child-memo-category/`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncGetChildMemoCategoriesFilter = createAsyncThunk(
  'child-memo-category/get/parent-memo-category',
  async (parentMemoCategory: string) => {
    const res = await axios.get(
      `${apiUrl}api/filter/child-memo-category/?parent_memo_category=${parentMemoCategory}`,
      {
        headers: {
            'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncCreateParentMemoCategory = createAsyncThunk(
  'parent-memo-category/post',
  async (parentMemoCategory: ParentMemoCategoryProps) => {
    const res = await axios.post(
      `${apiUrl}api/parent-memo-category/`,
      parentMemoCategory,
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

export const fetchAsyncCreateChildMemoCategory = createAsyncThunk(
  'child-memo-category/post',
  async (childMemoCategory: ChildMemoCategoryProps) => {
    const res = await axios.post(
      `${apiUrl}api/child-memo-category/`,
      childMemoCategory,
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

export const fetchAsyncPatchParentMemoCategory = createAsyncThunk(
  'parent-memo-category/patch',
  async (parentMemoCategory: UpdateParentMemoCategoryProps) => {
    const updateData: ParentMemoCategoryProps = {
      memoCategoryName: parentMemoCategory.memoCategoryName,
      memoCategoryIcon: parentMemoCategory.memoCategoryIcon,
      note: parentMemoCategory.note
    }
    const res = await axios.patch(
      `${apiUrl}api/parent-memo-category/${parentMemoCategory.memoCategoryId}/`,
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

export const fetchAsyncPatchChildMemoCategory = createAsyncThunk(
  'child-memo-category/patch',
  async (childMemoCategory: UpdateChildMemoCategoryProps) => {
    const updateData: ChildMemoCategoryProps = {
      memoCategoryName: childMemoCategory.memoCategoryName,
      memoCategoryIcon: childMemoCategory.memoCategoryIcon,
      note: childMemoCategory.note,
      parentMemoCategory: childMemoCategory.parentMemoCategory,
    }
    const res = await axios.patch(
      `${apiUrl}api/child-memo-category/${childMemoCategory.memoCategoryId}/`,
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

export const fetchAsyncLogicalDeleteParentMemoCategory = createAsyncThunk(
  'parent-memo-category/delete',
  async (parentMemoCategoryId: string) => {
    const updateData: LogicalDeleteProps = {
      isActive: false
    }
    const res = await axios.patch(
      `${apiUrl}api/parent-memo-category/${parentMemoCategoryId}/`,
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

export const fetchAsyncLogicalDeleteChildMemoCategory = createAsyncThunk(
  'child-memo-category/delete',
  async (childMemoCategoryId: string) => {
    const updateData: LogicalDeleteProps = {
      isActive: false
    }
    const res = await axios.patch(
      `${apiUrl}api/child-memo-category/${childMemoCategoryId}/`,
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

const initialState: MemoCategoryState = {
    editMemoCategory: {
      memoCategoryName: "",
      memoCategoryIcon: null,
      note: "",
    },
    selectMemoCategory: {
        parentMemoCategory: {
            memoCategoryId: "",
            memoCategoryName: "",
            memoCategoryIcon: "",
            parentMemoCategory: null,
            note: "",
            user: "",
            isActive: false,
            createdAt: "",
            updatedAt: "",
        },
        childMemoCategory: {
            memoCategoryId: "",
            memoCategoryName: "",
            memoCategoryIcon: "",
            parentMemoCategory: null,
            note: "",
            user: "",
            isActive: false,
            createdAt: "",
            updatedAt: "",
        },
    },
    memoCategoryOptions: {
      parentMemoCategories: [],
      childMemoCategories: [],
    },
    isParentMemoCategoryNewEditorOpen: false,
    isChildMemoCategoryNewEditorOpen: false,
    isCreatedChildMemoCategory: false,
};

export const memoCategorySlice = createSlice({
  name: 'memoCategory',
  initialState,
  reducers: {
    changeEditMemoCategory(state, action) {
      state.editMemoCategory = {...state.editMemoCategory, ...action.payload}
    },
    resetEditMemoCategory(state) {
      state.editMemoCategory = initialState.editMemoCategory
    },
    changeSelectParentMemoCategory(state, action) {
      state.selectMemoCategory.parentMemoCategory = action.payload
    },
    resetSelectParentMemoCategory(state) {
      state.selectMemoCategory.parentMemoCategory = initialState.selectMemoCategory.parentMemoCategory
    },
    changeSelectChildMemoCategory(state, action) {
      state.selectMemoCategory.childMemoCategory = action.payload
    },
    resetSelectChildMemoCategory(state) {
      state.selectMemoCategory.childMemoCategory = initialState.selectMemoCategory.childMemoCategory
    },
    resetParentMemoCategoryOptions(state){
      state.memoCategoryOptions.parentMemoCategories =initialState.memoCategoryOptions.parentMemoCategories
    },
    resetChildMemoCategoryOptions(state){
      state.memoCategoryOptions.childMemoCategories =initialState.memoCategoryOptions.childMemoCategories
    },
    setIsParentMemoCategoryNewEditorOpen(state){
      state.isParentMemoCategoryNewEditorOpen = true;
    },
    resetIsParentMemoCategoryNewEditorOpen(state){
      state.isParentMemoCategoryNewEditorOpen = false;
    },
    setIsChildMemoCategoryNewEditorOpen(state){
      state.isChildMemoCategoryNewEditorOpen = true;
    },
    resetIsChildMemoCategoryNewEditorOpen(state){
      state.isChildMemoCategoryNewEditorOpen = false;
    },
    resetIsCreatedChildMemoCategory(state){
      state.isCreatedChildMemoCategory = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetParentMemoCategoriesFilter.fulfilled,
      (state, action) => {
          state.memoCategoryOptions.parentMemoCategories = action.payload;
      }
    );
    builder.addCase(
      fetchAsyncGetChildMemoCategoriesFilter.fulfilled,
      (state, action) => {
          state.memoCategoryOptions.childMemoCategories = action.payload;
      }
    );
    builder.addCase(
      fetchAsyncCreateParentMemoCategory.fulfilled,
      (state, action) => {
        state.selectMemoCategory.parentMemoCategory = action.payload;
        state.memoCategoryOptions.parentMemoCategories = [...state.memoCategoryOptions.parentMemoCategories, action.payload]
      }
    );
    builder.addCase(
      fetchAsyncCreateChildMemoCategory.fulfilled,
      (state, action) => {
        state.selectMemoCategory.childMemoCategory = action.payload;
        state.memoCategoryOptions.childMemoCategories = [...state.memoCategoryOptions.childMemoCategories,action.payload]
        state.isCreatedChildMemoCategory = true;
      }
    );
    builder.addCase(
      fetchAsyncPatchParentMemoCategory.fulfilled,
      (state, action) => {
        if (state.selectMemoCategory.parentMemoCategory.memoCategoryId === action.payload.memoCategoryId) {
          state.selectMemoCategory.parentMemoCategory = action.payload
        }
        state.memoCategoryOptions.parentMemoCategories = state.memoCategoryOptions.parentMemoCategories.map((parentMemoCategory) => (
          parentMemoCategory.memoCategoryId === action.payload.memoCategoryId ? action.payload : parentMemoCategory
        ))
      }
    );
    builder.addCase(
      fetchAsyncPatchChildMemoCategory.fulfilled,
      (state, action) => {
        if (state.selectMemoCategory.childMemoCategory.memoCategoryId === action.payload.memoCategoryId) {
          state.selectMemoCategory.childMemoCategory = action.payload
        }
        state.memoCategoryOptions.childMemoCategories = state.memoCategoryOptions.childMemoCategories.map((childMemoCategory) => (
          childMemoCategory.memoCategoryId === action.payload.memoCategoryId ? action.payload : childMemoCategory
        ))
      }
    );
    builder.addCase(
      fetchAsyncLogicalDeleteParentMemoCategory.fulfilled,
      (state, action) => {
        if (state.selectMemoCategory.parentMemoCategory.memoCategoryId === action.payload.memoCategoryId) {
          state.selectMemoCategory.parentMemoCategory = initialState.selectMemoCategory.parentMemoCategory
        }
        state.memoCategoryOptions.parentMemoCategories = state.memoCategoryOptions.parentMemoCategories.filter((parentMemoCategory) => {
          return parentMemoCategory.memoCategoryId !== action.payload.memoCategoryId
        })
      }
    );
    builder.addCase(
      fetchAsyncLogicalDeleteChildMemoCategory.fulfilled,
      (state, action) => {
        if (state.selectMemoCategory.childMemoCategory.memoCategoryId === action.payload.memoCategoryId) {
          state.selectMemoCategory.childMemoCategory = initialState.selectMemoCategory.childMemoCategory
        }
        state.memoCategoryOptions.childMemoCategories = state.memoCategoryOptions.childMemoCategories.filter((childMemoCategory) => {
          return childMemoCategory.memoCategoryId !== action.payload.memoCategoryId
        })
      }
    );
  },
});

export const { 
  changeEditMemoCategory,
  resetEditMemoCategory,
  changeSelectParentMemoCategory,
  resetSelectParentMemoCategory,
  changeSelectChildMemoCategory,
  resetSelectChildMemoCategory,
  resetParentMemoCategoryOptions,
  resetChildMemoCategoryOptions,
  setIsParentMemoCategoryNewEditorOpen,
  resetIsParentMemoCategoryNewEditorOpen,
  setIsChildMemoCategoryNewEditorOpen,
  resetIsChildMemoCategoryNewEditorOpen,
  resetIsCreatedChildMemoCategory,
} = memoCategorySlice.actions;

export const selectEditMemoCategory = (state: RootState) => state.memoCategory.editMemoCategory
export const selectSelectParentMemoCategory = (state: RootState) => state.memoCategory.selectMemoCategory.parentMemoCategory
export const selectSelectChildMemoCategory = (state: RootState) => state.memoCategory.selectMemoCategory.childMemoCategory
export const selectParentMemoCategoryOptions = (state: RootState) => state.memoCategory.memoCategoryOptions.parentMemoCategories
export const selectChildMemoCategoryOptions = (state: RootState) => state.memoCategory.memoCategoryOptions.childMemoCategories
export const selectIsParentMemoCategoryNewEditorOpen = (state: RootState) => state.memoCategory.isParentMemoCategoryNewEditorOpen
export const selectIsChildMemoCategoryNewEditorOpen = (state: RootState) => state.memoCategory.isChildMemoCategoryNewEditorOpen
export const selectIsCreatedChildMemoCategory = (state: RootState) => state.memoCategory.isCreatedChildMemoCategory

export default memoCategorySlice.reducer;

export const { reducer } = memoCategorySlice;