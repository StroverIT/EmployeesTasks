import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { toastError } from "../libs/Notifications";
import { signIn, getSession } from "next-auth/react";

import { AiFillFacebook } from "react-icons/ai";
import Input from "../components/Forms/Inputs/Default";
import Button from "../components/Forms/Buttons/Default";

export default function Home() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    password: "",
    code: "",
  });

  const [isFound, setIsFound] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (errorMessages.length > 0) return;
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    //Await for data for any desirable next steps
    if (res.status != 201) {
      const data = await res.json();
      setErrorMessages([...data.map((e) => e)]);
      setLoading(false);
      return;
    }
    const status = await signIn("credentials", {
      redirect: false,
      ...inputs,
    });

    if (status.error) {
      setErrMess(status.error);
      setLoader(false);
    }
    router.replace(router.asPath);
  };

  const inputHandler = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Register page</title>
        <meta
          name="description"
          content="Your personal finance statement app"
        />
      </Head>

      <main className="container flex-col flex-center">
        <div className="p-10 bg-white rounded-md shadow-2xl">
          <div className="mb-10 text-5xl font-bold text-blue">Регистрация</div>
          {/* <ColorInput
            labelName="Име"
            name="name"
            type="text"
            isBtn={false}
            state={isFound ? "" : "wrong"}
            input={loginInputs.name}
            setInput={inputsHandler}
          /> */}
          <div className="flex flex-col gap-y-5">
            <Input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              label="Email Address"
              onChange={inputHandler}
              value={inputs.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="123456"
              label="Password"
              onChange={inputHandler}
              value={inputs.password}
            />
            <Input
              name="code"
              placeholder="32xFg2"
              label="Invitation Code"
              onChange={inputHandler}
              value={inputs.code}
            />
            <Button
              text="Регистрирай ме"
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
    </>
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
