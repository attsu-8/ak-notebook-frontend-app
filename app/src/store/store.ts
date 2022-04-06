import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import type { ThunkAction } from "redux-thunk";
import type { Action } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
