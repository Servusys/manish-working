import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart37 = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "STOCK ABC",
            data: [10,20,10,60,50,30]
        }],
        options: {
            chart: {
                type: 'area',
                height: "100%",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Fundamental Analysis of Stocks',
                align: 'left'
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left'
            },
            labels: ['A', 'B', 'C', 'D', 'E', 'F'],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        },
    });

    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={"100%"} />
            <div id="html-dist"></div>
        </div>
    );
};

export default Chart37;
