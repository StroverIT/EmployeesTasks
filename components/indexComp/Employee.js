import React, { useEffect, useState } from "react";
import { formatPercentage, generateRandomColor } from "../../utils/helper";
import Button from "../Forms/Buttons/Default";

const Employee = ({ color }) => {
  return (
    <section
      className={`box-shadow border-[3px]  rounded-[1.3rem] px-10 py-6  w-full`}
      style={{
        borderColor: color,
        color,
      }}
    >
      <section className={` flex justify-between items-center w-full `}>
        <div className="font-bold text-2xl">Emil Zlatinov</div>
        <div className="text-xl font-medium">10 / 50 Tasks</div>
      </section>

      {/* Range */}
      <div className="w-full bg-gray-200 rounded-full h-4 my-8 dark:bg-gray-700">
        <div
          className=" h-4 rounded-full dark:bg-red-500"
          style={{
            width: "15" + "%",
            backgroundColor: color,
          }}
        ></div>
      </div>

      <section className="flex justify-between items-center w-full text-sm">
        <div>
          Monthly salary:<span className="pl-1 text-slate-500"> $1200.50</span>
        </div>
      </section>

      <div className="flex-center w-full mt-7">
        <Button text="View Details" className={`w-44 `} color={color} />
      </div>
    </section>
  );
};

export default Employee;
// ${generateRandomColor(
//   1
// )}
