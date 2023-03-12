import Head from "next/head";

// Components
import CreateEmployee from "../components/indexComp/CreateEmployee";
import CreateTask from "../components/indexComp/CreateTask";
import TopFiveForMonth from "../components/indexComp/TopFiveForMonth";
import StatisticForTheYear from "../components/indexComp/StatisticForTheYear";
import Employee from "../components/indexComp/Employee";

// Mongodb
import { connectMongo } from "../db/connectDb";
import { default as EmployeeDb } from "../db/models/Employee";
import { namesAndTasks } from "../utils/task";

export default function Home({ totalEmployeeLength, namesAndIds, employees }) {
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
        <section className="grid gap-10 mt-16 grid-cols-1 md:grid-cols-2">
          <CreateEmployee />
          {totalEmployeeLength > 0 && <CreateTask namesAndIds={namesAndIds} />}
          {totalEmployeeLength > 0 && (
            <TopFiveForMonth namesAndIds={namesAndIds} />
          )}
          {totalEmployeeLength > 0 && <StatisticForTheYear />}
          {/* Emloyee view details */}
          {totalEmployeeLength > 0 && (
            <section className="md:col-span-2">
              <h3 className="mb-10 text-4xl font-semibold">Employees</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {employees.map((employee) => {
                  return (
                    <Employee key={employee._id} data={employee} type="view" />
                  );
                })}
              </div>
            </section>
          )}
          {/* <section>
            <h3 className="mb-10 text-4xl font-semibold">All tasks</h3>
            <Task />
          </section> */}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  await connectMongo();
  const totalEmployeeLength = await EmployeeDb.count();
  const employees = await EmployeeDb.find({});
  // const nameAndTasks = await namesAndTasks();

  const namesAndIds = employees.map((employee) => {
    return { name: employee.fullName, _id: employee._id };
  });
  return {
    props: {
      totalEmployeeLength,
      namesAndIds: JSON.parse(JSON.stringify(namesAndIds)),
      employees: JSON.parse(JSON.stringify(employees)),
    },
  };
}
