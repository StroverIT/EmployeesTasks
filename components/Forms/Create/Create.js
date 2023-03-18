import React, { useState } from "react";

// styles
import style from "./create.module.css";

const Create = ({ className, onSubmit, children, title }) => {
  return (
    <div
      className={`${style.form_wrapper} box-shadow  p-10 bg-white   rounded-[1.3rem] relative border-2 border-white `}
    >
      <h2 className="pb-3 text-xl font-semibold">{title}</h2>
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

export default Create;
