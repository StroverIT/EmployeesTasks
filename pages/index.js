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

export default function Home({ totalEmployeeLength, namesAndIds, employees }) {
  return (
    <>
      <Head>
        <title>Main page</title>
        <meta name="description" content="Empowering Employee Productivity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*  */}
      <div className="hidden col-span-2"></div>
      <main className="container ">
        <h1 className="text-xl font-semibold md:text-6xl">
          Welcome to TaskHub
        </h1>
        <p className="text-lg font-light md:text-4xl">
          Empowering Employee Productivity
        </p>

        {/* Creating a employee */}
        <section className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2">
          <CreateEmployee />
          {/* {totalEmployeeLength > 0 && <CreateTask namesAndIds={namesAndIds} />}
          {totalEmployeeLength > 0 && (
            <TopFiveForMonth namesAndIds={namesAndIds} />
          )} */}
          {/* {totalEmployeeLength > 0 && <StatisticForTheYear />} */}
          {/* Emloyee view details */}
          {/* {totalEmployeeLength > 0 && employees && (
            <section className="md:col-span-2">
              <h3 className="mb-10 text-2xl font-semibold md:text-4xl">
                Employees
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {employees.map((employee) => {
                  return (
                    <Employee key={employee._id} data={employee} type="view" />
                  );
                })}
              </div>
            </section>
          )} */}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  await connectMongo();
  const totalEmployeeLength = await EmployeeDb.count();
  const employees = await EmployeeDb.find({});

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
