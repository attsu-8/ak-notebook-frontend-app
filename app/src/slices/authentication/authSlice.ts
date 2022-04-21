import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import axios from 'axios';
import type { AuthState, AuthProps, Nickname, NicknamePatchProps, ProfileImagePatchProps } from '../../types/auth';

const apiUrl = process.env.NEXT_PUBLIC_AKNOTEBOOK_API_URL;

export const fetchAsyncLogin = createAsyncThunk(
  'auth/post',
  async (authen: AuthProps) => {

    const res = await axios.post(
      `${apiUrl}authen/jwt/create/`,
      authen,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);
    
export const fetchAsyncRegister = createAsyncThunk(
  'auth/register',
  async (authen: AuthProps) => {
    const res = await axios.post(
      `${apiUrl}api/register/`,
      authen,
      {
        headers: {
          'Content-Type': "application/json",
        },
      }
    );
    return res.data.results;
  }
);
    
export const fetchAsyncCreateInitialUserData = createAsyncThunk(
  'auth/initialUserData',
  async () => {
    const res = await axios.get(
      `${apiUrl}api/initial-data/`,
      {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `JWT ${localStorage.accessToken}`
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  'profile/post',
  async (nickname: Nickname) => {
    const res = await axios.post(
      `${apiUrl}api/profile/`,
      nickname,
      {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `JWT ${localStorage.accessToken}`
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncPatchProfileImage = createAsyncThunk(
  'profileImage/patch',
  async (profileImage: ProfileImagePatchProps) => {
    const uploadData = new FormData();
    uploadData.append(
      'profileImage', 
      profileImage.profileImage, 
      profileImage.profileImage.name
    );
    const res = await axios.patch(
      `${apiUrl}api/profile/${profileImage.profileId}/`,
      uploadData,
      {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `JWT ${localStorage.accessToken}`  
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncPatchProfileNickname = createAsyncThunk(
  'profileNickname/patch',
  async (profileNickname: NicknamePatchProps) => {

    const res = await axios.patch(
      `${apiUrl}api/profile/${profileNickname.profileId}/`,
      profileNickname,
      {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results;
  }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
  'profile/get',
  async () => {
    const res = await axios.get(
      `${apiUrl}api/myprofile/`,
      {
        headers: {
          'Authorization': `JWT ${localStorage.accessToken}`,
        },
      }
    );
    return res.data.results[0];
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: true,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state){
      state.isAuthenticated = true;
    },
    resetIsAuthenticated(state){
      state.isAuthenticated = false;
    },
    setIsInitialized(state){
      state.isInitialized = true;
    },
    resetIsInitialized(state){
      state.isInitialized = false;
    },
    editNickname(state, action) {
      state.user.profileNickname = action.payload;
    },
    logout(state){
      state.isInitialized = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action) => {
        localStorage.setItem('accessToken', action.payload.access);
      }
    );
    builder.addCase(
      fetchAsyncCreateProf.fulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addCase(
      fetchAsyncGetMyProf.fulfilled,
      (state, action) => {
        if(action.payload) {
          state.user = action.payload;
        }
      }
    );
    builder.addCase(
      fetchAsyncPatchProfileNickname.fulfilled,
      (state, action) => {
        state.user.profileNickname = action.meta.arg.profileNickname;
      }
    );
  },
});

export const { 
  setIsAuthenticated,
  resetIsAuthenticated,
  setIsInitialized,
  resetIsInitialized,
  editNickname, 
  logout,
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

export const { reducer } = authSlice;