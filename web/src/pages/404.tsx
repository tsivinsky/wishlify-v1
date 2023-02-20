import Head from "next/head";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { Page } from "@/types/page";

const NotFoundPage: Page = () => {
  return (
    <div className="w-full min-h-screen-without-header grid place-items-center">
      <Head>
        <title>Страница не найдена</title>
      </Head>

      <div className="flex flex-col items-center">
        <h1 className="text-[300px]">404</h1>
        <Link href="/">
          <Button size="large">Домой</Button>
        </Link>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = (page) => (
  <PrimaryLayout headerProps={{ withUserMenu: false }}>{page}</PrimaryLayout>
);

export default NotFoundPage;
