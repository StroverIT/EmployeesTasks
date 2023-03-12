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
  list = [],
  listValue,
  listHandler,
  listNameOnly,

  color,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  const setDropHandler = () => {
    if (!listNameOnly) {
      setDropOpen(!dropOpen);
    }
  };
  const dropHandler = (data) => {
    setDropOpen(false);
    listHandler(data);
  };
  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
          type == "dropdown" ? "invisible" : ""
        }`}
      >
        {label}
      </label>
      {!isLargeText && type != "dropdown" && (
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
      )}
      {isLargeText && type != "dropdown" && (
        <textarea
          name={name}
          onChange={onChange}
          value={value}
          className={`${classNameInput} block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          {...additionalProps}
          placeholder={placeholder}
        ></textarea>
      )}
      {type == "dropdown" && (
        <div className=" relative w-full flex-center">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className={`${
              list.length > 1 ? "hover:bg-cyan-800" : ""
            } text-white bg-cyan-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center justify-between  dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 w-full`}
            type="button"
            style={{ backgroundColor: color }}
            onClick={setDropHandler}
          >
            {listValue.listValue || listValue.name}
            {!listNameOnly && (
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            )}
          </button>
          {dropOpen && (
            <div
              id="dropdown"
              className="z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow-2xl  dark:bg-gray-700 w-full h-56 overflow-auto"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {list.map((data) => {
                  return (
                    <li
                      key={data._id}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      onClick={() =>
                        dropHandler({ name: data.name, _id: data._id })
                      }
                    >
                      {data.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
