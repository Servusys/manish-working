import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart31 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#26a0fc",
    "#26e7a6",
  ]).map(color => color);
  const seriesData = [
    {
      name: 'Data A',
      type: 'area',
      data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33],
      color: backgroundColors[0],
    },
    {
      name: 'Data B',
      type: 'line',
      data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
      color: backgroundColors[1],
    }
  ];

  const maxDataValue = Math.max(...seriesData.map(series => Math.max(...series.data)));
  const minDataValue = Math.min(...seriesData.map(series => Math.min(...series.data)));

  const options = {
    chart: {
      height: "100%",
      type: 'line'
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'solid',
      opacity: [0.35, 1]
    },
    labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
    markers: {
      size: 0
    },
    tooltip: {
      enabled: props.Tooltip === false ? false : true,
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
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
  };

  return (
        <ReactApexChart options={options} series={seriesData} type="line" height={"100%"} />
  );
};

export default Chart31;