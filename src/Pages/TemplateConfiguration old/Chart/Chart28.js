import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const Chart28 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#26a0fc",
    "#26e7a6",
  ]).map(color => color);
  
  const seriesData = [
    {
      name: "DATA 1",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      color: backgroundColors[0],
    },
    {
      name: "DATA 2",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      color: backgroundColors[1],
    },
  ];

  const maxDataValue = Math.max(...seriesData.map(series => Math.max(...series.data)));
  const minDataValue = Math.min(...seriesData.map(series => Math.min(...series.data)));

  const chartData = {
    series: seriesData,
    options: {
      chart: {
        height: "100%",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: [0, 4],
      },
      tooltip: {
        enabled: props.Tooltip === false ? false : true,
        shared: true,
        intersect: false
      },
      xaxis: {
        title: {
          text: props.axisX === true ? props.XAxis : '' ,
          style: {
            fontSize: props.FontSize || "14px",
            color: props.TextColor || "black",
          },
        },
        labels:{
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
          text: props.axisY === true ? props.YAxis : '' ,
          style: {
            fontSize: props.FontSize || 14,
            color: props.TextColor || "black",
          },
        },
        labels:{
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
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1],
        formatter: function (val, opts) {
          const seriesData = chartData.series[opts.seriesIndex].data;
          if (props.DataLabels === "all") {
              return val.toFixed(0);
          } else if (props.DataLabels === "min") {
              if (val === Math.min(...seriesData)) {
                  return val.toFixed(0);
              } else {
                  return '';
              }
          } else if (props.DataLabels === "max") {
              if (val === Math.max(...seriesData)) {
                  return val.toFixed(0);
              } else {
                  return '';
              }
          } else if (props.DataLabels === "both") {
              const minValue = Math.min(...seriesData);
              const maxValue = Math.max(...seriesData);
              if (val === minValue || val === maxValue) {
                  return val.toFixed(0);
              } else {
                  return '';
              }
          }
        }
      },
      annotations: {
        yaxis: [
          props.TargetDisplay === true && {
            y: props.TargetValue || 20,
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
            y: maxDataValue,
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
        ],
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={"100%"}
      style={{ backgroundColor: props.BackgroundColor || "transparent" }}
    />
  );
};

export default Chart28;
