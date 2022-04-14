import { VFC } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMounted } from "../../hooks/use-mounted";
import { fetchAsyncLogin, setIsAuthenticated, resetIsInitialized, setIsInitialized, fetchAsyncRegister, fetchAsyncCreateProf } from "../../slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TextField, Box, FormHelperText, Button} from "@mui/material";
import {initializeStoreData} from "../../utils/load/initializeStoreData";

export const JWTRegister: VFC = (props) => {
    const isMounted = useMounted();
    const dispatch = useDispatch();
    const router = useRouter();

    
    const formik = useFormik({
        initialValues: {
            profileNickname: '',
            userEmail: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            profileNickname: Yup
                .string()
                .max(30),
            userEmail: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                const auth = {
                    userEmail: values.userEmail,
                    password: values.password,
                }
                let profile = {
                    profileNickname: values.profileNickname
                }

                if (values.profileNickname === '') {
                    profile = {
                        profileNickname: 'anonymous'
                    }
                }

                const result: any = await dispatch(fetchAsyncRegister(auth));
                if (fetchAsyncRegister.fulfilled.match(result)) {

                    const loginResult: any = await dispatch(fetchAsyncLogin(values));
                    if (fetchAsyncLogin.fulfilled.match(loginResult)){
                        await dispatch(resetIsInitialized());
                        await dispatch(fetchAsyncCreateProf(profile));
                        await dispatch(setIsAuthenticated());
                        // await initializeStoreData(dispatch);    
                    }
                }
                
                if (isMounted()) {
                    const returnUrl = await (router.query.returnUrl as string) || '/';
                    await router.push(returnUrl);
                }

                await dispatch(setIsInitialized());

            } catch (err) {
                console.error(err);

                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    return (
        <form
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >
            <TextField
                error={Boolean(
                    formik.touched.profileNickname
                    && formik.errors.profileNickname
                )}
                fullWidth
                helperText={
                    formik.touched.profileNickname
                    && formik.errors.profileNickname}
                label="Nickname"
                margin="normal"
                name="profileNickname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profileNickname}
            />

            <TextField
                error={Boolean(
                    formik.touched.userEmail
                    && formik.errors.userEmail
                )}
                fullWidth
                helperText={
                    formik.touched.userEmail
                    && formik.errors.userEmail}
                label="Email Address"
                margin="normal"
                name="userEmail"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.userEmail}
            />

            <TextField
                error={Boolean(
                    formik.touched.password
                    && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
            />
            {formik.errors.submit && (
                <Box sx={{mt: 3}}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{ mt:2}}>
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    Create
                </Button>
            </Box>
        </form>
    );
};