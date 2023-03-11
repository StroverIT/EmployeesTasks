import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "2023 Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Emil Zlatinov",
      data: [100, 200, 300, 500, 600, 0, 100, 200, 1000, 1565],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Ivan Petrov",
      data: [100, 200, 800, 500, 200, 700, 100, 900, 1000, 1100, 1200],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const StatisticForTheYear = () => {
  return (
    <section>
      <h3 className="mb-10 text-4xl font-semibold">Statistic for the year</h3>

      <section className="box-shadow border-[3px] border-blue-300 rounded-[1.3rem]  py-6  flex-center">
        <Line options={options} data={data} />
      </section>
    </section>
  );
};

export default StatisticForTheYear;
