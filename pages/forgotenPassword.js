import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { toastError, toastSuccess } from "../libs/Notifications";
import { signIn, getSession } from "next-auth/react";
import Input from "../components/Forms/Inputs/Default";
import Button from "../components/Forms/Buttons/Default";

export default function Home() {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoader] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setLoader(true);

    const res = await fetch("/api/auth/forgotenPassword", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
      }),
    });
    const resData = await res.json();
    if (resData.error) {
      toastError(resData.error);
    }
    if (resData.message) {
      toastSuccess(resData.message);
    }
    setLoader(false);
  }

  return (
    <div>
      <Head>
        <title>Forgoten password</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex-col flex-center ">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">
            Забравена парола
          </div>

          <div className="flex flex-col gap-y-5">
            <Input
              type="email"
              placeholder="example@gmail.com"
              label="Email"
              onChange={(e) => setEmailInput(e.target.value)}
              value={emailInput}
            />
            <Button
              text="Изпрати"
              className="w-full col-span-1 row-start-4 max-lg:mt-5"
              isLoading={isLoading}
              onClick={submitHandler}
            />
          </div>
          <div
            className="mt-10 underline cursor-pointer"
            onClick={() => router.push("/")}
          >
            Вход
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession({ req: context.req });
  const isError = session?.user?.email;
  if (session && !isError?.includes("error")) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  if (isError) {
    query.error = isError;
  }
  return {
    props: { session, query },
  };
}
