import React from "react";

// styles
import style from "./create.module.css";

const Create = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${style.form_wrapper}  p-11 bg-white shadow-xl  rounded-[1.3rem] relative border-2 border-white `}
    >
      <div className="relative z-10">{children}</div>
    </form>
  );
};

export default Create;
