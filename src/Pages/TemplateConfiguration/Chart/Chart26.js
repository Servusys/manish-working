import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const Chart12 = (props) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Data",
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7],
      },
    ],
    options: {
      chart: {
        height: "100%",
        type: "line",
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        tickAmount: 10,
        title: {
          text: props.XAxis,
          style: {
            fontSize: props.FontSize || "14px",
            color: props.TextColor || "green",
          },
        },
        labels: {
          show: props.LebalX === false ? false : true,
        }
      },
      yaxis: {
        tickAmount: 10,
        title: {
          text: props.YAxis,
          style: {
            fontSize: props.FontSize || "14px",
            color: props.TextColor || "black",
          },
        },
        labels: {
          show: props.LebalY === false ? false : true,
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: props.Color || ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
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
          },
        }
      },
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
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
        forecastDataPoints: {
          count: 7,
        },
        stroke: {
          curve: props.StrokeLine || "straight",
          dashArray: props.LineTpyeSD || 0,
          width: props.LineWidth || 5,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          formatter: function (val, opts) {
            if (props.DataLabels === "all") {
              return val.toFixed(0);
            } else if (props.DataLabels === "min") {
              if (opts.seriesIndex === 0) {
                if (val === Math.min(...state.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "max") {
              if (opts.seriesIndex === 0) {
                if (val === Math.max(...state.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "both") {
              if (opts.seriesIndex === 0) {
                if (
                  val === Math.max(...state.series[0].data) ||
                  val === Math.min(...state.series[0].data)
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
          tickAmount: 10,
          title: {
            text: props.axisX === true ? props.XAxis : '',
            style: {
              fontSize: props.FontSize || "14px",
              color: props.TextColor || "green",
            },
          },
          labels: {
            show: props.LebalX === false ? false : true,
            style: {
              colors: props.LavelXColor || "black"
            },
          },
          show: props.axisX !== false,
        },
        yaxis: {
          tickAmount: 10,
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
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: props.Color || ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
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
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          formatter: function (val, opts) {
            if (props.DataLabels === "all") {
              return val.toFixed(0);
            } else if (props.DataLabels === "min") {
              if (opts.seriesIndex === 0) {
                if (val === Math.min(...state.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "max") {
              if (opts.seriesIndex === 0) {
                if (val === Math.max(...state.series[0].data)) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            } else if (props.DataLabels === "both") {
              if (opts.seriesIndex === 0) {
                if (
                  val === Math.max(...state.series[0].data) ||
                  val === Math.min(...state.series[0].data)
                ) {
                  return val.toFixed(0);
                } else {
                  return "";
                }
              }
            }
          },
        },
      },
    }));

    const maxDataValue = Math.max(...state.series[0].data);
    const minDataValue = Math.min(...state.series[0].data);

    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        annotations: {
          yaxis: [
            props.TargetDisplay === true &&
            {
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
            props.PeakDisplay === true &&
            {
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
                text: props.ValuePeak === true ? props.PeakValueTitle && props.PeakValueTitle + " - " + maxDataValue || 'Peak' + " - " + maxDataValue : props.PeakValueTitle || 'Peak',
              },
            },
            props.LowestDisplay === true &&
            {
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
    }));
  }, [props]);

  
  return (
    <>
      <ReactApexChart
        options={state?.options}
        series={state?.series}
        type="line"
        height={"100%"}
        style={{ backgroundColor: props.BackgroundColor || "transparent" }}
      />
    </>
  );
};

export default Chart12;