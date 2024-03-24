import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css'

const Chart15 = (props) => {
    const backgroundColors = props?.Color?.length ? props.Color : ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'];

    const [series, setSeries] = useState([{
        data: [430, 448, 470, 540, 580, 600]
    }]);

    const [options, setOptions] = useState({
        annotations: {
            xaxis: [
                props.TargetDisplay !== false && {
                    x: props.TargetValue || 20,
                    borderColor: props.TargetValueLineColor || '#0073ff',
                    label: {
                        borderColor: props.TargetValueLineColor || '#0073ff',
                        style: {
                            color: props.LableTextColorTarget || '#fff',
                            background: props.TargetValueLineColor || '#0073ff',
                            fontSize: props.FontSizeTarget,
                            textAlign: 'left'
                        },
                        text: props.TargetValueTitle || 'Target',
                    },
                },
                props.PeakDisplay !== false && {
                    x: 600,
                    borderColor: props.PeakValueC || '#ff0000',
                    label: {
                        borderColor: props.PeakValueC || '#ff0000',
                        style: {
                            color: '#fff',
                            background: props.PeakValueC || '#ff0000',
                        },
                        text: props.PeakValueTitle || 'Peak',
                    },
                },
                props.LowestDisplay !== false && {
                    x: 400,
                    borderColor: props.LowestValueC || '#00ff00',
                    label: {
                        borderColor: props.LowestValueC || '#00ff00',
                        style: {
                            color: '#fff',
                            background: props.LowestValueC || '#00ff00',
                        },
                        text: props.LowestValueTitle || 'Lowest',
                    },
                },
            ],
        },
        chart: {
            type: 'bar',
            height: 380
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: backgroundColors,
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            offsetX: 0,
            dropShadow: {
                enabled: true
            },
            formatter: function (val, opts) {
                if (props.DataLabels === "all") {
                    return val.toFixed(0);
                } else if (props.DataLabels === "min") {
                    if (opts.seriesIndex === 0) {
                        if (val === Math.min(...series[0].data)) {
                            return val.toFixed(0);
                        } else {
                            return "";
                        }
                    }
                } else if (props.DataLabels === "max") {
                    if (opts.seriesIndex === 0) {
                        if (val === Math.max(...series[0].data)) {
                            return val.toFixed(0);
                        } else {
                            return "";
                        }
                    }
                } else if (props.DataLabels === "both") {
                    if (opts.seriesIndex === 0) {
                        if (
                            val === Math.max(...series[0].data) ||
                            val === Math.min(...series[0].data)
                        ) {
                            return val.toFixed(0);
                        } else {
                            return "";
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
            categories: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        legend: {
            show: props.LegendDisplay === false ? false : true,
            position: props.position ? props.position : "top",
            horizontalAlign: 'center',
            fontSize: '12px',
            labels: {
                colors: props.LegendTextColor || "black",
              },
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
        xaxis: {
            tickAmount: 10,
            title: {
                text: props.XAxis == false ? false : true,
                style: {
                    fontSize: props.FontSize || "14px",
                    color: props.TextColor || "green",
                },
            },
        },
        yaxis: {
            tickAmount: 10,
            title: {
                text: props.YAxis === false ? false : true,
                style: {
                    fontSize: props.FontSize || "14px",
                    color: props.TextColor || "black",
                },
            },
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    text: 'Category Names as DataLabels',
                }
            }
        },
    });


    useEffect(() => {
        setOptions({
            chart: {
                type: 'bar',
                height: 380
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            colors: backgroundColors,
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            legend: {
                show: props.LegendDisplay === false ? false : true,
                position: props.position ? props.position : "top",
                horizontalAlign: 'center',
                fontSize: '12px',
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
            xaxis: {
                categories: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
                tickAmount: 10,
                title: {
                    text: props.axisX === true ? props.XAxis : '',
                    style: {
                        fontSize: props.FontSize || "14px",
                        color: props.TextColor || "green",
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
                tickAmount: 10,
                title: {
                    text: props.axisY === true ? props.YAxis : '',
                    style: {
                        fontSize: props.FontSize || "14px",
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
            tooltip: {
                theme: 'dark',
                enabled: props.Tooltip === false ? false : true,
                x: {
                    show: false
                },
                y: {
                    title: {
                        text: '',
                    }
                }
            },
            annotations: {
                xaxis: [
                    props.TargetDisplay === true && {
                        x: props.TargetValue || 500,
                        borderColor: props.TargetLineDisplay ? props.TargetValueLineColor || '#0073ff' : "",
                        label: {
                            borderColor: props.TargetValueLineColor || '#0073ff',
                            offsetY: +props.PositionTargetTB || 0,
                            offsetX: +props.PositionTargetLR || 0,
                            style: {
                                color: props.LableTextColorTarget || '#fff',
                                background: props.TargetValueLineColor || '#0073ff',
                                fontSize: props.FontSizeTarget,
                                textAlign: 'left'
                            },
                            text: props.ValueTarget === true ? props.TargetValueTitle && props.TargetValueTitle+ " - " + props.TargetValue || 'Target' + " - " + props.TargetValue  :
                            props.TargetValueTitle ||'Target',
                        },
                    },
                    props.PeakDisplay === true && {
                        x: 400,
                        borderColor: props.PeakLineDisplay ? props.PeakValueC || '#ff0000' : "",
                        label: {
                            borderColor: props.PeakValueC || '#ff0000',
                            offsetY: +props.PositionPeakTB || 0,
                            offsetX: +props.PositionPeakLR || 0,
                            style: {
                                color: '#fff',
                                fontSize: props.FontSizePeak || '12px',
                                background: props.PeakValueC || '#ff0000',
                            },
                            text: props.ValuePeak === true ? props.PeakValueTitle&& props.PeakValueTitle+ " - " + 400 || 'Peak' + " - " + 400  :
                            props.PeakValueTitle ||'Peak',
                        },
                    },
                    props.LowestDisplay === true && {
                        x: 200,
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
                            text: props.ValueLowest === true ? props.LowestValueTitle&& props.LowestValueTitle+ " - " + 200 || 'Lowest' + " - " + 200  :
                props.LowestValueTitle ||'Lowest',
                        },
                    },
                ],
            },
        })
    }, [props , series]);

    useEffect(() => {
        setOptions({
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0],
                formatter: function (val, opts) {
                    if (props.DataLabels === "all") {
                        return val.toFixed(0);
                    } else if (props.DataLabels === "min") {
                        if (opts.seriesIndex === 0) {
                            if (val === Math.min(...series[0].data)) {
                                return val.toFixed(0);
                            } else {
                                return "";
                            }
                        }
                    } else if (props.DataLabels === "max") {
                        if (opts.seriesIndex === 0) {
                            if (val === Math.max(...series[0].data)) {
                                return val.toFixed(0);
                            } else {
                                return "";
                            }
                        }
                    } else if (props.DataLabels === "both") {
                        if (opts.seriesIndex === 0) {
                            if (
                                val === Math.max(...series[0].data) ||
                                val === Math.min(...series[0].data)
                            ) {
                                return val.toFixed(0);
                            } else {
                                return "";
                            }
                        }
                    }
                },
            },
        })
    }, [props.DataLabels, series])

    return (
        <ReactApexChart options={options} series={series} type="bar" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
    );

}
export default Chart15