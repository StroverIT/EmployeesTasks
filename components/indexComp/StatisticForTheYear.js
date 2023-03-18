// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { topFiveTasksYearly } from "../../utils/task";
// import { months } from "../../utils/helper";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "2023 Chart",
//     },
//   },
// };

// const StatisticForTheYear = () => {
//   const [employeesAndTasks, setEmployeesAndTasks] = useState(null);
//   useEffect(() => {
//     (async function () {
//       const res = await topFiveTasksYearly();

//       setEmployeesAndTasks({
//         labels: months,
//         datasets: res.data,
//       });
//     })();
//   }, []);
//   return (
//     <section>
//       <h3 className="mb-10 text-2xl font-semibold md:text-4xl">
//         Statistics for the year
//       </h3>

//       {employeesAndTasks && (
//         <section className="box-shadow border-[3px] border-blue-300 rounded-[1.3rem]  py-6  flex-center">
//           <Line options={options} data={employeesAndTasks} />
//         </section>
//       )}
//     </section>
//   );
// };

// export default StatisticForTheYear;
