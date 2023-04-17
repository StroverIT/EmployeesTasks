import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { toastError } from "../libs/Notifications";
import { signIn, getSession } from "next-auth/react";

import Input from "../components/Forms/Inputs/Default";
import Button from "../components/Forms/Buttons/Default";

const namesAndIds = [
  { name: "Employee", _id: 0 },
  { name: "Boss", _id: 1 },
];

export default function Home() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    // name: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    code: "",
  });
  const [dropVal, setDropVal] = useState(namesAndIds[0]);
  const dropHandler = (value) => {
    setDropVal({ name: value.name, _id: value._id });
  };
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
      body: JSON.stringify({ ...inputs, ...dropVal }),
    });

    const data = await res.json();

    if (data.message) {
      console.log("vliza");
      await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
      });

      router.replace(router.asPath);
      return;
    }
    console.log(data);
    //Await for data for any desirable next steps
    if (data.error) {
      toastError(data.error);
      setLoading(false);
      return;
    }
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
          <div className="mb-4 text-5xl font-bold text-blue">Регистрация</div>
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
              name="role"
              type="dropdown"
              label="."
              onChange={dropHandler}
              listHandler={dropHandler}
              listValue={dropVal || null}
              list={namesAndIds || []}
            />
            <div className="grid items-center gap-5 md:grid-cols-2">
              <Input
                name="fullName"
                placeholder="Ivan Petrov"
                label="Full Name"
                onChange={inputHandler}
                value={inputs.fullName}
              />
              <Input
                name="phoneNumber"
                placeholder="0870129429"
                label="Phone Number"
                onChange={inputHandler}
                value={inputs.phoneNumber}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
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
            </div>
            {dropVal.name == "Employee" && (
              <Input
                name="code"
                placeholder="32xFg2"
                label="Invitation Code"
                onChange={inputHandler}
                value={inputs.code}
              />
            )}

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
  console.log(session);
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
