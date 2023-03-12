import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helper";
import { getCompletedAndNon } from "../../utils/task";
import Button from "../Forms/Buttons/Default";

const Employee = ({ data, type, isFullData }) => {
  const router = useRouter();

  const [tasks, setTasks] = useState({
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    (async function () {
      const res = await getCompletedAndNon(data._id);
      setTasks(res.data);
    })();
  }, [data]);

  let range, onClick, text;

  if (tasks.completed == 0) {
    range = 0;
  } else {
    range = (tasks.completed / tasks.total) * 100;
  }

  if (type == "view") {
    text = "View Details";
    onClick = function () {
      return router.push(`/account/${data._id.toString()}`);
    };
  } else if (type == "edit") {
    text = "Edit Account";
  }
  return (
    <section
      className={`box-shadow border-[3px]  rounded-[1.3rem] px-10 py-6  w-full`}
      style={{
        borderColor: data.color,
        color: data.color,
      }}
    >
      <section className={` flex justify-between items-center w-full `}>
        <div className="font-bold text-2xl">{data.fullName}</div>
        <div className="text-xl font-medium">
          {tasks.completed} / {tasks.total} Tasks
        </div>
      </section>

      {/* Range */}
      <div className="w-full bg-gray-200 rounded-full h-4 my-8 dark:bg-gray-700">
        <div
          className=" h-4 rounded-full dark:bg-red-500"
          style={{
            width: range + "%",
            backgroundColor: data.color,
          }}
        ></div>
      </div>
      <section className="flex flex-col gap-y-2">
        <section className="flex justify-between items-center w-full text-sm">
          <div>Email</div>
          <div className="pl-1 text-slate-500"> {data.email}</div>
        </section>
        {isFullData && (
          <>
            <section className="flex justify-between items-center w-full text-sm">
              <div>Phone Number</div>
              <div className="pl-1 text-slate-500"> {data.phoneNumber}</div>
            </section>
            <section className="flex justify-between items-center w-full text-sm">
              <div>Birthday</div>
              <div className="pl-1 text-slate-500"> {data.birthday}</div>
            </section>
            <section className="flex justify-between items-center w-full text-sm">
              <div>Month Salary</div>
              <div className="pl-1 text-slate-500">
                {formatCurrency(data.monthSalary)}
              </div>
            </section>
          </>
        )}
      </section>
      <div className="flex-center w-full mt-7">
        <Button
          text={text}
          className={`w-44 `}
          color={data.color}
          onClick={onClick}
        />
      </div>
    </section>
  );
};

export default Employee;
// ${generateRandomColor(
//   1
// )}
