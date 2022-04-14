import { VFC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { logout, resetIsInitialized, selectIsAuthenticated, setIsInitialized } from '../../slices/authentication/authSlice';
import { useSelector,useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import {fetchAsyncGetMyProf,setIsAuthenticated} from '../../slices/authentication/authSlice';
import { initializeStoreData } from '../../utils/load/initializeStoreData';

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard: VFC<AuthGuardProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const check = async () => {
            if (!router.isReady) {
                return;
            }

            const accessToken = window.localStorage.getItem('accessToken')
            if (accessToken) {
                const getProfResult: any = await dispatch(fetchAsyncGetMyProf());
                if (fetchAsyncGetMyProf.rejected.match(getProfResult)) {
                    window.localStorage.removeItem('accessToken')
                    dispatch(logout())
                    router.push({
                        pathname: '/authentication/login',
                        query: { returnUrl: router.asPath }
                    });
                } else {
                    if (!isAuthenticated) {
                        await dispatch(resetIsInitialized())
                        // await initializeStoreData(dispatch)
                        await dispatch(setIsAuthenticated());
                    }
                    await setIsChecked(true);
                    router.push({
                        pathname: '/',
                    });
                }
            }
             else {
                dispatch(logout())
                dispatch(setIsInitialized());
                router.push({
                    pathname: '/authentication/login',
                    query: { returnUrl: router.asPath }
                });
            }
    
        }
        check();
    },[router.isReady]
    );

    if (!isChecked) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}

AuthGuard.propTypes = {
    children: PropTypes.node
};
