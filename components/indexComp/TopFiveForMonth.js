import React, { useEffect, useState } from "react";
// Components
import TopFiveEmployee from "./TopFiveEmployee";

// API
import { topFiveTasksMonthly } from "../../utils/task";

const TopFiveForMonth = () => {
  const [employeesAndTasks, setEmployeesAndTasks] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await topFiveTasksMonthly();
      setEmployeesAndTasks(res.data);
    })();
  }, []);
  return (
    <section>
      <h3 className="mb-10 text-2xl font-semibold md:text-4xl">
        Top 5 employees for the month
      </h3>

      <section className="box-shadow border-[3px] border-blue-300 rounded-[1.3rem] px-10 py-6 grid grid-cols-2 justify-between items-center">
        <section className="mb-5 text-center">
          <div className="inline-block font-medium md:text-xl ">
            Employee Name
            <div className="w-full h-[2px] bg-blue-600"></div>
          </div>
        </section>
        <section className="mb-5 text-center">
          <div className="inline-block font-medium md:text-xl">
            Completed Tasks
            <div className="w-full h-[2px] bg-blue-600 "></div>
          </div>
        </section>

        {/* This must be filtered from most completed tasks emoployee */}

        {employeesAndTasks.map((data) => {
          return <TopFiveEmployee key={data._id} data={data} />;
        })}
      </section>
    </section>
  );
};

export default TopFiveForMonth;
