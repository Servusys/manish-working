import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart23 = (props) => {
    const backgroundColors = (props?.Color?.length ? props.Color : [
        "#00E396",
    ]).map(color => color);
    const [series] = useState([
        {
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
    ]);

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'bar',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
    });

    useEffect(() => {
        setOptions({
            colors: backgroundColors || ['#00E396'],
            dataLabels: {
                enabled: true,
                enabledOnSeries: [0, 1, 2],
                formatter: function (val, opts) {
                    if (props.DataLabels === "all") {
                        return val.toFixed(0);
                    } else if (props.DataLabels === "min") {
                        if (opts.dataPointIndex === series[0].data.indexOf(Math.min(...series[0].data))) {
                            return val.toFixed(0);
                        } else {
                            return '';
                        }
                    } else if (props.DataLabels === "max") {
                        if (opts.dataPointIndex === series[0].data.indexOf(Math.max(...series[0].data))) {
                            return val.toFixed(0);
                        } else {
                            return '';
                        }
                    } else if (props.DataLabels === "both") {
                        const minValueIndex = series[0].data.indexOf(Math.min(...series[0].data));
                        const maxValueIndex = series[0].data.indexOf(Math.max(...series[0].data));
                        if (opts.dataPointIndex === minValueIndex || opts.dataPointIndex === maxValueIndex) {
                            return val.toFixed(0);
                        } else {
                            return '';
                        }
                    }
                }
            },
            legend: {
                show: props.LegendDisplay === false ? false : true,
                position: props.position ? props.position : "top",
                showForSingleSeries: true,
                customLegendItems: ['Data'],
                labels: {
                    colors: props.LegendTextColor || "black",
                },
                markers: {
                    fillColors: backgroundColors || ['#00E396']
                }
            },
            tooltip: {
                enabled: props.Tooltip === false ? false : true,
                shared: true,
                intersect: false
            },
            xaxis: {
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
                }
            },
        })
    }, [props])

    useEffect(() => {
        const maxDataValue = Math.max(...series.map(series => Math.max(...series.data)));
        const minDataValue = Math.min(...series.map(series => Math.min(...series.data)));

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
                    text: props.ValueTarget === true ? props.TargetValueTitle && props.TargetValueTitle + " - " + props.TargetValue || 'Target' + " - " + props.TargetValue :
                        props.TargetValueTitle || 'Target',
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
                y: 0,
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
                    text: props.ValueLowest === true ? props.LowestValueTitle && props.LowestValueTitle + " - " + 0 || 'Lowest' + " - " + 0 : props.LowestValueTitle || 'Lowest',
                },
            },
        ].filter(annotation => annotation);

        setOptions(prevState => ({
            ...prevState,
            annotations: {
                yaxis: newAnnotations,
            },
        }));
    }, [props, series]);

    return (
        <ReactApexChart options={options} series={series} type="bar" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
    );
};

export default Chart23;
