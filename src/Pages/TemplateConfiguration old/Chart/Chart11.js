import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const XAXISRANGE = 60 * 1000;

const getNewSeries = (lastDate, series, { min, max }) => {
    const newDataPoint = {
        x: lastDate + XAXISRANGE,
        y: Math.floor(Math.random() * (max - min + 1)) + min
    };
    return [...series, newDataPoint];
};

const Chart11 = (props) => {
    const backgroundColors = (props?.Color?.length ? props.Color : ["#008FFB"]).map(color => color);

    const [series, setSeries] = useState([{ data: [] }]);
    const [options, setOptions] = useState(null);
    const [lastDate, setLastDate] = useState(Date.now());

    useEffect(() => {
        const initialOptions = {
            chart: {
                id: 'realtime',
                type: 'line',
                height: "100%",
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: backgroundColors,
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    const index = opts.dataPointIndex;
                    const seriesData = opts.w.globals.series[0];
                    const maxIndex = seriesData.reduce((maxIndex, value, currentIndex, arr) => (value.y > arr[maxIndex].y ? currentIndex : maxIndex), 0);
                    const minIndex = seriesData.reduce((minIndex, value, currentIndex, arr) => (value.y < arr[minIndex].y ? currentIndex : minIndex), 0);

                    if (index === maxIndex) {
                        return `Max: ${val}`;
                    } else if (index === minIndex) {
                        return `Min: ${val}`;
                    } else {
                        return '';
                    }
                },
            },
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                range: XAXISRANGE,
                title: {
                    text: props.axisX ? props.XAxis : '',
                    style: {
                        fontSize: props.FontSize || 14,
                        color: props.TextColor || "black",
                    },
                },
                labels: {
                    show: props.LebalX !== false,
                    formatter: function (val) {
                        return (val / 1000000).toFixed(0);
                    }
                },
                style: {
                    colors: props.LavelXColor || "black"
                  },
            },
            yaxis: {
                max: 100,
                title: {
                    text: props.axisY ? props.YAxis : '',
                    style: {
                        fontSize: props.FontSize || 14,
                        color: props.TextColor || "black",
                    },
                },
                labels: {
                    show: props.LebalY !== false,
                    formatter: function (val) {
                        return (val / 1000000).toFixed(0);
                    }
                },
                style: {
                    colors: props.LavelYColor || "black"
                  },
            },
            tooltip: {
                enabled: props.Tooltip !== false,
            },
        };
        setOptions(initialOptions);
    }, [props, backgroundColors]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeries(prevSeries => {
                const newData = getNewSeries(lastDate, prevSeries[0].data, { min: 10, max: 90 });
                return [{ data: newData }];
            });
            setLastDate(lastDate + XAXISRANGE);
        }, 3000);

        return () => clearInterval(interval);
    }, [lastDate]);

    useEffect(() => {
        if (options) {
            const maxDataValue = Math.max(...series[0].data);

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
                        text: props.ValuePeak === true ? props.PeakValueTitle&& props.PeakValueTitle+ " - " + maxDataValue || 'Peak' + " - " + maxDataValue  :
                        props.PeakValueTitle ||'Peak',
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
                        text: props.ValueLowest === true ? props.LowestValueTitle && props.LowestValueTitle+ " - " + 1 || 'Lowest' + " - " + 1  :
                        props.LowestValueTitle ||'Lowest',
                    },
                },
            ].filter(annotation => annotation);

            setOptions(prevOptions => ({
                ...prevOptions,
                annotations: {
                    yaxis: newAnnotations
                }
            }));
        }
    }, [props, series, options]);

    return (
        <div className='w-[100%]' style={{ height: '100%' }}>
            {options && <ReactApexChart options={options} series={series} type="line" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />}
        </div>
    );
};

export default Chart11;
