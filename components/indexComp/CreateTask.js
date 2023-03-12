import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import Button from "../Forms/Buttons/Default";
import Create from "../Forms/Create/Create";
import Input from "../Forms/Inputs/Default";

// Data
import { createTaskInput } from "../../data/index/Inputs";

// Helpers
import { inputsToState, setInputHandler } from "../../utils/helper";

// API
import { create } from "../../utils/task";
import { toastError, toastSuccess } from "../../libs/Notifications";

const CreateTask = ({ namesAndIds }) => {
  const router = useRouter();
  // States
  const [taskInput, setTaskInput] = useState(inputsToState(createTaskInput));
  const [isLoading, setLoading] = useState(false);
  const [dropVal, setDropVal] = useState(
    createTaskInput.filter((data) => {
      if (data.listValue) return true;
    })[0]
  );

  // Client Handlers
  const inputHandler = (e) => setInputHandler(e, setTaskInput);

  const dropHandler = (value) => {
    setTaskInput((prevState) => ({
      ...prevState,
      assignee: value.name,
      _id: value._id,
    }));
    setDropVal({ name: value.name, _id: value._id });
  };
  // API handlers
  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await create({ ...taskInput });
    if (res.message) {
      toastSuccess(res.message);
      setTaskInput(inputsToState(createTaskInput));
      router.push({ pathname: router.asPath }, undefined, { scroll: false });
    }
    if (res.error) {
      toastError(res.error);
    }
    setLoading(false);
  };
  return (
    // Form
    <div>
      <Create
        title="Add New Task"
        className="lg:grid lg:grid-cols-2 gap-x-10 gap-y-3"
        onSubmit={createHandler}
      >
        {/* This is a bad practice new index !!! */}
        {createTaskInput.map((input, index) => {
          return (
            <Input
              {...input}
              key={index}
              onChange={inputHandler}
              listClick={dropHandler}
              value={taskInput[input.name]}
              listValue={dropVal || null}
              listHandler={dropHandler}
              list={namesAndIds || []}
            />
          );
        })}
        <Button
          text="Add task"
          className="col-span-1 row-start-4  w-full max-lg:mt-5"
          type="submit"
          isLoading={isLoading}
        />
      </Create>
    </div>
  );
};

export default CreateTask;
