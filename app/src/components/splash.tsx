import {VFC, ReactNode, useEffect} from 'react';
import { SplashScreen } from './splash-screen';
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from '../store/store';
import { useRouter } from 'next/router';

import { 
    selectIsInitialized,
    setIsInitialized,
    fetchAsyncGetMyProf,
    setIsAuthenticated
 } from '../slices/authentication/authSlice';
import { fetchAsyncGetEachNoteLearningEfficiency, fetchAsyncGetThreeMonthAverageLearningEfficiency, fetchAsyncGetTodayLearningEfficiency } from '../slices/home/learningEfficiencySlice';

interface SplashProps {
    children: ReactNode;
}


export const Splash: VFC<SplashProps> = (props) => {
    const { children } = props;
    const isInitialized = useSelector(selectIsInitialized);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const initialize = async () => {
            await dispatch(fetchAsyncGetTodayLearningEfficiency());
            await dispatch(fetchAsyncGetThreeMonthAverageLearningEfficiency());
            await dispatch(fetchAsyncGetEachNoteLearningEfficiency());
            await dispatch(setIsInitialized());
        }
        initialize();
    },[]);

    return (
        <>
            {!isInitialized && <SplashScreen />}
            {children}
        </>
    )
}
