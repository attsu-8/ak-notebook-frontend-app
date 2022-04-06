import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import type { PurposeProps, PurposeState, UpdatePurposeProps } from '../../types/memo/purpose'
import { LogicalDeleteProps } from './commons';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

export const fetchAsyncGetPurposes = createAsyncThunk(
    'purpose/get',
    async () => {
        const res = await axios.get(
            `${apiUrl}api/purpose/`,
            {
                headers: {
                    'Authorization': `JWT ${localStorage.accessToken}`,
                },
            }
        );
        return res.data.results;
    }
);

export const fetchAsyncGetPurposesFilter = createAsyncThunk(
  'purpose/get/note',
  async (noteId: String) => {
    const res = await axios.get(
      `${apiUrl}api/filter/purpose/?note=${noteId}`,
      {
        headers: {
          'Authorization': `JWT ${localStorage.accessToken}`
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncCreatePurpose = createAsyncThunk(
  'purpose/post',
  async (purpose: PurposeProps) => {
    const data = {
      "purposeName": "hoge??????????????",
      "purposeIcon": null,
      "note": "c6a71bc3-36fa-4534-9243-b70e8bb0ce27"
    }
    const res = await axios.post(
      `${apiUrl}api/purpose/`,
      purpose,
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

export const fetchAsyncPatchPurpose = createAsyncThunk(
  'purpose/patch',
  async (purpose: UpdatePurposeProps) => {
    const updateData: PurposeProps = {
      purposeName: purpose.purposeName,
      purposeIcon: purpose.purposeIcon,
      note: purpose.note,
    }
    const res = await axios.patch(
      `${apiUrl}api/purpose/${purpose.purposeId}/`,
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

export const fetchAsyncLogicalDeletePurpose = createAsyncThunk(
  'purpose/delete',
  async (purposeId: string) => {
    const updateData: LogicalDeleteProps = {
      isActive: false
    }
    const res = await axios.patch(
      `${apiUrl}api/purpose/${purposeId}/`,
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



const initialState: PurposeState = {
  editPurpose: {
    purposeName: "",
    purposeIcon: null,
    note: "",
  },
  purposeOptions: [],
  purposes: [],
};

export const purposeSlice = createSlice({
  name: 'purpose',
  initialState,
  reducers: {
    changeEditPurpose(state, action) {
      state.editPurpose = {...state.editPurpose, ...action.payload};
    },
    resetEditPurpose(state) {
      state.editPurpose = initialState.editPurpose;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetPurposes.fulfilled,
      (state, action) => {
          state.purposes = action.payload;
      }
    );
    builder.addCase(
      fetchAsyncGetPurposesFilter.fulfilled,
      (state, action) => {
          state.purposeOptions = action.payload.results;
      }
    );
    builder.addCase(
      fetchAsyncCreatePurpose.fulfilled,
      (state, action) => {
        return {
          ...state,
          purposeOptions: [...state.purposeOptions, action.payload]
        }
      }
    );
    builder.addCase(
      fetchAsyncPatchPurpose.fulfilled,
      (state, action) => {
        state.purposeOptions = state.purposeOptions.map((purpose) => 
        purpose.purposeId === action.payload.purposeId ? action.payload : purpose
        )
      }
    );
    builder.addCase(
      fetchAsyncLogicalDeletePurpose.fulfilled,
      (state, action) => {
        state.purposeOptions = state.purposeOptions.filter((purpose) => {
          return purpose.purposeId !== action.payload.purposeId
        })
      }
    );
  },

});

export const { 
  changeEditPurpose,
  resetEditPurpose,
} = purposeSlice.actions;

export const selectEditPurpose = (state: RootState) => state.purpose.editPurpose;
export const selectPurposeOptions = (state: RootState) => state.purpose.purposeOptions;
export const selectPurposes = (state: RootState) => state.purpose.purposes;

export default purposeSlice.reducer;

export const { reducer } = purposeSlice;