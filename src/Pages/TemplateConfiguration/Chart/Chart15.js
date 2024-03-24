import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css'

const Chart15 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#26a0fc",
    "#26e7a6",
  ]).map(color => color);


  const [chartData, setChartData] = useState({
    series: [{
      data: [44, 55, 41, 64, 22, 43, 21],
    }, {
      data: [53, 32, 33, 52, 13, 44, 32],
    }],

    options: {
      chart: {
        type: 'bar',
        height: "100%"
      },
      colors: backgroundColors,
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: props.position ? props.position : "top",
          },
        }
      },
      dataLabels: {
        enabled: true,
        position: "center",
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const series = w.globals.series[seriesIndex];
          const maxIndex = series.indexOf(Math.max(...series));
          const minIndex = series.indexOf(Math.min(...series));
          if (dataPointIndex === maxIndex || dataPointIndex === minIndex) {
            return value;
          } else {
            return '';
          }
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        enabled: props.Tooltip === false ? false : true,
        intersect: false
      },
      legend: {
        show: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
          colors: "#26a0fc", // Adjusted to 'fontColor' for Chart.js
        },
      },
      xaxis: {
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        title: {
          text: props.axisX === true ? props.XAxis : '',
          // text: props.XAxis,
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
    }
  });


  useEffect(() => {
    setChartData({
      series: [{
        data: [44, 55, 41, 64, 22, 43, 21],
        // style: {
        //   color: "#26a0fc",
        // },
      }, {
        data: [53, 32, 33, 52, 13, 44, 32],
        // style: {
        //   color: "#26e7a6",
        // },
      }],

      options: {
        chart: {
          type: 'bar',
          height: "100%",
          stacked: props.Stacked === true ? true : false,
        },
        colors: backgroundColors,
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: props.position ? props.position : "top",
            },
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0, 1],
          formatter: function (val, opts) {
            if (props.DataLabels === "all") {
              return val.toFixed(0);
            } else if (props.DataLabels === "min") {
              if (opts.seriesIndex === 0) {
                if (val === Math.min(...chartData.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
              else if (opts.seriesIndex === 1) {
                if (val === Math.min(...chartData.series[1].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "max") {
              if (opts.seriesIndex === 0) {
                if (val === Math.max(...chartData.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
              else if (opts.seriesIndex === 1) {
                if (val === Math.max(...chartData.series[1].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "both") {
              if (opts.seriesIndex === 0) {
                if (
                  val === Math.max(...chartData.series[0].data) ||
                  val === Math.min(...chartData.series[0].data)
                ) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
              if (opts.seriesIndex === 1) {
                if (
                  val === Math.max(...chartData.series[1].data) ||
                  val === Math.min(...chartData.series[1].data)
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
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          enabled: props.Tooltip === false ? false : true,
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
          title: {
            text: props.axisX === true ? props.XAxis : '',
            // text: props.XAxis,
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
      }
    })

    const maxDataValue = Math.max(...chartData.series.map(series => Math.max(...series.data)));
    const minDataValue = Math.min(...chartData.series.map(series => Math.min(...series.data)));

    setChartData((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
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
                text: props.ValueTarget === true ? props.TargetValueTitle && props.TargetValueTitle+ " - " + props.TargetValue || 'Target' + " - " + props.TargetValue  :
                props.TargetValueTitle ||'Target',
              },
            },
            props.PeakDisplay === true && {
              x: maxDataValue,
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
                text: props.ValuePeak === true ? props.PeakValueTitle&& props.PeakValueTitle+ " - " + maxDataValue || 'Peak' + " - " + maxDataValue  :
                props.PeakValueTitle ||'Peak',
              },
            },
            props.LowestDisplay === true && {
              x: minDataValue,
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
          ],
        },
      },
    }));

  }, [props]);

  return (
    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
  );
};

export default Chart15;