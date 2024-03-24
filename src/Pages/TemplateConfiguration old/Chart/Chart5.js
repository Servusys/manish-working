import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart5 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#4051b5",
    "#00a9f4",
    "#4baf4f",
    "#f9ce1c",
    "#ff9800",
  ]).map(color => color);
  const [series] = useState([44, 55, 41, 17, 15]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  });

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      legend: {
        show: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        labels: {
          colors: props.LegendTextColor || "black",
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
        }
      }],
      colors: backgroundColors,
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        formatter: function (val, opts) {
          if (props.DataLabels === "all") {
            return val.toFixed(0);
          } else if (props.DataLabels === "min") {
            if (opts.seriesIndex === 0) {
              return val === Math.min(...series) ? val.toFixed(0) : '';
            }
          } else if (props.DataLabels === "max") {
            if (opts.seriesIndex === 0) {
              return val === Math.max(...series) ? val.toFixed(0) : '';
            }
          } else if (props.DataLabels === "both") {
            if (opts.seriesIndex === 0) {
              const minVal = Math.min(...series);
              const maxVal = Math.max(...series);
              return val === minVal || val === maxVal ? val.toFixed(0) : '';
            }
          }
          return '';
        }
      },
    }));
  }, [props, props.DataLabels, series]);
  

  return (
        <ReactApexChart options={options} series={series} type="donut" width={"100%"} height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
  );
};

export default Chart5;
