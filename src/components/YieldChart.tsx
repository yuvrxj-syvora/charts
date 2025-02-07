import { useState } from "react";
import Histogram from "./BarChart";
import LineChart from "./LineChart";
import DurationBox from "./DurationCheckbox";
import {
  Chart,
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
import { histogramChartOptions, lineChartOptions } from "./chart-options";

Chart.register(
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
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const YieldChart = () => {
  const [selectedTimeframes, setSelectedTimeframes] = useState<string[]>([
    "1h",
  ]);

  const mainData = [20.15, 8.24, 18.12, 15, 20, 30, 40, 25, 10];
  const historicalData: Record<string, number[]> = {
    "1h": [10.15, 15.24, 18.12, 20, 25, 30, 40, 45, 50],
    "4h": [15, 10, 18, 5, 7, 8, 6, 4, 3],
    "1d": [20, 12, 16, 6, 18, 10, 9, 15, 4],
    "3d": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1w": [18, 14, 17, 8, 10, 12, 10, 6, 5],
    "1mo": [18, 14, 17, 8, 10, 1, 10, 6, 5],
    "3mo": [22, 16, 9, 10, 12, 14, 11, 7, 6],
    "6mo": [25, 18, 20, 12, 14, 16, 12, 8, 7],
  };

  const [colorMap, setColorMap] = useState(new Map<string, string>());

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframes((prev) => {
      if (prev.includes(timeframe)) {
        setColorMap((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.delete(timeframe);
          return newMap;
        });
        return prev.filter((t) => t !== timeframe);
      } else {
        setColorMap((prevMap) => {
          const newMap = new Map(prevMap);
          if (!newMap.has(timeframe)) {
            newMap.set(
              timeframe,
              timeframe === "1h" ? "#06a8b5" : getRandomColor()
            );
          }
          return newMap;
        });
        return [...prev, timeframe];
      }
    });
  };

  const lineChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: [
      {
        label: "Current APR",
        data: mainData,
        borderColor: "#3f53d3",
        pointBackgroundColor: "#3f53d3",
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(63, 83, 211, 0.2)",
      },
      ...selectedTimeframes.map((timeframe) => {
        const color = colorMap.get(timeframe) || "#06a8b5";
        return {
          label: `${timeframe} ago`,
          data: historicalData[timeframe],
          borderColor: color,
          pointBackgroundColor: color,

          pointRadius: 5,
          borderDash: [10],
          fill: true,
          backgroundColor: color + "33",
        };
      }),
    ],
  };

  const histogramData = selectedTimeframes.map((timeframe) =>
    mainData.map((value, index) => value - historicalData[timeframe][index])
  );

  const histogramChartData = {
    labels: ["0M", "3M", "6M", "9M", "12M", "15M", "18M", "21M", "24M"],
    datasets: selectedTimeframes.map((timeframe, index) => {
      const color = colorMap.get(timeframe) || "#06a8b5";
      return {
        label: `${timeframe}`,
        data: histogramData[index],
        backgroundColor: color,
        barThickness: 15,
      };
    }),
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center p-10 justify-center">
      <div className="h-full w-full max-w-5xl bg-gray-800 p-10 rounded-lg flex flex-col">
        <div className="flex items-center justify-start rounded-lg px-4">
          <DurationBox
            timeframes={Object.keys(historicalData)}
            selectedTimeframes={selectedTimeframes}
            onChange={handleTimeframeChange}
          />
        </div>
        <div className="flex-1 min-h-0 p-4">
          <div className="flex flex-wrap gap-3 p-4">
            {selectedTimeframes.map((timeframe) => {
              const color = colorMap.get(timeframe) || "#06a8b5";
              return (
                <div key={timeframe} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-white text-sm font-medium">
                    {timeframe}
                  </span>
                </div>
              );
            })}
          </div>
          <LineChart data={lineChartData} options={lineChartOptions} />
        </div>
        {selectedTimeframes.length > 0 && (
          <div className="flex-1 min-h-0 p-4 ml-[-20px]">
            <Histogram
              data={histogramChartData}
              options={histogramChartOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};
