import React from "react";

const TopFiveEmployee = ({ data }) => {
  return (
    <>
      <section className="text-lg text-center">{data[0]}</section>
      <section className="text-lg font-semibold text-green-500 text-center">
        {data[1]}
      </section>
    </>
  );
};

export default TopFiveEmployee;
