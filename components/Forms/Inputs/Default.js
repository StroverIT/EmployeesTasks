import React, { useEffect, useMemo, useRef, useState } from "react";

const Input = ({
  className = null,
  name,
  type,
  placeholder,
  label,
  additionalProps,
  classNameInput = null,
  isLargeText,
  onChange,
  value,
}) => {
  if (className == "col-span-2") {
    console.log("true");
  }
  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {!isLargeText ? (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...additionalProps}
          className={`bg-inherit border border-gray-700 text-gray-900 text-sm rounded-lg
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classNameInput}`}
        />
      ) : (
        <textarea
          onChange={onChange}
          value={value}
          className={`${classNameInput} block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          {...additionalProps}
          placeholder={placeholder}
        ></textarea>
      )}
    </div>
  );
};

export default Input;

// type="number"
// step="0.01"
// inputmode="decimal"
// name="newExpenseAmount"
// id="newExpenseAmount"
// placeholder="e.g., 3.50"
// required
