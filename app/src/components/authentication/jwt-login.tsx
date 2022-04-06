import { VFC } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMounted } from "../../hooks/use-mounted";
import { fetchAsyncLogin, fetchAsyncGetMyProf, setIsAuthenticated } from "../../slices/authentication/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TextField, Box, FormHelperText, Button} from "@mui/material";

export const JWTLogin: VFC = (props) => {
    const isMounted = useMounted();
    const dispatch = useDispatch();
    const router = useRouter();

    
    const formik = useFormik({
        initialValues: {
            userEmail: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
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
                const result: any = await dispatch(fetchAsyncLogin(auth));
                if (fetchAsyncLogin.fulfilled.match(result)) {
                    await dispatch(fetchAsyncGetMyProf());
                    await dispatch(setIsAuthenticated());
                }

                if (isMounted()) {
                    const returnUrl = (router.query.returnUrl as string) || '/';
                    router.push(returnUrl);
                }
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
                autoFocus
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
                >
                    Log In
                </Button>
            </Box>
        </form>
    );
};