import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { getServerCookies } from "@/lib/getServerCookies";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { useUserQuery } from "@/features/user/useUserQuery";
import { useCreateWishlistMutation } from "@/features/wishlists/useCreateWishlistMutation";
import { getQueryParam } from "@/utils/getQueryParam";
import { handleApiError } from "@/utils/handleApiErrors";
import { makeServerRequest } from "@/utils/makeServerRequest";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { Page } from "@/types/page";
import { CreateWishlistData } from "@/types/wishlists";

type NewWishlistPageProps = {
  initialName: string | undefined;
};

const NewWishlistPage: Page<NewWishlistPageProps> = ({ initialName }) => {
  const router = useRouter();

  const { user } = useUserQuery();

  const createWishlistMutation = useCreateWishlistMutation();

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors },
  } = useForm<CreateWishlistData>({
    defaultValues: {
      name: initialName,
      private: false,
    },
  });

  const onSubmit = handleSubmit((data) => {
    createWishlistMutation.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        handleApiError(error, setError);
      },
    });
  });

  return (
    <div>
      <Head>
        <title>Создать новый вишлист</title>
      </Head>

      <h1 className="text-2xl font-medium mb-4">Создать новый вишлист</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-2">
          <Input value={user?.username} disabled label="Владелец" />
          <span className="text-3xl font-light mt-5">/</span>
          <Input
            type="text"
            label="Название"
            error={!!errors.name}
            {...register("name", { required: "Обязательное поле" })}
          />
        </div>
        <Controller
          control={control}
          name="private"
          render={({ field }) => (
            <Checkbox
              ref={field.ref}
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="Сделать закрытым"
              labelPosition="right"
              error={!!errors.private}
            />
          )}
        />
        <Button type="submit" loading={createWishlistMutation.isLoading}>
          Создать
        </Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = getServerCookies(ctx);

  if (!accessToken || !refreshToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const name = getQueryParam(ctx.query, "name");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["user"], () =>
    makeServerRequest("/api/user", accessToken)
  );

  return {
    props: {
      accessToken,
      refreshToken,
      initialName: name,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

NewWishlistPage.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;

export default NewWishlistPage;
