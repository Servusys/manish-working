import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Chart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart3(props) {
    const backgroundColors = (props?.Color?.length ? props.Color : [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
    ]).map(color => color);
    const data = {
        labels: [" Data 1 ", " Data 2 ", " Data 3 ", " Data 4 ", " Data 5 "],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2],
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 1,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: props.LegendDisplay === false ? false : true,
                position: props.position ? props.position : "top",
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    fontSize: 12,
                    colors: props.LegendTextColor || "black",
                },
            },
            datalabels: {
                color: "black",
                font: {
                  size: 12,
                },
                formatter: function (val, opts) {
                  if (props.DataLabels === "all") {
                    return val.toFixed(0);
                  } else if (props.DataLabels === "min") {
                    if (opts.seriesIndex === 0) {
                      if (val === Math.min(...data.datasets[0].data)) {
                        return val.toFixed(0);
                      } else {
                        return '';
                      }
                    }
                  } else if (props.DataLabels === "max") {
                    if (opts.seriesIndex === 0) {
                      if (val === Math.max(...data.datasets[0].data)) {
                        return val.toFixed(0);
                      } else {
                        return '';
                      }
                    }
                  } else if (props.DataLabels === "both") {
                    if (opts.seriesIndex === 0) {
                      if (
                        val === Math.max(...data.datasets[0].data) ||
                        val === Math.min(...data.datasets[0].data)
                      ) {
                        return val.toFixed(0);
                      } else {
                        return '';
                      }
                    }
                  }
                },
              },
        }
    }
    return <Pie options={options} data={data} width="100%" height="100%" style={{ backgroundColor: props.BackgroundColor || "transparent" }} />;
}
