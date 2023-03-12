import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";

// Components
import Button from "../../../components/Forms/Buttons/Default";
import Create from "../../../components/Forms/Create/Create";
import Input from "../../../components/Forms/Inputs/Default";
import Employee from "../../../components/indexComp/Employee";
import Table from "../../../components/Account/Table";

// Helpers
import { inputsToState, setInputHandler } from "../../../utils/helper";

// Data
import { createTaskInput } from "../../../data/index/Inputs";

// API
import { completeTask, create } from "../../../utils/task";

// DB
import { connectMongo } from "../../../db/connectDb";
import { default as EmployeeDb } from "../../../db/models/Employee";
import { ObjectId } from "mongodb";

// Notifications
import { toastError, toastSuccess } from "../../../libs/Notifications";

const EmployeeAccount = ({ data, namesAndIds }) => {
  const router = useRouter();

  const [taskInput, setTaskInput] = useState(inputsToState(createTaskInput));
  const [taskLoading, setTaskLoading] = useState(false);

  const [dropVal, setDropVal] = useState({
    name: data.fullName,
    _id: data._id,
  });

  const inputHandler = (e) => setInputHandler(e, setTaskInput);

  const createHandler = async (e) => {
    e.preventDefault();
    setTaskLoading(true);
    const data = {
      ...taskInput,
      assignee: dropVal.name,
      _id: dropVal._id,
    };
    const res = await create(data);

    if (res.message) {
      toastSuccess(res.message);

      setTaskInput(inputsToState(createTaskInput));
    }
    if (res.error) {
      toastError(res.error);
    }

    router.push({ pathname: router.asPath }, { scroll: false });
    setTaskLoading(false);
  };
  const completeTaskHandler = async (taskId) => {
    const sendData = { taskId, employeeId: data._id };
    const res = await completeTask(sendData);

    if (res.message) {
      toastSuccess(res.message);
    }
    if (res.error) {
      toastError(res.error);
    }
    router.push({ pathname: router.pathname }, undefined, { scroll: false });
  };

  return (
    <>
      <Head>
        <title>Account page</title>
        <meta name="description" content="Empowering Employee Productivity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="mb-10">
          <Button
            type="icon"
            icon="giReturn"
            iconPos="left"
            text="Home page"
            color={data.color}
            isBg={false}
            onClick={() => router.push("/")}
            className="px-3"
            classNameText="pl-1 font-bold"
            classNameIcon="text-2xl"
          />
        </div>
        <h1 className="text-2xl font-semibold md:text-5xl">
          <span style={{ color: data.color }} className="pr-2">
            {data.fullName}
          </span>
          Overview
        </h1>
        <section className="mt-10 lg:grid lg:grid-cols-2 gap-x-10">
          <div>
            <Employee data={data} type="edit" isFullData={true} />
          </div>
          <div className="max-lg:mt-10">
            <Create
              title="Add New Task"
              className="grid-cols-2 lg:grid gap-x-10 gap-y-3"
              onSubmit={createHandler}
            >
              {createTaskInput.map((input) => {
                return (
                  <Input
                    {...input}
                    key={input._id}
                    onChange={inputHandler}
                    value={taskInput[input.name]}
                    listValue={dropVal || null}
                    color={data.color}
                    listNameOnly={true}
                  />
                );
              })}
              <Button
                text="Add task"
                className="w-full col-span-1 row-start-4 max-lg:mt-5"
                isLoading={taskLoading}
                type="submit"
              />
            </Create>
          </div>
        </section>
        <section className="mt-10">
          <h1 className="text-2xl font-semibold md:text-5xl">
            <span style={{ color: data.color }}>{data.fullName} </span>
            Tasks
          </h1>

          {data.tasks.filter((task) => !task.isCompleted).length > 0 && (
            <Table
              data={data.tasks.filter((task) => !task.isCompleted)}
              color={data.color}
              namesAndIds={namesAndIds}
              completeTaskHandler={completeTaskHandler}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default EmployeeAccount;

export async function getServerSideProps(context) {
  await connectMongo();

  const { id } = context.params;
  const data = await EmployeeDb.findOne({ _id: new ObjectId(id) }).populate(
    "tasks"
  );
  const employees = await EmployeeDb.find({});

  const namesAndIds = employees.map((employee) => {
    return { name: employee.fullName, _id: employee._id };
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      namesAndIds: JSON.parse(JSON.stringify(namesAndIds)),
    },
  };
}
