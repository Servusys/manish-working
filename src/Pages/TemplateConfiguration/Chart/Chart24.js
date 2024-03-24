import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = (props) => {
    const backgroundColors = (props?.Color?.length ? props.Color : [
        "#26a0fc",
        "#26e7a6",
        "#FBFF00",
    ]).map(color => color);
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Data A',
            data: [44, 55, 41, 67, 22, 43, 21, 49],
            color: backgroundColors[0]
        }, {
            name: 'Data B',
            data: [13, 23, 20, 8, 13, 27, 33, 12],
            color: backgroundColors[1]
        }, {
            name: 'Data C',
            data: [11, 17, 15, 15, 21, 14, 15, 13],
            color: backgroundColors[2]
        }],
        options: {
            chart: {
                type: 'bar',
                height: "100%",
                stacked: true,
                stackType: '100%'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            fill: {
                opacity: 1
            },
            legend: {
                show: props.LegendDisplay === false ? false : true,
                position: props.position ? props.position : "top",
            },
            tooltip: {
                enabled: props.Tooltip === false ? false : true,
                shared: true,
                intersect: false
            },
            xaxis: {
                categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                    '2012 Q3', '2012 Q4'
                ],
                title: {
                    text: props.axisX === true ? props.XAxis : '',
                    style: {
                        fontSize: props.FontSize || "14px",
                        color: props.TextColor || "black",
                    },
                },
                labels: {
                    show: props.LebalX === false ? false : true,
                }
            },
            yaxis: {
                title: {
                    text: props.axisY === true ? props.YAxis : '',
                    style: {
                        fontSize: props.FontSize || 14,
                        color: props.TextColor || "black",
                    },
                },
                labels: {
                    show: props.LebalY === false ? false : true,
                }
            },
            grid: {
                show: true,
                borderColor: "#f0f0f0",
                strokeDashArray: 4,
                position: "back",
                xaxis: {
                    lines: {
                        show: props.gridX === false ? false : true,
                    }
                },
                yaxis: {
                    lines: {
                        show: props.gridY === false ? false : true,
                    }
                }
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0, 1, 2],
              },
        },
    });

    useEffect(() => {
        setChartData(prevState => ({
            ...prevState,
            series: [{
                name: 'Data A',
                data: [44, 55, 41, 67, 22, 43, 21, 49],
                color: backgroundColors[0]
            }, {
                name: 'Data B',
                data: [13, 23, 20, 8, 13, 27, 33, 12],
                color: backgroundColors[1]
            }, {
                name: 'Data C',
                data: [11, 17, 15, 15, 21, 14, 15, 13],
                color: backgroundColors[2]
            }],
        }))
    }, [props]);

    useEffect(() => {
        setChartData(prevState => ({
            ...prevState, 
            options: {
                chart: {
                    type: 'bar',
                    height: "100%",
                    stacked: props.Stacked === true ? true : false,
                    stackType: '100%',
                    zoom: {
                        enabled: false
                      },
                      toolbar: {
                        show: false
                      }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                fill: {
                    opacity: 1
                },
                legend: {
                    show: props.LegendDisplay === false ? false : true,
                    position: props.position ? props.position : "top",
                    labels: {
                        colors: props.LegendTextColor || "black",
                      },
                },
                tooltip: {
                    enabled: props.Tooltip === false ? false : true,
                    shared: true,
                    intersect: false
                },
                xaxis: {
                    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                        '2012 Q3', '2012 Q4'
                    ],
                    title: {
                        text: props.axisX === true ? props.XAxis : '',
                        style: {
                            fontSize: props.FontSize || "14px",
                            color: props.TextColor || "black",
                        },
                    },
                    labels: {
                        show: props.LebalX === false ? false : true,
                        style: {
                            colors: props.LavelXColor || "black"
                          },
                    }
                },
                yaxis: {
                    title: {
                        text: props.axisY === true ? props.YAxis : '',
                        style: {
                            fontSize: props.FontSize || 14,
                            color: props.TextColor || "black",
                        },
                    },
                    labels: {
                        show: props.LebalY === false ? false : true,
                        style: {
                            colors: props.LavelYColor || "black"
                          },
                    }
                },
                grid: {
                    show: true,
                    borderColor: "#f0f0f0",
                    strokeDashArray: 4,
                    position: "back",
                    xaxis: {
                        lines: {
                            show: props.gridX === false ? false : true,
                        }
                    },
                    yaxis: {
                        lines: {
                            show: props.gridY === false ? false : true,
                        }
                    },
                    
                },
            },
        })
    )}, [props])


    useEffect(() => {
        setChartData(prevState => ({
            ...prevState, 
            options: {
                ...prevState.options,
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0, 1, 2],
                    formatter: function (val, opts) {
                        const seriesData = chartData.series[opts.seriesIndex].data;
                        const minValue = Math.min(...seriesData);
                        const maxValue = Math.max(...seriesData);                        
                        if (props.DataLabels === "all") {
                            return val.toFixed(0);
                        } else if (props.DataLabels === "min" && val === minValue) {
                            return val.toFixed(0);
                        } else if (props.DataLabels === "max" && val === maxValue) {
                            return val.toFixed(0);
                        } else if (props.DataLabels === "both" && (val === minValue || val === maxValue)) {
                            return val.toFixed(0);
                        } else {
                            return '';
                        }
                    }
                }
            }
        }));
    }, [props.DataLabels, chartData.series]);
    
    useEffect(() => {
        const maxDataValue = Math.max(...chartData.series.map(series => Math.max(...series.data)));
        const minDataValue = Math.min(...chartData.series.map(series => Math.min(...series.data)));

        const newAnnotations = [
            props.TargetDisplay === true && {
                y: props.TargetValue || 20,
                borderColor: props.TargetLineDisplay ? props.TargetValueLineColor || '#0073ff' : "",
                label: {
                    borderColor: props.TargetValueLineColor || '#0073ff',
                    offsetY: +props.PositionTargetTB || 0,
                    offsetX: +props.PositionTargetLR || 0,
                    style: {
                        color: props.LabelTextColorTarget || '#fff',
                        background: props.TargetValueLineColor || '#0073ff',
                        fontSize: props.FontSizeTarget || '14px'
                    },
                    text: props.ValueTarget === true ? props.TargetValueTitle && props.TargetValueTitle+ " - " + props.TargetValue || 'Target' + " - " + props.TargetValue  :
                    props.TargetValueTitle ||'Target',
                },
            },
            props.PeakDisplay === true && {
                y: maxDataValue,
                borderColor: props.PeakLineDisplay ? props.PeakValueC || '#ff0000' : "",
                label: {
                    borderColor: props.PeakValueC || '#ff0000',
                    offsetY: +props.PositionPeakTB || 0,
                    offsetX: +props.PositionPeakLR || 0,
                    style: {
                        color: '#fff',
                        background: props.PeakValueC || '#ff0000',
                        fontSize: props.FontSizePeak || '12px'
                    },
                    text: props.ValuePeak === true ? props.PeakValueTitle && props.PeakValueTitle + " - " + maxDataValue || 'Peak' + " - " + maxDataValue : props.PeakValueTitle || 'Peak',
                },
            },
            props.LowestDisplay === true && {
                y: minDataValue,
                borderColor: props.LowestLineDisplay ? props.LowestValueC || '#00ff00' : '',
                label: {
                    borderColor: props.LowestValueC || '#00ff00',
                    offsetY: +props.PositionLowestTB || 0,
                    offsetX: +props.PositionLowestLR || 0,
                    style: {
                        color: '#fff',
                        background: props.LowestValueC || '#00ff00',
                        fontSize: props.FontSizeLowest || '12px'
                    },
                    text: props.ValueLowest === true ? props.LowestValueTitle&& props.LowestValueTitle+ " - " + minDataValue || 'Lowest' + " - " + minDataValue : props.LowestValueTitle ||'Lowest',
                },
            },
        ].filter(annotation => annotation);

        setChartData(prevState => ({
            ...prevState,
            options: {
                ...prevState.options,
                annotations: {
                    yaxis: newAnnotations,
                },
            },
        }));
    }, [props]);

    return (
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
    );
};

export default ApexChart;
