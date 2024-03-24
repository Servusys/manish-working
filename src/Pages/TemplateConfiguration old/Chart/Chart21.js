import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart21 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#00E396",
    "#775DD0",
  ]).map(color => color);
  const [series, setSeries] = useState([
    {
      name: 'Actual',
      data: [
        {
          x: '2011',
          y: 1292,
          goals: [
            {
              name: 'Expected',
              value: 1400,
              strokeHeight: 5,
              strokeColor: backgroundColors[0] || '#775DD0',
            }
          ]
        },
        {
          x: '2012',
          y: 4932,
          goals: [
            {
              name: 'Expected',
              value: 5400,
              strokeHeight: 5,
              strokeColor: backgroundColors[0] || '#775DD0'
            }
          ]
        },
        {
          x: '2013',
          y: 3832,
          goals: [
            {
              name: 'Expected',
              value: 4400,
              strokeHeight: 5,
              strokeColor: backgroundColors[0] || '#775DD0'
            }
          ]
        },
        {
          x: '2014',
          y: 2432,
          goals: [
            {
              name: 'Expected',
              value: 3400,
              strokeHeight: 5,
              strokeColor: backgroundColors[0] || '#775DD0'
            }
          ]
        },
        {
          x: '2015',
          y: 3432,
          goals: [
            {
              name: 'Expected',
              value: 3900,
              strokeHeight: 5,
              strokeColor: backgroundColors[0] || '#775DD0'
            }
          ]
        },
      ]
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
        columnWidth: '60%'
      }
    },
    colors: backgroundColors[1] || ['#00E396'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: props.LegendDisplay === false ? false : true,
      position: props.position ? props.position : "top",
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      labels: {
        colors: props.LegendTextColor || "black",
      },
      markers: {
        fillColors: backgroundColors || ['#00E396', '#775DD0']
      }
    }
  });

  useEffect(() => {
    setSeries([
      {
        name: 'Actual',
        data: [
          {
            x: '2011',
            y: 1292,
            goals: [
              {
                name: 'Expected',
                value: 1400,
                strokeHeight: 5,
                strokeColor: backgroundColors[0] || '#775DD0',
              }
            ]
          },
          {
            x: '2012',
            y: 4932,
            goals: [
              {
                name: 'Expected',
                value: 5400,
                strokeHeight: 5,
                strokeColor: backgroundColors[0] || '#775DD0'
              }
            ]
          },
          {
            x: '2013',
            y: 3832,
            goals: [
              {
                name: 'Expected',
                value: 4400,
                strokeHeight: 5,
                strokeColor: backgroundColors[0] || '#775DD0'
              }
            ]
          },
          {
            x: '2014',
            y: 2432,
            goals: [
              {
                name: 'Expected',
                value: 3400,
                strokeHeight: 5,
                strokeColor: backgroundColors[0] || '#775DD0'
              }
            ]
          },
          {
            x: '2015',
            y: 3432,
            goals: [
              {
                name: 'Expected',
                value: 3900,
                strokeHeight: 5,
                strokeColor: backgroundColors[0] || '#775DD0'
              }
            ]
          },
        ]
      }
    ])
  }, [props, series])

  useEffect(() => {
    setOptions({
      colors: backgroundColors[1] || ['#00E396'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        formatter: function (val, opts) {
          if (props.DataLabels == "all") {
            return val.toFixed(0);
          } else if (props.DataLabels == "min") {
            if (opts.seriesIndex === 0) {
              // Find minimum value in current series data
              const minValue = Math.min(...series[opts.seriesIndex].data.map(dataPoint => dataPoint.y));
              // Check if current value is the minimum value
              if (val === minValue) {
                return val.toFixed(0);
              } else {
                return '';
              }
            }
          } else if (props.DataLabels == "max") {
            if (opts.seriesIndex === 0) {
              // Find maximum value in current series data
              const maxValue = Math.max(...series[opts.seriesIndex].data.map(dataPoint => dataPoint.y));
              // Check if current value is the maximum value
              if (val === maxValue) {
                return val.toFixed(0);
              } else {
                return '';
              }
            }
          }
          else if (props.DataLabels == "both") {
            if (opts.seriesIndex === 0) {
              // Find minimum and maximum values in current series data
              const minValue = Math.min(...series[opts.seriesIndex].data.map(dataPoint => dataPoint.y));
              const maxValue = Math.max(...series[opts.seriesIndex].data.map(dataPoint => dataPoint.y));
              // Check if current value is either minimum or maximum value
              if (val === minValue || val === maxValue) {
                return val.toFixed(0);
              } else {
                return '';
              }
            }
          }
        }
      },
      legend: {
        show: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        showForSingleSeries: true,
        customLegendItems: ['Actual', 'Expected'],
        labels: {
          colors: props.LegendTextColor || "black",
        },
        markers: {
          fillColors: backgroundColors || ['#00E396', '#775DD0']
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
          text: props.ValuePeak === true ? props.PeakValueTitle && props.PeakValueTitle + " - " + maxDataValue || 'Peak' + " - " + maxDataValue :
            props.PeakValueTitle || 'Peak',
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
          text: props.ValueLowest === true ? props.LowestValueTitle && props.LowestValueTitle + " - " + 1 || 'Lowest' + " - " + 1 :
            props.LowestValueTitle || 'Lowest',
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

export default Chart21;
