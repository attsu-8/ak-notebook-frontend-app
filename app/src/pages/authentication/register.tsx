import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { Logo } from '../../components/logo';
import NextLink from 'next/link';
import { JWTRegister } from '../../components/authentication/jwt-register';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Account | ak-notebook</title>
      </Head>

      <Box
        component='main'
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Logo
                sx={{
                  m: 1,
                  height: 40,
                  width: 40,
                }}
              />
              <Typography variant='h5'>アカウント作成</Typography>
              <Typography color='textSecondary' sx={{ mt: 2 }} variant='body2'>
                アカウント情報を入力してください
              </Typography>
              <Typography color='textSecondary' variant='body2'>
                ※ ニックネームは省略可能
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <JWTRegister />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                mr: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <NextLink href={'/authentication/login'} passHref>
                <Link
                  color='textSecondary'
                  variant='body1'
                  underline='always'
                  sx={{ cursor: 'pointer' }}
                >
                  アカウントをお持ちの方
                </Link>
              </NextLink>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
