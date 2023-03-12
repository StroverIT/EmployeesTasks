import React from "react";

import TaskTable from "./TaskTable";

const Table = ({ data, color, completeTaskHandler, namesAndIds }) => {
  return (
    <section
      className={`grid lg:grid-cols-[20%50%10%10%10%]  mt-14 justify-center items-center text-center gap-x-1 gap-y-2`}
    >
      {/* Header */}
      <div className="text-xl font-bold max-lg:hidden">Title</div>
      <div className="text-xl font-bold max-lg:hidden">Description</div>
      <div className="text-xl font-bold max-lg:hidden">Due Date</div>
      <div className="text-xl font-bold max-lg:hidden">Assignee</div>

      <div className="invisible">Edit,Delete,Complete</div>

      {data.map((data) => {
        return (
          <TaskTable
            key={data._id}
            data={data}
            color={color}
            namesAndIds={namesAndIds}
            completeTaskHandler={completeTaskHandler}
          />
        );
      })}
    </section>
  );
};

export default Table;

{
  /* <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
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
        <span className="sr-only">Edit</span>
      </th>
      <th scope="col" class="px-2 py-3">
        <span className="sr-only">Complete</span>
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
            className="max-w-sm px-6 py-4 font-medium text-gray-900 break-all whitespace-pre-line dark:text-white "
          >
            {data.title}
          </th>
          <td className="px-6 py-4">{data.description}</td>
          <td className="px-16 py-4 ">{data.dueDate}</td>

          <td className="py-4 pr-8 text-right">
            <a
              href="#"
              className="font-medium hover:underline"
              style={{ color }}
            >
              Edit
            </a>
          </td>
          <td className="px-5 py-4 text-right">
            <a
              href="#"
              className="font-medium hover:underline"
              style={{ color }}
            >
              Complete
            </a>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
</div> */
}
