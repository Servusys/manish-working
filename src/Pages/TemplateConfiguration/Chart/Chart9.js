import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart9 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#008FFB",
  ]).map(color => color);

  const [series, setSeries] = useState([{
    name: "Desktops",
    data: [10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 10, 41, 35, 51, 41, 35, 51],
    color: backgroundColors[0],
  }]);
  const [options, setOptions] = useState({
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      } 
    },
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
    stroke: {
      curve: 'straight'
    },
    grid: {
      show: true,
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
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
      categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
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
          fontSize: props.FontSize || "14px",
          color: props.TextColor || "black",
        },
      },
      labels: {
        show: props.LebalY === false ? false : true,
      }
    },
  });

  useEffect(() => {
    setSeries([{
      ...series[0], // Keep other properties intact
      color: backgroundColors[0], // Update color
    }]);
  }, [props.Color]);

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
      grid: {
        show: true,
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
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
        categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
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
          }
        }
      },
      yaxis: {
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
          }
        }
      },
      stroke: {
        curve: props.StrokeLine || "straight",
        dashArray: props.LineTpyeSD || 0,
        width: props.LineWidth || 5,
      },
    })
  }, [props])

  useEffect(() => {
    // Update annotations
    const maxDataValue = Math.max(...series[0].data);
    const minDataValue = Math.min(...series[0].data);

    const sum = series[0].data.reduce((acc, val) => acc + val, 0); // Calculate the sum
    const avgValue = (sum / series[0].data.length); // Calculate the average

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
      props.AverageDisplay === true && {
        y: avgValue,
        borderColor: props.AverageLineDisplay ? props.AverageValueC || '#0073ff' : "",
        label: {
          borderColor: props.AverageValueC || '#0073ff',
          offsetY: +props.PositionAverageTB || 0,
          offsetX: +props.PositionAverageLR || 0,
          style: {
            color: props.LabelTextColorTarget || '#fff',
            background: props.AverageValueC || '#0073ff',
            fontSize: props.FontSizeAverage || '14px'
          },
          text: props.AverageValueTitle || 'Avg',
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

    setOptions(prevOptions => ({
      ...prevOptions,
      annotations: {
        yaxis: newAnnotations
      }
    }));
  }, [props.TargetDisplay, props.TargetValue, props.TargetValueLineColor, props.LabelTextColorTarget, props.TargetValueTitle, props.FontSizeTarget, props.PeakDisplay, props.PeakValueC, props.PeakValueTitle, props.LowestDisplay, props.LowestValueC, props.LowestValueTitle, props.PositionLowestTB, props.PositionLowestLR, props.LowestLineDisplay, props.FontSizeLowest, props.PeakLineDisplay, props.PositionPeakTB, props.PositionPeakLR, props.FontSizePeak, props.TargetLineDisplay, props.PositionTargetTB, props.PositionTargetLR, series]);


  // Calculate moving average
useEffect(() => {
  const data = series[0].data;
  const period = 5; // Default period is 5

  const movingAverage = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      let sum = 0;
      for (let j = i; j > i - period; j--) {
        sum += data[j];
      }
      movingAverage.push((sum / period));
    } else {
      movingAverage.push(null); // For the initial period where moving average cannot be calculated
    }
  }

  // Check the correct prop name 'props.MovingDisplay'
  props.MovingDisplay === true ? (      
    setSeries(prevSeries => [
      {
        ...prevSeries[0],
        name: "Data",
        data: prevSeries[0].data,
        color: backgroundColors[0],
      },
      {
        name: "Moving Average",
        data: movingAverage,
        color: props.MovingValueC || "#FF0000" // Default color is red
      }
    ])
  ) : (
    setSeries(prevSeries => [
      {
        ...prevSeries[0],
        name: "Data",
        data: prevSeries[0].data,
        color: backgroundColors[0],
      }
    ])
  )
}, [series, props.MovingDisplay, props.MovingValueC]);

  return (
    <ReactApexChart movingAverage={false} options={options} series={series} type="line" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
  );
};

export default Chart9;
