import React, { useState } from "react";
import { useRouter } from "next/router";
import { createTaskInput } from "../../data/index/Inputs";
import { toastError, toastSuccess } from "../../libs/Notifications";
import { inputsToState, setInputHandler } from "../../utils/helper";
import { del, edit } from "../../utils/task";
import Button from "../Forms/Buttons/Default";
import Input from "../Forms/Inputs/Default";

const TaskTable = ({ data, color, namesAndIds, completeTaskHandler }) => {
  const router = useRouter();

  // States
  const [isLoading, setLoading] = useState(false);
  const [taskInput, setTaskInput] = useState(data);
  const [isEdit, setEdit] = useState(false);
  const [dropVal, setDropVal] = useState({
    name: data.assignee,
    _id: data.employeeId,
  });

  // Handlers
  const inputHandler = (e) => setInputHandler(e, setTaskInput);
  const editHandlerMenu = (val) => {
    const body = document.querySelector("body");

    if (val == true) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "visible";
    }
    setEdit(val);
  };
  const deleteHandler = async () => {
    const res = await del(data._id);
    if (res.message) {
      toastSuccess(res.message);
      router.push(router.pathname, undefined, { scroll: false });
    }
    if (res.error) {
      toastError(res.error);
    }
  };

  const dropHandler = (value) => {
    setTaskInput((prevState) => ({
      ...prevState,
      assignee: value.name,
      _id: value._id,
    }));
    setDropVal({ name: value.name, _id: value._id });
  };
  const editHandler = async () => {
    setLoading(true);
    const sendData = {
      ...taskInput,
      _id: data._id,
      newAssigneeId: dropVal._id,
      newAssigneeName: dropVal.name,
    };
    const res = await edit(sendData);

    if (res.message) {
      toastSuccess(res.message);
      editHandlerMenu(false);
      router.push({ pathname: router.pathname }, undefined, { scroll: false });
    }
    if (res.error) {
      toastError(res.error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="px-6 py-4  bg-[#f5f8f5] flex-center h-full flex-col">
        <div className="font-semibold lg:hidden">Title</div>

        {data.title}
      </div>
      <div className="px-6 py-4 bg-[#f5f8f5]  flex-center flex-col break-all whitespace-pre-line  h-full">
        <div className="font-semibold lg:hidden">Description</div>
        {data.description}
      </div>
      <div className=" py-4  bg-[#f5f8f5] flex-center h-full flex-col">
        <div className="font-semibold lg:hidden">Due Date</div>

        {data.dueDate}
      </div>
      <div className="px-6 py-4  bg-[#f5f8f5] flex-center h-full flex-col">
        <div className="font-semibold lg:hidden">Assignee</div>

        {data.assignee}
      </div>

      {isEdit && (
        <div className="fixed h-screen w-screen  bg-[#f5f8f5] top-0 z-50 left-0 ">
          <div className="container relative flex-col min-h-screen flex-center gap-y-3 md:max-w-lg ">
            <div className="absolute top-10 right-10">
              <Button
                icon="hix"
                iconPos="left"
                className={`w-12 `}
                color={"#df6b62"}
                onClick={() => editHandlerMenu(false)}
                classNameIcon="text-xl"
              />
            </div>
            <div className="items-center w-full gap-4 px-6 md:grid">
              {createTaskInput.map((input, index) => {
                return (
                  <Input
                    {...input}
                    key={input.name}
                    onChange={inputHandler}
                    listClick={dropHandler}
                    value={taskInput[input.name]}
                    listValue={dropVal || null}
                    listHandler={dropHandler}
                    list={namesAndIds || []}
                  />
                );
              })}
            </div>
            <Button
              text="Send"
              className="w-3/4"
              color={color}
              onClick={editHandler}
            />
          </div>
        </div>
      )}
      <div className="bg-[#f5f8f5] h-full flex-center w-full flex-col gap-y-5 py-5 font-semibold">
        {!isEdit && (
          <>
            <Button
              text="Edit"
              className="w-3/4"
              color={color}
              onClick={() => editHandlerMenu(true)}
            />
            <Button
              text="Complete"
              className="w-3/4"
              color={"#028A0F"}
              onClick={() => completeTaskHandler(data._id)}
            />
            <Button
              text="Delete"
              className="w-3/4"
              color={"#FF2400"}
              onClick={() => deleteHandler(data._id)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TaskTable;
