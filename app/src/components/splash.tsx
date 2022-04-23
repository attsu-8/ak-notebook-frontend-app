import { VFC, ReactNode } from 'react';
import { SplashScreen } from './splash-screen';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { useRouter } from 'next/router';

import { selectIsInitialized } from '../slices/authentication/authSlice';

interface SplashProps {
  children: ReactNode;
}

export const Splash: VFC<SplashProps> = (props) => {
  const { children } = props;
  const isInitialized = useSelector(selectIsInitialized);

  return (
    <>
      {!isInitialized && <SplashScreen />}
      {children}
    </>
  );
};
