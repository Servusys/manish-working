import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Chart.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export default function Chart34(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: props.position ? props.position : "top",
            },
        },
        scales: {
            x: {
              title: {
                display: true,
                text: props.XAxis,
                font: {
                    size: props.FontSize || 12,
                  },
              },
            },
            y: {
              title: {
                display: true,
                text: props.YAxis,
                font: {
                  size: props.FontSize || 12,
                },
              },
            },
          },
    };
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    
     const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 25, 26, 12, , 14, 18, 36],
                backgroundColor:  'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [12, 25, 26, 12, , 64, 18, 36],
                backgroundColor:  'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />;
}
