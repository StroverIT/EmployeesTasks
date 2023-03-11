import React, { useState } from "react";

const Table = ({ data, color }) => {
  const [tasks, setTasks] = useState(data);

  const filterHandler = () => {};

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Title
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Description</div>
            </th>

            <th scope="col" class="px-6 py-3">
              <div class="flex items-center justify-center">
                Due Date
                <a onClick={filterHandler} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" class="px-2 py-3">
              <span className="sr-only">Delete</span>
            </th>
            <th scope="col" class="px-2 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((data) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={data._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                >
                  {data.title}
                </th>
                <td className="px-6 py-4">{data.description}</td>
                <td className="px-16 py-4 ">{data.dueDate}</td>
                <td className="py-4 px-5 text-right">
                  <a
                    href="#"
                    className="font-medium hover:underline"
                    style={{ color }}
                  >
                    Delete
                  </a>
                </td>
                <td className="pr-8 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium hover:underline"
                    style={{ color }}
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
