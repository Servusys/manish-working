import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
export default function Chart7(props) {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "rgba(255, 99, 132, 0.2)"
  ]).map(color => color);

  const data = {
    labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6"],
    datasets: [
      {
        label: " of Data",
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: props.axisX === false ? false : true,
          color: props.TextColor || "black",
          text: props.XAxis,
          font: {
            size: props.FontSize || 12,
          },
        },
        ticks: {
          beginAtZero: true,
        },
        grid: {
          display: props.gridX === false ? false : true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        title: {
          display: props.axisY === false ? false : true,
          color: props.TextColor || "black",
          text: props.YAxis,
          font: {
            size: props.FontSize || 12,
          },
        },
        ticks: {
          beginAtZero: true,
        },
        grid: {
          display: props.gridY === false ? false : true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        labels: {
          usePointStyle: true,
          boxWidth: 4,
          fontSize: props.FontSize || 12,
          colors: props.LegendTextColor || "black",
        },
      },
    },
  };

  return (
    <Radar
      data={data}
      options={options}
      style={{ backgroundColor: props.BackgroundColor || "transparent" }}
    />
  );
}
