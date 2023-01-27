import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { getServerCookies } from "@/lib/getServerCookies";
import { useForm } from "react-hook-form";

import { useTokens } from "@/stores/useTokens";

import { useLoginMutation } from "@/features/auth/useLoginMutation";
import { handleApiError } from "@/utils/handleApiErrors";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PrimaryLayout } from "@/layouts/PrimaryLayout";

import { LoginData } from "@/types/auth";
import { Page } from "@/types/page";

const SigninPage: Page = () => {
  const router = useRouter();

  const loginMutation = useLoginMutation();

  const { setTokens } = useTokens();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setTokens(data);
        router.push("/");
      },
      onError: (error) => {
        handleApiError(error, setError);
      },
    });
  });

  return (
    <div className="w-full flex justify-center px-2">
      <Head>
        <title>Войти</title>
      </Head>

      <Panel
        className="w-full md:w-[450px] flex flex-col items-center"
        size="large"
      >
        <h1 className="text-2xl text-center mb-6">Войти</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full md:w-2/3 gap-8"
        >
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              error={!!errors.email}
              message={errors.email?.message}
              {...register("email", { required: "Обязательное поле" })}
            />
            <Input
              type="password"
              label="Пароль"
              error={!!errors.password}
              message={errors.password?.message}
              {...register("password", {
                required: "Обязательное поле",
                minLength: {
                  value: 6,
                  message: "Минимальная длина пароля 6 символов",
                },
              })}
            />
          </div>
          <Button type="submit" size="large">
            Продолжить
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = getServerCookies(ctx);

  if (accessToken || refreshToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

SigninPage.getLayout = (page) => (
  <PrimaryLayout>
    <AuthLayout>{page}</AuthLayout>
  </PrimaryLayout>
);

export default SigninPage;
