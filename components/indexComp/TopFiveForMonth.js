import React from "react";

const TopFiveForMonth = () => {
  return (
    <section>
      <h3 className="mb-10 text-4xl font-semibold">
        Top 5 employees for the month
      </h3>

      <section className="box-shadow border-[3px] border-blue-300 rounded-[1.3rem] px-10 py-6 grid grid-cols-2 justify-between items-center">
        <section className="mb-5">
          <div className="inline-block text-xl font-medium">
            Employee Name
            <div className="w-full h-[2px] bg-blue-600"></div>
          </div>
        </section>
        <section className="mb-5">
          <div className="inline-block text-xl font-medium">
            Total Completed Tasks
            <div className="w-full h-[2px] bg-blue-600 "></div>
          </div>
        </section>

        {/* This must be filtered from most completed tasks emoployee */}

        <section className="text-lg ">Ivan Kirkov</section>
        <section className="text-lg font-semibold text-green-500">100</section>
      </section>
    </section>
  );
};

export default TopFiveForMonth;
