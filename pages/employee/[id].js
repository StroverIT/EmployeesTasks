import Head from "next/head";
import React from "react";
import Button from "../../components/Forms/Buttons/Default";
import Create from "../../components/Forms/Create/Create";
import Input from "../../components/Forms/Inputs/Default";
import Employee from "../../components/indexComp/Employee";
import Table from "../../data/employee/Table";
import { createTaskInput } from "../../data/index/Inputs";
import { generateRandomColor } from "../../utils/helper";
const Id = () => {
  const name = "Emil Zlatinov";
  const data = [
    {
      title: "Test",
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa at vel laudantium sed inventore, natus qui maiores. Nam et, necessitatibus iure, fuga possimus, sunt totam nisi iusto accusantium alias harum?`,
      dueDate: "12/02/2023",
      _id: 123,
    },
    {
      title: "Testsavasdasasdadw",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita suscipit iure quos mollitia aut molestiae. Nihil atque ullam deleniti vel illum qui voluptas, reiciendis magnam accusamus vitae! Temporibus, tempore laudantium!
      Dignissimos vitae sit consectetur magni voluptatibus corrupti ullam nulla veritatis dolore necessitatibus facilis error, facere provident. Saepe consequatur quibusdam facilis quam. Laborum, rem possimus? Debitis, ducimus doloribus! Et, quae quaerat.`,
      dueDate: "12/02/2023",
      _id: 1234,
    },
  ];
  const color = generateRandomColor(1);

  return (
    <>
      <Head>
        <title>View page on {name}</title>
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
            color={color}
            isBg={false}
            className="px-3"
            classNameText="pl-1 font-bold"
            classNameIcon="text-2xl"
          />
        </div>
        <h1 className="text-5xl font-semibold">
          <span style={{ color }}>{name} </span>Overview
        </h1>
        <section className="mt-10 grid grid-cols-2 gap-x-10">
          <div>
            <Employee color={color} type="delete" />
          </div>
          <div>
            <Create
              title="Add New Task"
              className="grid grid-cols-2 gap-x-10 gap-y-3"
            >
              {createTaskInput.map((input) => {
                return <Input {...input} key={input._id} />;
              })}
              <Button text="Add task" className="col-span-1 row-start-4" />
            </Create>
          </div>
        </section>
        <section className="mt-10">
          <h1 className="text-5xl font-semibold">
            <span style={{ color }}>{name} </span>Tasks
          </h1>

          <Table data={data} color={color} />
        </section>
      </main>
    </>
  );
};

export default Id;
