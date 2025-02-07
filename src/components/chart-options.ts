import { ChartOptions } from "chart.js";
import { lineChartTooltip } from "./toottip";

export const lineChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      display: false,
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
        callback: (val: any) => `${val}M`,
        color: "#728697",
      },
      grid: {
        borderColor: "#ff9800",
        color: "#5b7280",
      },
    },
    y: {
      ticks: {
        callback: (val: any) => `${val}%`,
        color: "#728697",
      },
      grid: {
        color: (context: any) => {
          if (context.index === 0) return "#5b7280";
        },
      },
    },
  },
};

export const histogramChartOptions: ChartOptions = {
  aspectRatio:2,
  bar:{datasets:{
    hoverBackgroundColor:'white',barPercentage:0.9
  }},
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      labels: { pointStyle: "circle", padding: 60 },
      display: false,
    },
    tooltip: {
      enabled: true,
      // external: histogramTooltip
    },
  },
  scales: {
    x: {
      offset: false,
      ticks: {
        color: "#728697",
        callback: (val: any) => `${val}M`,
        backdropPadding: {
          // x: 4,
          // y: 4,
        },
      },
      // min: 0,
      grid: {
        color: (context: any) => {
          if (context.value === 0 || context.index === 0) return "#5b7280";
        },
        offset:false
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#728697",
        callback: (val: any) => `${val}.00%`,
      },
      grid: {
        // borderColor: "#ff9800",
        // border: "1px solid",
        color: (context: any) => {
          if (context.tick.value === 0 || context.index === 0)
            return "#5b7280";
        },
      },
    },
  },
};