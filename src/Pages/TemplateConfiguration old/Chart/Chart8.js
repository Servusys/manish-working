import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const generateRandomData = (existingData) => {
  const currentTime = new Date().getTime();
  // const newDataPoint = {
  //   x: currentTime,
  //   y: Math.round(Math.random() * 5), // Generate a random positive integer value
  // };
  // const updatedData = [...existingData, newDataPoint];

  const newDataPoint = {
    x: currentTime,
    y: Math.round(Math.random() * 500),
  };
  let updatedData = [...existingData, newDataPoint];
  if (existingData?.length == 5) updatedData = [...existingData.splice(0, 1), newDataPoint];

  // Find the index of the maximum value in the updated data
  const maxIndex = updatedData.reduce((maxIndex, point, currentIndex, arr) => (point.y > arr[maxIndex].y ? currentIndex : maxIndex), 0);

  // Find the index of the minimum value in the updated data
  const minIndex = updatedData.reduce((minIndex, point, currentIndex, arr) => (point.y < arr[minIndex].y ? currentIndex : minIndex), 0);

  // Calculate the average value
  const sum = updatedData.reduce((acc, point) => acc + point.y, 0);
  const avg = sum / updatedData.length;

  


  return { updatedData, maxIndex, minIndex,avg };
};
const calculateMovingAverage = (data, windowSize) => {
  const movingAverage = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const end = i + 1;
    const sum = data.slice(start, end).reduce((acc, point) => acc + point.y, 0);
    movingAverage.push({ x: data[i].x, y: (sum / (end - start)).toFixed(0) });
  }
  return movingAverage;
};
const Chart8 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#008FFB",
  ]).map(color => color);

  const [chartData, setChartData] = useState({
    series: [{
      color: backgroundColors[0],
        data: [],
      },
      {
        data: [],
        color: backgroundColors[1], // Adjust color as needed
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: "100%",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (val) {
            const date = new Date(val);
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          },
          show: props.LebalX === false ? false : true,
          style: {
            colors: props.LavelXColor || "black"
          },
        },
        title: {
          text: props.XAxis,
          style: {
            fontSize: props.FontSize || "14px",
            color: props.TextColor || "green",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value).toString();
          },
          show: props.LebalY === false ? false : true,
          style: {
            colors: props.LavelYColor || "black"
          }
        },
        title: {
          text: props.YAxis,
          style: {
            fontSize: props.FontSize || "14px",
            color: props.TextColor || "green",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const index = opts.dataPointIndex;
          const maxIndex = opts.w.globals.series[0].reduce((maxIndex, value, currentIndex, arr) => (value.y > arr[maxIndex].y ? currentIndex : maxIndex), 0);
          const minIndex = opts.w.globals.series[0].reduce((minIndex, value, currentIndex, arr) => (value.y < arr[minIndex].y ? currentIndex : minIndex), 0);
          
          if (index === maxIndex) {
            return `Max: ${val}`;
          } else if (index === minIndex) {
            return `Min: ${val}`;
          } else {
            return '';
          }
        },
      },
      legend: {
        show: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
      },
      tooltip: {
        enabled: props.Tooltip === false ? false : true,
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
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData((prevData) => {
        const { updatedData, maxIndex, minIndex } = generateRandomData(prevData.series[0].data);
        const movingAverage = calculateMovingAverage(updatedData, 5);
        return {
          series: [{
            data: updatedData,
          },
          {
            data: movingAverage,
          },],
          options: {
            chart: {
              type: 'line',
            },
            dataLabels: {
              enabled: true,
              formatter: function (val, opts) {
                const index = opts.dataPointIndex;
                if (index === maxIndex) {
                  return `Max: ${val}`;
                } else if (index === minIndex) {
                  return `Min: ${val}`;
                } else {
                  return '';
                }
              },
            },
          },
        };
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [props.Color]);

  useEffect(() => {
    setChartData(prevChartData => {
      return {
        ...prevChartData,
        series: [{
          ...prevChartData.series[0],
          color: backgroundColors[0],
        }],
        options: {
          ...prevChartData.options,
          xaxis: {
            ...prevChartData.options.xaxis,
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
            ...prevChartData.options.yaxis,
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
          legend: {
            show: props.LegendDisplay === false ? false : true,
            position: props.position ? props.position : "top",
            labels: {
              colors: props.LegendTextColor || "black",
            },
          },
          tooltip: {
            enabled: props.Tooltip === false ? false : true,
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
          stroke: {
            curve: props.StrokeLine || "straight",
            dashArray: props.LineTpyeSD || 0,
            width: props.LineWidth || 5,
          },
        },
      };
    });

  }, [props.XAxis, props.LegendTextColor, props.LineWidth, props.LineTpyeSD, props.StrokeLine, props.LavelYColor, props.LavelXColor, props.YAxis, props.LebalY, props.LebalX, props.TextColor, props.FontSize, props.LegendDisplay, props.position, props.Tooltip, props.gridX, props.gridY, props.Color]);

  useEffect(() => {
    const maxDataValue = Math.max(...chartData.series[0].data.map(point => point.y));
    const minDataValue = Math.min(...chartData.series[0].data.map(point => point.y));
    // Calculate the average value
    const sum = chartData.series[0].data.reduce((acc, point) => acc + point.y, 0);
    const avg = sum / chartData.series[0].data.length;

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
        y: avg,
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
          text: props.AverageValueTitle || 'Avg '+avg.toFixed(2),
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

    setChartData(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        annotations: {
          ...prevState.options.annotations,
          yaxis: newAnnotations,
        },
      },
    }));
  }, [props.TargetDisplay, props.TargetValue, props.TargetValueLineColor, props.LabelTextColorTarget, props.TargetValueTitle, props.FontSizeTarget, props.PeakDisplay, props.PeakValueC, props.PeakValueTitle, props.LowestDisplay, props.LowestValueC, props.LowestValueTitle, props.PositionLowestTB, props.PositionLowestLR, , props.LowestLineDisplay, props.FontSizeLowest, props.PeakLineDisplay, props.PositionPeakTB, props.PositionPeakLR, props.FontSizePeak, props.TargetLineDisplay, props.PositionTargetTB, props.PositionTargetLR, chartData.series]);


  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      color={props.Color || '#008FFB'}
      height={props.height - 20 || "100%"}
      style={{ backgroundColor: props.BackgroundColor || "transparent" }}
      width={props.width - 20 || "100%"}
    />
  );
};

export default Chart8;