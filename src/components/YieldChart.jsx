import { useState } from "react";
import Histogram from "./BarChart";
import LineChart from "./LineChart";
import DurationBox from "./DurationCheckbox";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  Colors,
} from "chart.js";
import { toPadding } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
  BarElement
);

export const YieldChart = () => {
  const [timeframe, setTimeframe] = useState("1h");

  const mainData = [20.15, 8.24, 18.12, 15, 20, 30, 40, 25, 10];
  // const mainData = [20.15, 25.24, 28.12, 30, 35, 40, 50, 55, 60];
  const historicalData = {
    "1h": [10.15, 15.24, 18.12, 20, 25, 30, 40, 45, 50],
    "4h": [15, 10, 18, 5, 7, 8, 6, 4, 3],
    "1d": [20, 12, 16, 6, 18, 10, 9, 15, 4],
    "3d": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1w": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1mo": [18, 14, 17, 8, 10, 1, 10, 6, 5],
    "3mo": [22, 16, 9, 10, 12, 14, 11, 7, 6],
    "6mo": [25, 18, 20, 12, 14, 16, 12, 8, 7],
  };

  const timeframeLabels = {
    "1h": "1 hour ago",
    "4h": "4 hours ago",
    "1d": "1 day ago",
    "3d": "3 days ago",
    "1w": "1 week ago",
    "1mo": "1 month ago",
    "3mo": "3 months ago",
    "6mo": "6 months ago",
  };

  const historical = historicalData[timeframe];
  const histogramData = mainData.map((main, idx) => main - historical[idx]);

  const createTooltip = (id, positionStyles, contentHTML) => {
    const tooltipEl = document.getElementById(id);
    if (!tooltipEl) {
      const el = document.createElement("div");
      el.id = id;
      el.style.position = "absolute";
      el.style.background = "rgba(50, 50, 50, 0.9)";
      el.style.color = "white";
      el.style.padding = "10px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "1000";
      el.style.borderRadius = "10px";
      el.style.border = "1px solid white";
      document.body.appendChild(el);
    }

    const el = document.getElementById(id);

    Object.assign(el.style, positionStyles);

    el.innerHTML = contentHTML;
  };

  const histogramTooltip = (tooltipModel) => {
    const tooltip = tooltipModel.tooltip;

    if (tooltip.opacity === 0) {
      createTooltip("histogram-tooltip", { opacity: "0" }, "");
      return;
    }

    const content = `
      <div>
        ${tooltip.dataPoints[0].raw}%
      </div>
    `;

    createTooltip(
      "histogram-tooltip",
      {
        left: `${tooltip.caretX}px`,
        bottom: `${tooltip.caretY}px`,
        opacity: "1",
      },
      content
    );
  };

  const lineChartTooltip = (tooltipModel) => {
    const tooltip = tooltipModel.tooltip;

    if (tooltip.opacity === 0) {
      createTooltip(
        "linechart-tooltip",
        {
          left: `${tooltip.caretX + 60}px`,
          top: `${tooltip.caretY + 50}px`,
          opacity: "0",
        },
        ""
      );
      return;
    }

    const content = `
      <div style="display:flex;flex-direction:row;gap:10px;width:170px;min-width:50px">
        <div style="text-align:left">
          <p>Current APR:</p>
          <p>${timeframeLabels[timeframe]}:</p>
        </div>
        <div style="text-align:right;display:flex;flex-direction:column;position:absolute;right:10px">
          <p>${tooltip.dataPoints[0].raw}%</p>
          <p>${historicalData[timeframe][tooltip.dataPoints[0].dataIndex]}%</p>
        </div>
      </div>
    `;

    createTooltip(
      "linechart-tooltip",
      {
        left: `${tooltip.caretX + 60}px`,
        top: `${tooltip.caretY + 50}px`,
        opacity: "1",
      },
      content
    );
  };

  const lineChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: [
      {
        label: "Current APR ",
        data: mainData,
        borderColor: "#3f53d3",
        pointBackgroundColor: "#3f53d3",
        pointRadius: 5,
        hoverBorderColor: "white",
        hoverBackgroundColor: "#3f53d3",
        hoverBorderWidth: 2.5,
        fill: true,
        backgroundColor: "rgba(63, 83, 211, 0.2)",
        color: "white",
      },
      {
        label: timeframeLabels[timeframe],
        data: historical,
        borderColor: "#09a8b7",
        pointBackgroundColor: "#09a8b7",
        hoverBorderColor: "white",
        hoverBackgroundColor: "#09a8b7",
        hoverBorderWidth: 2.5,
        pointRadius: 5,
        borderDash: [10],
        fill: true,
        backgroundColor: "rgba(9, 168, 183, 0.2)",
        color: "white",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: true,
        pointStyle: false,
        position: "top",
        align: "start",
        labels: {
          usePointStyle: "circle",
          color: "white",
          padding: 10,
        },
      },
      tooltip: {
        enabled: false,
        external: lineChartTooltip,
      },
      grid: {
        borderColor: "#ff9800",
        color: "white",
      },
    },
    scales: {
      x: {
        min: 0,
        ticks: {
          callback: (val) => `${val}M`,
          color: "white",
        },
        grid: {
          borderColor: "#ff9800",
          color: "#5b7280",
        },
      },
      y: {
        ticks: {
          callback: (val) => `${val}%`,
          color: "white",
        },
        grid: {
          color: (context) => {
            if (context.index === 0) return "#5b7280";
          },
        },
      },
    },
  };

  const histogramChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: [
      {
        label: "Yield Spread",
        data: histogramData,
        backgroundColor: histogramData.map((val) =>
          val >= 0 ? "#09a8b7" : "#f56c6c"
        ),
        barThickness: 25,
      },
    ],
  };

  const histogramChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          color: "white",
          usePointStyle: false,
        },
        padding: 20,
      },
      tooltip: {
        enabled: false,
        external: histogramTooltip,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          callback: (val) => `${val}M`,
        },
        grid: {
          color: (context) => {
            console.log(context);
            if (context.value === 0 || context.index === 0) return "#5b7280";
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          callback: (val) => `${val}%`,
        },
        grid: {
          borderColor: "#ff9800",
          border: "1px solid",
          color: (context) => {
            console.log(context);
            if (context.tick.value === 0 || context.index === 0)
              return "#5b7280";
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <div className="w-full px-6 py-4 bg-gray-800 rounded-lg mb-8">
          <DurationBox
            onChange={setTimeframe}
            selectedTimeframe={timeframe}
            timeframes={["1h", "4h", "1d", "3d", "1w", "1mo", "3mo", "6mo"]}
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="bg-gray-800 rounded-lg p-4 w-full h-[50vh]">
            <LineChart data={lineChartData} options={lineChartOptions} />
          </div>
          <div className="bg-gray-800 rounded-lg p-4 w-full h-[30vh]">
            <Histogram
              data={histogramChartData}
              options={histogramChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
