import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart32 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#26a0fc",
    "#26e7a6",
    '#f59740',
  ]).map(color => color);
  const [series, setSeries] = useState([
    {
      name: 'Data 1',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: 'Data 2',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Data 3',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }
  ]);

  const [options, setOptions] = useState({
    chart: {  
      type: 'bar',
      height: 350,
      stacked: props.Stacked === true ? true : false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: backgroundColors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  });

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      colors: backgroundColors,
      chart: {  
        type: 'bar',
        height: "100%",
        stacked: props.Stacked === true ? true : false,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        formatter: function (val, opts) {
          if (props.DataLabels == "all") {
            return val.toFixed(0);
          } else
            if (props.DataLabels == "min") {
              if (opts.seriesIndex === 0) {
                if (val === Math.min(...series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 1) {
                if (val === Math.min(...series[1].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 2) {
                if (val === Math.min(...series[2].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              }
            } else if (props.DataLabels == "max") {
              if (opts.seriesIndex === 0) {
                if (val === Math.max(...series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 1) {
                if (val === Math.max(...series[1].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 2) {
                if (val === Math.max(...series[2].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              }
            }
            else if (props.DataLabels == "both") {
              if (opts.seriesIndex === 0) {
                if (val === Math.max(...series[0].data) || val === Math.min(...series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 1) {
                if (val === Math.max(...series[1].data) || val === Math.min(...series[1].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              } else if (opts.seriesIndex === 2) {
                if (val === Math.max(...series[2].data) || val === Math.min(...series[2].data)) {
                  return val.toFixed(0);
                } else {
                  return '';
                }
              }
            }
        }
      },
      tooltip: {
        enabled: props.Tooltip === false ? false : true,
      },
      xaxis: {
        ...prevOptions.xaxis,
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
      legend: {
        show: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
          colors: props.LegendTextColor || "black",
        },
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
    }));
  }, [props]);

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
};

export default Chart32;