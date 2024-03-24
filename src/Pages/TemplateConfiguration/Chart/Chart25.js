import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css'

const Chart25 = (props) => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Q1 Budget',
                group: 'budget',
                data: [44000, 55000, 41000, 67000, 22000, 43000],
                color:  '#80c7fd'
            },
            {
                name: 'Q1 Actual',
                group: 'actual',
                data: [48000, 50000, 40000, 65000, 25000, 40000],
                color:  '#008FFB'
            },
            {
                name: 'Q2 Budget',
                group: 'budget',
                data: [13000, 36000, 20000, 8000, 13000, 27000],
                color: '#80f1cb'
            },
            {
                name: 'Q2 Actual',
                group: 'actual',
                data: [20000, 40000, 25000, 10000, 12000, 28000],
                color:  '#00E396'
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: '100%',
                stacked: true,
            },
            stroke: {
                width: 1,
                colors: ['#fff'],
            },
            dataLabels: {
                formatter: (val) => {
                    return val / 1000 + 'K';
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                categories: [
                    'Online advertising',
                    'Sales Training',
                    'Print advertising',
                    'Catalogs',
                    'Meetings',
                    'Public relations',
                ],
                title: {
                    text: props.XAxis,
                    style: {
                      fontSize: props.FontSize || 14,
                    },
                  },
            },
            fill: {
                opacity: 1,
            },
            colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
            yaxis: {
                labels: {
                    formatter: (val) => {
                        return val / 1000 + 'K';
                    },
                },
                title: {
                    text: props.YAxis,
                    style: {
                      fontSize: props.FontSize || 14,
                    },
                  },
            },
            legend: {
                position: props.position ? props.position : "top",
                horizontalAlign: 'left',
            },
        },
    });

    
    useEffect(() => {
        setChartData(prevState => ({
            ...prevState,
            series: [
                {
                    name: 'Q1 Budget',
                    group: 'budget',
                    data: [44000, 55000, 41000, 67000, 22000, 43000],
                    color:  '#80c7fd'
                },
                {
                    name: 'Q1 Actual',
                    group: 'actual',
                    data: [48000, 50000, 40000, 65000, 25000, 40000],
                    color: '#008FFB'
                },
                {
                    name: 'Q2 Budget',
                    group: 'budget',
                    data: [13000, 36000, 20000, 8000, 13000, 27000],
                    color: '#80f1cb'
                },
                {
                    name: 'Q2 Actual',
                    group: 'actual',
                    data: [20000, 40000, 25000, 10000, 12000, 28000],
                    color:  '#00E396'
                },
            ],
            options: {
                chart: {
                    type: 'bar',
                    height: '100%',
                    stacked: true,
                },
                stroke: {
                    width: 1,
                    colors: ['#fff'],
                },
                dataLabels: {
                    formatter: (val) => {
                        return val / 1000 + 'K';
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    categories: [
                        'Online advertising',
                        'Sales Training',
                        'Print advertising',
                        'Catalogs',
                        'Meetings',
                        'Public relations',
                    ],
                    title: {
                        text: props.XAxis,
                        style: {
                          fontSize: props.FontSize || 14,
                        },
                      },
                },
                fill: {
                    opacity: 1,
                },
                colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
                yaxis: {
                    labels: {
                        formatter: (val) => {
                            return val / 1000 + 'K';
                        },
                    },
                    title: {
                        text: props.YAxis,
                        style: {
                          fontSize: props.FontSize || 14,
                        },
                      },
                },
                legend: {
                    position: props.position ? props.position : "top",
                    horizontalAlign: 'left',
                    labels: {
                        colors: props.LegendTextColor || "black",
                      },
                },
            },
        }));
    }, [props.position, props.FontSize, props.XAxis, props.YAxis, props.BackgroundColor, props.Color]);

    return (

        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={'100%'}  style={{ backgroundColor: props.BackgroundColor || "transparent" }}/>

    );
};

export default Chart25;
