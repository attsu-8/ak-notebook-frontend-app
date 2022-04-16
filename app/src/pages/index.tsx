import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from '../components/authentication/auth-guard';
import { MainLayout } from '../components/layouts/main-layout';
import {ReactNode} from 'react';
import { Container, Grid } from '@mui/material';
import { OverviewTodayLearningEfficiency } from '../components/home/overview/overview-today-learning-efficiency';
import { OverviewThreeMonthAverageLearningEfficiency } from '../components/home/overview/overview-three-month-average-learning-efficiency';
import { EachNoteLearningEfficiencyRate, } from '../components/home/each-note-learning-efficiency-rate';
import { EachParentMemoCategoryLearningEfficiencyRate } from '../components/home/each-parent-memo-category-learning-efficiency';
import { EachMemoLearningEfficiency } from '../components/home/each-memo-learning-efficiency';
import { selectIsInitialized } from '../slices/authentication/authSlice';
import { useSelector } from 'react-redux';
import { selectTodayLearningEfficiencyRate } from '../slices/home/learningEfficiencySlice';
import { NoDataCard } from '../components/home/no-data-card';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const Home: Page = () => {
  const isInitialized = useSelector(selectIsInitialized);
  const todayLearningEfficiencyRate = useSelector(selectTodayLearningEfficiencyRate)


  return (
    <>
      <Head>
        <title>
          ak-notebook: Home
        </title>
      </Head>

      {isInitialized
        &&
          todayLearningEfficiencyRate !== 0
            ?
              <Container
                component="main" 
                maxWidth="xl"
                sx={{
                    my:2,
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden'
                  }}
              >
                <Grid
                  container
                  spacing={2}
                >
                    <Grid
                      item
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                        <OverviewTodayLearningEfficiency />
                    </Grid>

                    <Grid
                      item
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                        <OverviewThreeMonthAverageLearningEfficiency />
                    </Grid>
                    
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{
                    mt:1
                  }}
                >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                        <EachNoteLearningEfficiencyRate />
                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                      <EachParentMemoCategoryLearningEfficiencyRate />
                    </Grid>
                </Grid>
                
                <Grid
                  container
                  spacing={2}
                  sx={{
                    mt:2
                  }}
                >
                  <Grid
                      item
                      xs={12}
                  >
                    <EachMemoLearningEfficiency />
                  </Grid>
                </Grid>
              </Container>
            :
              <Container
                sx={{
                  m:2
                }}
              >
                <NoDataCard />
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

