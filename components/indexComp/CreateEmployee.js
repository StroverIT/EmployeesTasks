import React, { useState } from "react";
import { useRouter } from "next/router";

// Components
import Button from "../Forms/Buttons/Default";
import Create from "../Forms/Create/Create";
import Input from "../Forms/Inputs/Default";

// Data
import { createEmployeeInputs } from "../../data/index/Inputs";

// Helpers
import { inputsToState, setInputHandler } from "../../utils/helper";

// Api
import { create } from "../../utils/employee";
import { toastError, toastSuccess } from "../../libs/Notifications";

const CreateEmployee = () => {
  const router = useRouter();
  const [employeeInputs, setEmployeeInputs] = useState(
    inputsToState(createEmployeeInputs)
  );
  const [isLoading, setLoading] = useState(false);

  const inputHandler = (e) => setInputHandler(e, setEmployeeInputs);

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await create(employeeInputs);
    if (res.message) {
      toastSuccess(res.message);
      setEmployeeInputs(inputsToState(createEmployeeInputs));
      router.push({ pathname: router.asPath }, undefined, { scroll: false });
    }
    if (res.error) {
      toastError(res.error);
    }
    setLoading(false);
  };
  return (
    <div>
      <Create
        title="Create employee"
        className="lg:grid  lg:grid-cols-2 gap-x-10 gap-y-3"
        onSubmit={createHandler}
      >
        {createEmployeeInputs.map((input) => {
          return (
            <Input
              {...input}
              key={input._id}
              className="max-lg:my-4"
              onChange={inputHandler}
              value={employeeInputs[input.name]}
            />
          );
        })}
        <Button
          text="Create employee"
          className="col-start-1 mt-5 w-full"
          type="submit"
          isLoading={isLoading}
        />
      </Create>
    </div>
  );
};

export default CreateEmployee;
