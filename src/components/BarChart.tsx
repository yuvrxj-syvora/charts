import React from "react";
import { Bar } from "react-chartjs-2";

const Histogram = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default Histogram;
