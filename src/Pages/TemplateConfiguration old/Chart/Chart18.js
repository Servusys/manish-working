

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css'

const Chart15 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#26a0fc",
    "#26e7a6",
  ]).map(color => color);

  var options = {
    series: [{
      name: 'Data 1',
      data: [44, 55, 41, 37, 22, 43, 21],
      color: backgroundColors[0],
    }, {
      name: 'Data 2',
      data: [53, 32, 33, 52, 13, 43, 32],
      color: backgroundColors[1],
    }, {
      name: 'Data 3',
      data: [12, 17, 11, 9, 15, 11, 20],
      color: backgroundColors[2],
    }, {
      name: 'Data 4',
      data: [9, 7, 5, 8, 6, 9, 4],
      color: backgroundColors[3],
    }],
    chart: {
      type: 'bar',
      height: 350,
      // stacked: true,
      stacked: props.Stacked === true ? true : false,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      formatter: function (val, opts) {
        if (props.DataLabels === "all") {
          return val.toFixed(0);
        } else if (props.DataLabels === "min") {
          if (opts.seriesIndex === 0) {
            if (val === Math.min(...options.series[0].data)) {
              return val.toFixed(0);
            } else {
              return "";
            }
          }
        } else if (props.DataLabels === "max") {
          if (opts.seriesIndex === 0) {
            if (val === Math.max(...options.series[0].data)) {
              return val.toFixed(0);
            } else {
              return "";
            }
          }
        } else if (props.DataLabels === "both") {
          if (opts.seriesIndex === 0) {
            if (
              val === Math.max(...options.series[0].data) ||
              val === Math.min(...options.series[0].data)
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
      width: 2,
    },
    tooltip: {
      enabled: props.Tooltip === false ? false : true,
    },
    fill: {
      type: 'bar',
      opacity: 1,
    },
    states: {
      hover: {
        filter: 'none'
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
      categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      tickAmount: 10,
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
    annotations: {
      xaxis: [
        props.TargetDisplay === true && {
          x: props.TargetValue || 20,
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
            text: props.ValueTarget === true ? props.TargetValueTitle && props.TargetValueTitle + " - " + props.TargetValue || 'Target' + " - " + props.TargetValue :
              props.TargetValueTitle || 'Target',
          },
        },
        props.PeakDisplay === true && {
          x: 120,
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
            text: props.ValuePeak === true ? props.PeakValueTitle && props.PeakValueTitle + " - " + 120 || 'Peak' + " - " + 120 :
              props.PeakValueTitle || 'Peak',
          },
        },
        props.LowestDisplay === true && {
          x: 0,
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
            text: props.ValueLowest === true ? props.LowestValueTitle && props.LowestValueTitle + " - " + 1 || 'Lowest' + " - " + 1 :
              props.LowestValueTitle || 'Lowest',
          },
        },
      ],
    },
  }


  return (
    <ReactApexChart options={options} series={options.series} type="bar" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
  );

}
export default Chart15