import type { AppDispatch } from '../../store/store';
import { fetchAsyncGetEachNoteLearningEfficiency, fetchAsyncGetThreeMonthAverageLearningEfficiency, fetchAsyncGetTodayLearningEfficiency } from '../../slices/home/learningEfficiencySlice';
import { resetIsInitialized, setIsInitialized } from '../../slices/authentication/authSlice';

export const initializeStoreData = async (dispatch: AppDispatch) => {
    // await dispatch(resetIsInitialized())
    await dispatch(fetchAsyncGetTodayLearningEfficiency());
    await dispatch(fetchAsyncGetThreeMonthAverageLearningEfficiency());
    await dispatch(fetchAsyncGetEachNoteLearningEfficiency());
    await dispatch(setIsInitialized())
}