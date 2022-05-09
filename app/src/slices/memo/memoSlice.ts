import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import type {
  MemoFilterProps,
  memoPriorityProps,
  MemoProps,
  memoPurposeProps,
  MemoState,
  memoTextProps,
  memoTitleProps,
} from '../../types/memo/memo';
import { LogicalDeleteProps } from './commons';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

const changeHttpToHttps = (nextPage: string): string => {
  return nextPage.replace('http', 'https');
};

export const fetchAsyncGetMemos = createAsyncThunk('memo/get', async () => {
  const res = await axios.get(`${apiUrl}api/memo/?limit=1000`, {
    headers: {
      Authorization: `JWT ${localStorage.accessToken}`,
    },
  });
  return res.data.results;
});

export const fetchAsyncGetMemosFilter = createAsyncThunk(
  'memo/get/parent-memo-category&child-memo-category',
  async (memocategories: MemoFilterProps) => {
    const res = await axios.get(
      `${apiUrl}api/filter/memo/?limit=10&parent_memo_category=${memocategories.parentMemoCategoryId}&child_memo_category=${memocategories.childMemoCategoryId}`,
      {
        headers: {
          Authorization: `JWT ${localStorage.accessToken}`,
        },
      },
    );
    return res.data;
  },
);

export const fetchAsyncGetMemosNextPage = createAsyncThunk(
  'memo/get/next',
  async (nextPage: String) => {
    const res = await axios.get(`${nextPage}`, {
      headers: {
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncCreateMemo = createAsyncThunk('memo/post', async (memo: MemoProps) => {
  const res = await axios.post(`${apiUrl}api/memo/`, memo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.accessToken}`,
    },
  });
  return res.data;
});

export const fetchAsyncCountBrowsingMemo = createAsyncThunk(
  'browsingMemoCount/memo/post',
  async (memoId: string) => {
    const res = await axios.post(
      `${apiUrl}api/browsing-memo-count/`,
      { memo: memoId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.accessToken}`,
        },
      },
    );
    return res.data;
  },
);

export const fetchAsyncPatchMemoTitle = createAsyncThunk(
  'memo/title/patch',
  async (memoTitleData: memoTitleProps) => {
    const patchData = {
      memoTitle: memoTitleData.memoTitle,
    };
    const res = await axios.patch(`${apiUrl}api/memo/${memoTitleData.memoId}/`, patchData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncPatchMemoText = createAsyncThunk(
  'memo/text/patch',
  async (memoTextData: memoTextProps) => {
    const patchData = {
      memoText: memoTextData.memoText,
    };
    const res = await axios.patch(`${apiUrl}api/memo/${memoTextData.memoId}/`, patchData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncPatchPriority = createAsyncThunk(
  'memo/priority/patch',
  async (memoPriorityData: memoPriorityProps) => {
    const patchData = {
      memoPriority: memoPriorityData.memoPriority,
    };
    const res = await axios.patch(`${apiUrl}api/memo/${memoPriorityData.memoId}/`, patchData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncPatchPurpose = createAsyncThunk(
  'memo/priority/patch',
  async (memoPurposeData: memoPurposeProps) => {
    const patchData = {
      purpose: memoPurposeData.purpose,
    };
    const res = await axios.patch(`${apiUrl}api/memo/${memoPurposeData.memoId}/`, patchData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncLogicalDeleteMemo = createAsyncThunk(
  'memo/delte',
  async (memoId: string) => {
    const updateData: LogicalDeleteProps = {
      isActive: false,
    };
    const res = await axios.patch(`${apiUrl}api/memo/${memoId}/`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.accessToken}`,
      },
    });
    return res.data;
  },
);

const initialState: MemoState = {
  editMemo: {
    memoId: '',
    memoTitle: '',
    memoPriority: 0,
    memoText: '',
    note: '',
    parentMemoCategory: '',
    childMemoCategory: '',
    purpose: '',
    user: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
  },
  selectMemo: {
    memoId: '',
    memoTitle: '',
    memoPriority: 0,
    memoText: '',
    note: '',
    parentMemoCategory: '',
    childMemoCategory: '',
    purpose: '',
    user: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
  },
  memoOptions: [],
  memoNextPage: null,
  isMemoReflesh: true,
  isMemoNextPageLoading: false,
  memos: [],
  latestCreateMemo: {
    memoId: '',
    memoTitle: '',
    memoPriority: 0,
    memoText: '',
    note: '',
    parentMemoCategory: '',
    childMemoCategory: '',
    purpose: '',
    user: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
  },
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    changeSelectMemo(state, action) {
      state.selectMemo = action.payload;
    },
    changeMemoOption(state, action) {
      state.memoOptions = state.memos.filter((memo) => {
        return memo.childMemoCategory === action.payload;
      });
    },
    resetMemoOption(state) {
      state.memoOptions = initialState.memoOptions;
    },
    setIsMemoNextPageLoading(state) {
      state.isMemoNextPageLoading = true;
    },
    resetIsMemoNextPageLoading(state) {
      state.isMemoNextPageLoading = true;
    },
    addNewMemo(state, action) {
      state.memoOptions = [...state.memoOptions, action.payload];
    },
    changeEditMemo(state, action) {
      state.editMemo = { ...state.editMemo, ...action.payload };
    },
    resetEditMemo(state) {
      state.editMemo = initialState.editMemo;
    },
    startMemoReflesh(state) {
      state.isMemoReflesh = false;
    },
    endMemoReflesh(state) {
      state.isMemoReflesh = true;
    },
    resetLatestCreateMemo(state) {
      state.latestCreateMemo = initialState.latestCreateMemo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMemos.fulfilled, (state, action) => {
      state.memos = action.payload;
    });
    builder.addCase(fetchAsyncGetMemosFilter.fulfilled, (state, action) => {
      state.memoOptions = action.payload.results;
      if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
        state.memoNextPage = changeHttpToHttps(action.payload.next);
      } else {
        state.memoNextPage = action.payload.next;
      }
      if (state.memoNextPage) {
        state.isMemoNextPageLoading = true;
      } else {
        state.isMemoNextPageLoading = false;
      }
    });
    builder.addCase(fetchAsyncGetMemosNextPage.fulfilled, (state, action) => {
      state.memoOptions = [...state.memoOptions, ...action.payload.results];
      if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
        state.memoNextPage = changeHttpToHttps(action.payload.next);
      } else {
        state.memoNextPage = action.payload.next;
      }
      if (state.memoNextPage) {
        state.isMemoNextPageLoading = true;
      } else {
        state.isMemoNextPageLoading = false;
      }
    });
    builder.addCase(fetchAsyncCreateMemo.fulfilled, (state, action) => {
      return {
        ...state,
        latestCreateMemo: action.payload,
        memoOptions: [...state.memoOptions, action.payload],
      };
    });
    builder.addCase(fetchAsyncPatchMemoTitle.fulfilled, (state, action) => {
      return {
        ...state,
        memoOptions: state.memoOptions.map((memo) =>
          memo.memoId === action.payload.memoId ? action.payload : memo,
        ),
      };
    });
    builder.addCase(fetchAsyncPatchMemoText.fulfilled, (state, action) => {
      return {
        ...state,
        memoOptions: state.memoOptions.map((memo) =>
          memo.memoId === action.payload.memoId ? action.payload : memo,
        ),
      };
    });
    builder.addCase(fetchAsyncPatchPriority.fulfilled, (state, action) => {
      return {
        ...state,
        memoOptions: state.memoOptions.map((memo) =>
          memo.memoId === action.payload.memoId ? action.payload : memo,
        ),
      };
    });
    builder.addCase(fetchAsyncLogicalDeleteMemo.fulfilled, (state, action) => {
      state.memoOptions = state.memoOptions.filter((memo) => {
        return memo.memoId !== action.payload.memoId;
      });
    });
    builder.addCase(fetchAsyncGetMemos.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncGetMemosFilter.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncGetMemosNextPage.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncCreateMemo.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncCountBrowsingMemo.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncPatchMemoTitle.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncPatchMemoText.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncPatchPriority.rejected, (state, error) => {
      console.error(error.error.message);
    });
    builder.addCase(fetchAsyncLogicalDeleteMemo.rejected, (state, error) => {
      console.error(error.error.message);
    });
  },
});

export const {
  changeSelectMemo,
  changeMemoOption,
  resetMemoOption,
  setIsMemoNextPageLoading,
  resetIsMemoNextPageLoading,
  addNewMemo,
  changeEditMemo,
  resetEditMemo,
  startMemoReflesh,
  endMemoReflesh,
  resetLatestCreateMemo,
} = memoSlice.actions;

export const selectEditMemo = (state: RootState) => state.memo.editMemo;
export const selectSelectMemo = (state: RootState) => state.memo.selectMemo;
export const selectMemoOptions = (state: RootState) => state.memo.memoOptions;
export const selectMemoNextPage = (state: RootState) => state.memo.memoNextPage;
export const selectIsMemoReflesh = (state: RootState) => state.memo.isMemoReflesh;
export const selectIsMemoNextPageLoading = (state: RootState) => state.memo.isMemoNextPageLoading;
export const selectMemos = (state: RootState) => state.memo.memos;
export const selectLatestCreateMemo = (state: RootState) => state.memo.latestCreateMemo;

export default memoSlice.reducer;

export const { reducer } = memoSlice;
