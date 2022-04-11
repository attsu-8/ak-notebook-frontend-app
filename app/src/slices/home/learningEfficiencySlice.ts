import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import { LearningEfficiencyPostData, LearningEfficiencyState } from '../../types/home/learningEfficiency';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

export const fetchAsyncGetTodayLearningEfficiency = createAsyncThunk(
  'todayLearningEfficiency/get',
  async () => {
      const res = await axios.get(
          `${apiUrl}api/dm/today-learning-efficiency-rate/`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncGetThreeMonthAverageLearningEfficiency = createAsyncThunk(
  'threeMonthAverageLearningEfficiency/get',
  async () => {
      const res = await axios.get(
          `${apiUrl}api/dm/three-month-ago-avg-learning-efficiency-rate/`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncGetEachNoteLearningEfficiency = createAsyncThunk(
  'eachNoteLearningEfficiency/get',
  async () => {
      const res = await axios.get(
          `${apiUrl}api/dm/each-note-learning-efficiency-rate/`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncGetEachParentMemoCategoryLearningEfficiency = createAsyncThunk(
  'eachParentMemoCategoryLearningEfficiency/get',
  async (noteId: string) => {
      const res = await axios.get(
          `${apiUrl}api/dm/each-parent-memo-category-learning-efficiency-rate/?note=${noteId}`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncGetEachMemoLearningEfficiency = createAsyncThunk(
  'eachMemoLearningEfficiency/get',
  async (parentMemoCategoryId: string) => {
      const res = await axios.get(
          `${apiUrl}api/dm/each-memo-learning-efficiency-rate/?parent_memo_category=${parentMemoCategoryId}`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncGetSelectMemoLearningEfficiency = createAsyncThunk(
  'selectMemoLearningEfficiency/get',
  async (memoId: string) => {
      const res = await axios.get(
          `${apiUrl}api/filter/memo/?memo_id=${memoId}`,
          {
              headers: {
                  'Authorization': `JWT ${localStorage.accessToken}`,
              },
          }
      );
      return res.data.results;
  }
);

export const fetchAsyncCreateLearningEfficiency = createAsyncThunk(
  'learningEfficiency/post',
  async (learningEfficiencyPatchData: LearningEfficiencyPostData) => {
    const res = await axios.post(
      `${apiUrl}api/dm-learning-efficiency/`,
      learningEfficiencyPatchData,
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

export const fetchAsyncPatchLearningEfficiency = createAsyncThunk(
  'learningEfficiency/patch',
  async (learningEfficiencyId: string) => {
    const patchData = {
      learningEfficiencyRate: 100
    }
    const res = await axios.patch(
      `${apiUrl}api/dm-learning-efficiency/${learningEfficiencyId}/`,
      patchData,
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

const initialState: LearningEfficiencyState = {
  todayLearningEfficiency: {
    aggregateDate: "",
    todayLearningEfficiencyRate: 0,
    yesterdayLearningEfficiencyRate: 0,
  },
  threeMonthAverageLearningEfficiency: {
    threeMonthAverageLearningEfficiencyRateToday: 0,
    threeMonthAverageLearningEfficiencyRateYesterday: 0,
  },
  eachNoteLearningEfficiency: {
    options: [],
    selectData: null,
  },
  eachParentMemoCategoryLearningEfficiency: {
    options: [],
    selectData: null,
    isFetchData: false,
  },
  eachMemoLearningEfficiency: {
    options: [],
    selectData: null,
    isFetchData: false,
  },
  selectMemo: null,
};

export const learningEfficiencySlice = createSlice({
  name: 'learningEfficiency',
  initialState,
  reducers: {
    setSelectEachNoteLearningEfficiency(state, action) {
      state.eachNoteLearningEfficiency.selectData = action.payload;
    },
    resetSelectEachNoteLearningEfficiency(state) {
      state.eachNoteLearningEfficiency.selectData = initialState.eachNoteLearningEfficiency.selectData;
    },
    setSelectEachParentMemoCategoryLearningEfficiency(state, action) {
      state.eachParentMemoCategoryLearningEfficiency.selectData = action.payload;
    },
    resetSelectEachParentMemoCategoryLearningEfficiency(state) {
      state.eachParentMemoCategoryLearningEfficiency.selectData = initialState.eachParentMemoCategoryLearningEfficiency.selectData;
    },
    setIsFetchParentMemoCategoryData(state) {
      state.eachParentMemoCategoryLearningEfficiency.isFetchData = true;
    },
    resetIsFetchParentMemoCategoryData(state) {
      state.eachParentMemoCategoryLearningEfficiency.isFetchData = false;
    },
    setSelectEachMemoLearningEfficiency(state, action) {
      state.eachMemoLearningEfficiency.selectData = action.payload;
    },
    resetSelectEachMemoLearningEfficiency(state) {
      state.eachMemoLearningEfficiency.selectData = initialState.eachMemoLearningEfficiency.selectData;
    },
    setIsFetchMemoData(state) {
      state.eachMemoLearningEfficiency.isFetchData = true;
    },
    resetIsFetchMemoData(state) {
      state.eachMemoLearningEfficiency.isFetchData = false;
    },
    resetSelectMemoLearningEfficiency(state) {
      state.selectMemo = initialState.selectMemo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetTodayLearningEfficiency.fulfilled,
      (state, action) => {
        state.todayLearningEfficiency.aggregateDate = action.payload[1].aggregateDate;
        state.todayLearningEfficiency.todayLearningEfficiencyRate = action.payload[1].averageLearningEfficiencyRate;
        state.todayLearningEfficiency.yesterdayLearningEfficiencyRate = action.payload[0].averageLearningEfficiencyRate;
      }
    ),
    builder.addCase(
      fetchAsyncGetThreeMonthAverageLearningEfficiency.fulfilled,
      (state,action) => {
        action.payload.map((threeMonthAverageData) => {
          threeMonthAverageData.aggregateUnit === 'today'
            ?
              state.threeMonthAverageLearningEfficiency.threeMonthAverageLearningEfficiencyRateToday = threeMonthAverageData.averageLearningEfficiencyRate
            :
              state.threeMonthAverageLearningEfficiency.threeMonthAverageLearningEfficiencyRateYesterday = threeMonthAverageData.averageLearningEfficiencyRate
        })
      }
    ),
    builder.addCase(
      fetchAsyncGetEachNoteLearningEfficiency.fulfilled,
      (state, action) => {
        state.eachNoteLearningEfficiency.options = action.payload;
      }
    ),
    builder.addCase(
      fetchAsyncGetEachParentMemoCategoryLearningEfficiency.fulfilled,
      (state,action) => {
        state.eachParentMemoCategoryLearningEfficiency.options = action.payload;
        resetIsFetchParentMemoCategoryData();
      }
    ),
    builder.addCase(
      fetchAsyncGetEachMemoLearningEfficiency.fulfilled,
      (state,action) => {
        state.eachMemoLearningEfficiency.options = action.payload;
      }
    ),
    builder.addCase(
      fetchAsyncGetSelectMemoLearningEfficiency.fulfilled,
      (state, action) => {
        state.selectMemo = action.payload[0]
      }
    )
  }
});

export const { 
  setSelectEachNoteLearningEfficiency,
  resetSelectEachNoteLearningEfficiency,
  setSelectEachParentMemoCategoryLearningEfficiency,
  resetSelectEachParentMemoCategoryLearningEfficiency,
  setIsFetchParentMemoCategoryData,
  resetIsFetchParentMemoCategoryData,
  setSelectEachMemoLearningEfficiency,
  resetSelectEachMemoLearningEfficiency,
  setIsFetchMemoData,
  resetIsFetchMemoData,
  resetSelectMemoLearningEfficiency,
} = learningEfficiencySlice.actions;

export const selectAggregateDate = (state: RootState) => state.learningEfficiency.todayLearningEfficiency.aggregateDate;
export const selectTodayLearningEfficiencyRate = (state: RootState) => state.learningEfficiency.todayLearningEfficiency.todayLearningEfficiencyRate;
export const selectYesterdayLearningEfficiencyRate = (state: RootState) => state.learningEfficiency.todayLearningEfficiency.yesterdayLearningEfficiencyRate;
export const selectThreeMonthAverageLearningEfficiencyRateToday = (state: RootState) => state.learningEfficiency.threeMonthAverageLearningEfficiency.threeMonthAverageLearningEfficiencyRateToday;
export const selectThreeMonthAverageLearningEfficiencyRateYesterday = (state: RootState) => state.learningEfficiency.threeMonthAverageLearningEfficiency.threeMonthAverageLearningEfficiencyRateYesterday
export const selectEachNoteLearningEfficiencyOptions = (state: RootState) => state.learningEfficiency.eachNoteLearningEfficiency.options;
export const selectSelectEachNoteLearningEfficiency = (state: RootState) => state.learningEfficiency.eachNoteLearningEfficiency.selectData;
export const selectEachParentMemoCategoryLearningEfficiencyOptions = (state: RootState) => state.learningEfficiency.eachParentMemoCategoryLearningEfficiency.options;
export const selectSelectEachParentMemoCategoryLearningEfficiency = (state: RootState) => state.learningEfficiency.eachParentMemoCategoryLearningEfficiency.selectData;
export const selectIsFetchParentMemoCategoryData = (state: RootState) => state.learningEfficiency.eachParentMemoCategoryLearningEfficiency.isFetchData;
export const selectEachMemoLearningEfficiencyOptions = (state: RootState) => state.learningEfficiency.eachMemoLearningEfficiency.options;
export const selectSelectEachMemoLearningEfficiency = (state: RootState) => state.learningEfficiency.eachMemoLearningEfficiency.selectData;
export const selectIsFetchMemoData = (state: RootState) => state.learningEfficiency.eachMemoLearningEfficiency.isFetchData;
export const selectSelectMemoLearningEfficiency = (state: RootState) => state.learningEfficiency.selectMemo;

export default learningEfficiencySlice.reducer;

export const { reducer } = learningEfficiencySlice;