import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createEmployeeInputs } from "../../data/index/Inputs";
import { toastError, toastSuccess } from "../../libs/Notifications";
import { del, edit } from "../../utils/employee";
import {
  formatCurrency,
  inputsToState,
  setInputHandler,
} from "../../utils/helper";
import { getCompletedAndNon } from "../../utils/task";
import Button from "../Forms/Buttons/Default";
import Input from "../Forms/Inputs/Default";

const Employee = ({ data, type, isFullData }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState({
    completed: 0,
    total: 0,
  });
  const [isEdit, setEdit] = useState(false);
  const [employeeInputs, setEmployeeInputs] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const inputHandler = (e) => setInputHandler(e, setEmployeeInputs);

  // ------ DELETE -------
  const deleteHandler = async () => {
    setLoading(true);
    const res = await del(data._id);
    if (res.message) {
      toastSuccess(res.message);
    }
    if (res.error) {
      toastError(res.error);
    }
    setLoading(false);
    router.push("/", undefined, { scroll: false });
  };

  // ------ Edit -------
  const editHandler = async () => {
    setEditLoading(true);
    const res = await edit(employeeInputs, data._id);
    if (res.message) {
      toastSuccess(res.message);
      setEdit(false);
      console.log(router.pathname);
      router.push(router.pathname, undefined, { scroll: false });
    }
    if (res.error) {
      toastError(res.error);
    }
    setEditLoading(false);
  };

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
    onClick = function () {
      setEdit(true);
    };
  }

  useEffect(() => {
    (async function () {
      const res = await getCompletedAndNon(data._id);
      setTasks(res.data);
    })();
  }, [data]);
  return (
    <section
      className={`box-shadow border-[3px]  rounded-[1.3rem] px-10 pt-10 pb-8  w-full relative`}
      style={{
        borderColor: data.color,
        color: data.color,
      }}
    >
      <section className={` flex justify-between items-center w-full `}>
        {!isEdit && (
          <div className="text-lg font-bold md:text-2xl">{data.fullName}</div>
        )}
        <div>
          {isEdit && (
            <Input
              {...createEmployeeInputs[0]}
              onChange={inputHandler}
              value={employeeInputs[createEmployeeInputs[0].name]}
              isLabel={false}
            />
          )}
        </div>
        <div className="text-xl font-medium">
          {tasks.completed} / {tasks.total} Tasks
        </div>
      </section>

      {/* Range */}
      <div className="w-full h-4 my-8 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-4 rounded-full dark:bg-red-500"
          style={{
            width: range + "%",
            backgroundColor: data.color,
          }}
        ></div>
      </div>
      <section className="flex flex-col gap-y-2">
        <section className="flex items-center justify-between w-full text-sm">
          <div>Email</div>
          {!isEdit && <div className="pl-1 text-slate-500"> {data.email}</div>}
          {isEdit && (
            <Input
              {...createEmployeeInputs[1]}
              onChange={inputHandler}
              value={employeeInputs[createEmployeeInputs[1].name]}
              isLabel={false}
            />
          )}
        </section>
        {isFullData && (
          <>
            <section className="flex items-center justify-between w-full text-sm">
              <div>Phone Number</div>
              {!isEdit && (
                <div className="pl-1 text-slate-500"> {data.phoneNumber}</div>
              )}
              {isEdit && (
                <Input
                  {...createEmployeeInputs[2]}
                  onChange={inputHandler}
                  value={employeeInputs[createEmployeeInputs[2].name]}
                  isLabel={false}
                />
              )}
            </section>
            <section className="flex items-center justify-between w-full text-sm">
              <div>Birthday</div>
              {!isEdit && (
                <div className="pl-1 text-slate-500"> {data.birthday}</div>
              )}
              {isEdit && (
                <Input
                  {...createEmployeeInputs[3]}
                  onChange={inputHandler}
                  value={employeeInputs[createEmployeeInputs[3].name]}
                  isLabel={false}
                />
              )}
            </section>
            <section className="flex items-center justify-between w-full text-sm">
              <div>Month Salary</div>
              {!isEdit && (
                <div className="pl-1 text-slate-500">
                  {formatCurrency(data.monthSalary)}
                </div>
              )}
              {isEdit && (
                <Input
                  {...createEmployeeInputs[4]}
                  onChange={inputHandler}
                  value={employeeInputs[createEmployeeInputs[4].name]}
                  isLabel={false}
                />
              )}
            </section>
          </>
        )}
      </section>
      {!isEdit && (
        <div className="w-full flex-center mt-7">
          <Button
            text={text}
            className={`w-44 `}
            color={data.color}
            onClick={onClick}
          />
        </div>
      )}
      {isEdit && (
        <div className="w-full flex-center mt-7">
          <Button
            text="Send"
            className={`w-44 `}
            color={data.color}
            onClick={editHandler}
            isLoading={editLoading}
          />
        </div>
      )}
      <div className="absolute -top-2 -right-2">
        <Button
          icon="trash"
          iconPos="left"
          className={`w-12 `}
          color={"#df6b62"}
          onClick={deleteHandler}
          isLoading={isLoading}
          classNameIcon="text-xl"
        />
      </div>
    </section>
  );
};

export default Employee;
// ${generateRandomColor(
//   1
// )}
