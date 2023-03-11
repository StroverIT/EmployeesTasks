import Head from "next/head";
import Create from "../components/Forms/Create/Create";
import Input from "../components/Forms/Inputs/Default";
import Amount from "../components/Forms/Inputs/Default";
import styles from "../styles/Home.module.css";

import { createEmployeeInputs, createTaskInput } from "../data/index/Inputs";
import Button from "../components/Forms/Buttons/Default";
import TopFiveForMonth from "../components/indexComp/TopFiveForMonth";
import StatisticForTheYear from "../components/indexComp/StatisticForTheYear";
import Employee from "../components/indexComp/Employee";
import { generateRandomColor } from "../utils/helper";
import Task from "../components/indexComp/Task";

export default function Home() {
  const color = generateRandomColor(1);
  const createEmployeeHandler = (data) => {};
  return (
    <>
      <Head>
        <title>Main page</title>
        <meta name="description" content="Empowering Employee Productivity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container ">
        <h1 className="text-6xl font-semibold">Welcome to TaskHub</h1>
        <p className="text-4xl font-light">Empowering Employee Productivity</p>

        {/* Creating a employee */}
        <section className="grid gap-10 mt-16 md:grid-cols-2">
          <Create
            title="Create employee"
            className="grid grid-cols-2 gap-x-10 gap-y-3"
          >
            {createEmployeeInputs.map((input) => {
              return <Input {...input} key={input._id} />;
            })}
            <Button text="Create employee" className="col-start-1" />
          </Create>
          <Create
            title="Add New Task"
            className="grid grid-cols-2 gap-x-10 gap-y-3"
          >
            {createTaskInput.map((input) => {
              return <Input {...input} key={input._id} />;
            })}
            <Button text="Add task" className="col-span-1 row-start-4" />
          </Create>
          <TopFiveForMonth />
          <StatisticForTheYear />
          {/* Emloyee view details */}
          <section className="col-span-2">
            <h3 className="mb-10 text-4xl font-semibold">Employees</h3>
            <div className="grid grid-cols-3 gap-x-8">
              <Employee color={color} type="view" />
              <Employee color={color} />
              <Employee color={color} />
            </div>
          </section>
          {/* <section>
            <h3 className="mb-10 text-4xl font-semibold">All tasks</h3>
            <Task />
          </section> */}
        </section>
      </main>
    </>
  );
}
