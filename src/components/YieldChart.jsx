import { useState } from "react";
import Histogram from "./BarChart";
import LineChart from "./LineChart";
import DurationBox from "./DurationCheckbox";
import { plugins } from "chart.js";

export const YieldChart = () => {
  const [timeframe, setTimeframe] = useState("1h");

  const mainData = [20.1503, 8.2448, 18.1203, 10, 20, 30, 40, 20, 10];
  const historicalData = {
    "1h": [15, 10, 18, 5, 7, 8, 6, 4, 3],
    "4h": [15, 10, 18, 5, 7, 8, 6, 4, 3],
    "1d": [20, 12, 16, 6, 18, 10, 9, 15, 4],
    "3d": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1w": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1mo": [18, 14, 17, 8, 10, 1, 10, 6, 5],
    "3mo": [22, 16, 9, 10, 12, 14, 11, 7, 6],
    "6mo": [25, 18, 20, 12, 14, 16, 12, 8, 7],
  };

  const historical = historicalData[timeframe];
  const histogramData = mainData.map((main, idx) => main - historical[idx]);

  const lineChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: [
      {
        label: "Current APR ",
        data: mainData,
        borderColor: "#3f53d3",
        pointBackgroundColor: "#3f53d3",
        pointRadius:5,
        fill: false,
      },
      {
        label: timeframe,
        data: historical,
        borderColor: "#09a8b7",
        pointBackgroundColor: "#09a8b7",
        borderDash: [5, 5],
        pointRadius:5,
        fill: true
      },
    ],
  };

  const histogramChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: [
      {
        label: "Yield Spread",
        data: histogramData,
        backgroundColor: "#09a8b7",
        barThickness: 20,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    layout: {
        padding: 50
    },
    plugins: {
      title: {
        display: true,
        position:"left"
      },
      tooltip: {
        usePointStyle: true,
        padding:'12',
        layout: {
            padding: 0
        },
        callbacks: {
          layout: {
            padding: 0
        },
          labelPointStyle: function (context) {
            return {
              pointStyle: "none",
              rotation: 0,
            };
          },
          labelColor: function (context) {
            return {
              borderColor: "white",
              backgroundColor: "rgb(255, 0, 0)",
              borderWidth: 2,
              borderDash: [12, 12],
              borderRadius: 2,
            };
          },
          labelTextColor: function (context) {
            return "white";
          },
        },
      },
      tooltipItems:{
        padding:12,
        layout:{
          padding:50
        }
      }
    },
  };

  return (
    <div class="bg-gray-800 min-h-screen p-10">
      <DurationBox
        onChange={setTimeframe}
        selectedTimeframe={timeframe}
        timeframes={["1h", "4h", "1d", "3d", "1w", "1mo", "3mo", "6mo"]}
      />
      <LineChart data={lineChartData} options={lineChartOptions} />
      <Histogram data={histogramChartData} options={lineChartOptions} />
    </div>
  );
};
