import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "../slices/authentication/authSlice";
import {reducer as noteReducer} from "../slices/memo/noteSlice";
import { reducer as memoCategoryReducer } from "../slices/memo/memoCategorySlice";
import { reducer as memoReducer } from "../slices/memo/memoSlice";
import { reducer as purposeReducer } from "../slices/memo/purposeSlice";
import { reducer as learningEfficiencyReducer } from "../slices/home/learningEfficiencySlice";


export const rootReducer = combineReducers({
    auth: authReducer,
    note: noteReducer,
    memoCategory: memoCategoryReducer,
    memo: memoReducer,
    purpose: purposeReducer,
    learningEfficiency: learningEfficiencyReducer,
});