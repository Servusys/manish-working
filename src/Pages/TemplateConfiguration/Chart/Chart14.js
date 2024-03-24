import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css';

const Chart14 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#0073ff",
]).map(color => color);

  const [chartData, setChartData] = useState({
    series: [{
      data: [0, 400, 430, 448, 470, 540],

    }],
    options: {
      chart: {
        type: 'bar',
        height: '100%'
      },
      tooltip: {
        enabled: props.Tooltip === false? false : true,
      },
      colors: backgroundColors,
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['A', 'B', 'C', 'D', 'E'],
        title: {
          text: props.XAxis,
          style: {
            fontSize: props.FontSize || 14,
            color: props.TextColor || "black",
          },
        },
      },
      yaxis: {
        title: {
          text: props.YAxis,
          style: {
            fontSize: props.FontSize || 14,
            color: props.TextColor || "black",
          },
        },
      },
      grid: {
        show: true,
        borderColor:  "#f0f0f0",
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
        data: [400, 430, 448, 470, 540],
      }],
      options: {
        chart: {
          type: 'bar',
          height: '100%'
        },
        tooltip: {
          enabled: props.Tooltip === false? false : true,
        },
        colors: backgroundColors,
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
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
                if (val === Math.min(...chartData.series[0].data)) {
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
            }
          },
        },
        xaxis: {
          categories: ['A', 'B', 'C', 'D', 'E'],
          title: {
            text: props.axisX === true ? props.XAxis : '' ,
            style: {
              fontSize: props.FontSize || 14,
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
          borderColor:  "#f0f0f0",
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
          },
        },
      }
    });

    const maxDataValue = Math.max(...chartData.series[0].data);
    const minDataValue = Math.min(...chartData.series[0].data);
  
  
    setChartData((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        annotations: {
          xaxis: [
            props.TargetDisplay === true && {
              x: props.TargetValue || 200,
              borderColor: props.TargetLineDisplay ? props.TargetValueLineColor || '#0073ff' : "",
              label: {
                borderColor: props.TargetValueLineColor || '#0073ff',
                offsetY: +props.PositionTargetTB || 0,
                offsetX: +props.PositionTargetLR || 0,
                style: {
                  color: props.LableTextColorTarget || '#fff',
                  background: props.TargetValueLineColor || '#0073ff',
                  fontSize: props.FontSizeTarget,
                  textAlign: 'left',
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
                  background: props.PeakValueC || '#ff0000',
                  fontSize: props.FontSizePeak || '12px'
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
    <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={'100%'} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
  );
};

export default Chart14;
