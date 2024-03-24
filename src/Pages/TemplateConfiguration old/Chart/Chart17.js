import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css'

const Chart17 = (props) => {
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Marine Sprite',
            data: [44, 55, 41, 37, 22, 43, 21],
            color: props.Color || "#FDD835"
        }, {
            name: 'Striking Calf',
            data: [53, 32, 33, 52, 13, 43, 32],
            color: props.Color || "#FDD835"
        }, {
            name: 'Tank Picture',
            data: [12, 17, 11, 9, 15, 11, 20],
            color: props.Color || "#FDD835"
        }, {
            name: 'Bucket Slope',
            data: [9, 7, 5, 8, 6, 9, 4],
            color:  "#FDD835"
        }, {
            name: 'Reborn Kid',
            data: [25, 12, 19, 32, 25, 24, 10],
            color:  "#FDD835"
        }],
        options: {
            chart: {
                type: 'bar',
                height: '100%',
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        total: {
                            enabled: true,
                            offsetX: 0,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900,
                            }
                        }
                    }
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                labels: {
                    formatter: function (val) {
                        return val + "K"
                    }
                },
                title: {
                    text: props.XAxis,
                    style: {
                      fontSize: props.FontSize || 14,
                    },
                  },
            },
            yaxis: {
                title: {
                    text: props.YAxis,
                    style: {
                      fontSize: props.FontSize || 14,
                    },
                  },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "K"
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position:  props.position ? props.position : "top",
                horizontalAlign: 'left',
                offsetX: 40
            },
        }
    });

    
    useEffect(() => {
        setChartData(prevState => ({
            ...prevState,
            options: {
                ...prevState.options,
                legend: {
                    position: props.position ? props.position : "top",
                    horizontalAlign: 'left',
                    offsetX: 40,
                    labels: {
                        colors: props.LegendTextColor || "black",
                      },
                },
                xaxis: {
                  title: {
                      text: props.XAxis,
                      style: {
                        fontSize: props.FontSize || 14,
                      },
                    },
              },
              yaxis: {
                  title: {
                    text: props.YAxis,
                    style: {
                      fontSize: props.FontSize || 14,
                    },
                  },
                },
            },
            series: [{
              name: 'Marine Sprite',
              data: [44, 55, 41, 37, 22, 43, 21],
              color: props.Color || "#FDD835"
          }, {
              name: 'Striking Calf',
              data: [53, 32, 33, 52, 13, 43, 32],
              color: props.Color || "#FDD835"
          }, {
              name: 'Tank Picture',
              data: [12, 17, 11, 9, 15, 11, 20],
              color: props.Color || "#FDD835"
          }, {
              name: 'Bucket Slope',
              data: [9, 7, 5, 8, 6, 9, 4],
              color: props.Color || "#FDD835"
          }, {
              name: 'Reborn Kid',
              data: [25, 12, 19, 32, 25, 24, 10],
              color: props.Color || "#FDD835"
          }],
        }));
    }, [props.position, props.FontSize, props.XAxis, props.YAxis, props.BackgroundColor, props.Color]);

    return (

        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={'100%'} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />

    );
};

export default Chart17;
