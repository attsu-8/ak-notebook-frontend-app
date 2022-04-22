import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { MainLayout } from '../../components/layouts/main-layout';
import { ReactNode } from 'react';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const Output: Page = () => {
  return (
    <>
      <Head>
        <title>ak-notebook</title>
      </Head>
      <h1>Output page</h1>
    </>
  );
};

Output.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>{page}</MainLayout>
  </AuthGuard>
);

export default Output;
