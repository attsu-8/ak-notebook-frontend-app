import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from '../components/authentication/auth-guard';
import { MainLayout } from '../components/layouts/main-layout';
import {ReactNode} from 'react';
import { Box, Container } from '@mui/material';
import { OverviewTodayLearningEfficiency } from '../components/home/overview/overview-today-learning-efficiency';
import { OverviewThreeMonthAverageLearningEfficiency } from '../components/home/overview/overview-three-month-average-learning-efficiency';
import { EachNoteLearningEfficiencyRate, } from '../components/home/each-note-learning-efficiency-rate';
import { EachParentMemoCategoryLearningEfficiencyRate } from '../components/home/each-parent-memo-category-learning-efficiency';
import { EachMemoLearningEfficiency } from '../components/home/each-memo-learning-efficiency';
import { selectIsInitialized } from '../slices/authentication/authSlice';
import { useSelector } from 'react-redux';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const Home: Page = () => {
  const isInitialized = useSelector(selectIsInitialized);

  return (
    <>
      <Head>
        <title>
          ak-notebook: Home
        </title>
      </Head>

      {isInitialized
        &&
          <Container
            component="main" 
            maxWidth="xl"
            sx={{
              my:2,
              position: 'relative',
              height: '100%',
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: "50%",
                pr: 2,
              }}
            >
              <Box
                sx={{
                  pr:1,
                  width: "50%"
                }}
              >
                <OverviewTodayLearningEfficiency />
              </Box>

              <Box
                sx={{
                  pl:1, 
                  width: "50%"
                }}
              >
                <OverviewThreeMonthAverageLearningEfficiency />
              </Box>            
            </Box>

            <Box
              sx={{
                my:2,
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  mr:2,
                  width: "50%",
                  display: "flex",
                  alignItems: "stretch", 
                }}
              >
                <EachNoteLearningEfficiencyRate />
              </Box>
              <Box
                sx={{
                  mr:2,
                  width: "50%",
                  display: "flex",
                  alignItems: "stretch", 
                }}
              >
                <EachParentMemoCategoryLearningEfficiencyRate />
              </Box>
            </Box>
            
            <Box
              sx={{
                my:2,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  mr:2,
                  width: "100%",
                }}
              >
                <EachMemoLearningEfficiency />
              </Box>
            </Box>

          </Container>
      }
    </>
  )
}

Home.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>
      {page}
    </MainLayout>
  </AuthGuard>
);

export default Home;

