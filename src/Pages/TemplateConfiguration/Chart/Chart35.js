import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

const Chart35 = (props) => {
    const backgroundColors = (props?.Color?.length ? props.Color : [
        "#008FFB",
        "#00E396",
        '#FEB019',
        '#FF4560',
        '#775DD0',
      ]).map(color => color);
  const [series] = useState([{ data: [21, 22, 10, 28, 16] }]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      events: {
        click: function(chart, w, e) {
          // // console.log(chart, w, e)
        }
      }
    },
    colors: backgroundColors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true
    },
    xaxis: {
      categories: ["DATA 1", "DATA 2", "DATA 3", "DATA 4", "DATA 5"],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px'
        }
      }
    }
  });

  
  useEffect(() => {
    setOptions({
        colors: backgroundColors,
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
                text: props.ValueLowest === true ? props.LowestValueTitle&& props.LowestValueTitle+ " - " + minDataValue || 'Lowest' + " - " + minDataValue  :
                props.LowestValueTitle ||'Lowest',
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
}

export default Chart35;