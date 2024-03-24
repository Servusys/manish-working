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
        labels:{
          show: props.LebalX === false ? false : true,
          style: {
            colors: props.LavelXColor || "black"
          },
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
        labels:{
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
        enabled: props.Tooltip === false? false : true,
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
          labels:{
            show: props.LebalX === false ? false : true,
          },
          show: props.axisX !== false,
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
          labels:{
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
          enabled: props.Tooltip === false? false : true,
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
        }
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
                text: props.ValuePeak === true ? props.PeakValueTitle&& props.PeakValueTitle+ " - " + maxDataValue || 'Peak' + " - " + maxDataValue  :
                props.PeakValueTitle ||'Peak',
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


// import ReactApexChart from 'react-apexcharts';
// import { faker } from '@faker-js/faker';

// const Chart10 = (props) => {
//   const g= ['Feb', 'Mar', 'Apr', 'May'];
//   const seriesColors = ['#008FFB', '#00E396', '#FEB019'];

//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         name: 'Net Profit',
//         data: g.map(() => faker.number.int({ min: 100, max: 1000 })),
//         color: seriesColors[0], // Assign color to the series
//       },
//       {
//         name: 'Revenue',
//         data: g.map(() => faker.number.int({ min: 100, max: 1000 })),
//         color: seriesColors[1], // Assign color to the series
//       },
//       {
//         name: 'Free Cash Flow',
//         data: g.map(() => faker.number.int({ min: 100, max: 1000 })),
//         color: seriesColors[2], // Assign color to the series
//       },
//     ],
//     options: {
//       chart: {
//         type: 'bar',
//         // background:'red'
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '75%',
//           endingShape: 'rounded',
//         },
//       },
//       dataLabels: {
//         enabled: true,
//         rotate: -90, // Rotate data labels vertically
//         offsetX: -0, // Adjust horizontal position
//         offsetY: -10, // Adjust vertical position
//         style: {
//           fontSize: '12px',
//           colors: ['#333'],
//         },
//       },
//       stroke: {
//         show: true,
//         width: 1,
//         colors: ['transparent'],
//       },
//       xaxis: {
//         categories: ['Feb', 'Mar', 'Apr', 'May'],
//         labels: {
//           show: false, // Set to false to hide y-axis labels
//         },
//       },
//       yaxis: {
//         title: {
//           text: '(thousands)',
//           show: false, // Set to false to hide the y-axis title
//         },
//         labels: {
//           show: false, // Set to false to hide y-axis labels
//         },
//       },
      
//       fill: {
//         opacity: 1,
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return '$ ' + val + ' thousands';
//           },
//         },
//       },
//       annotations: {
//         yaxis: [],
//       },
//       toolbar: {
//         show: false,
//       },
//       grid: {
//         show: true, // Set to false to hide the grid lines initially
//         borderColor: '#e0e0e0', // Set the border color of the grid lines
//         strokeDashArray: 10, // Set the dash array for grid lines
//         xaxis: {
//           lines: {
//             show: true, // Show/hide x-axis grid lines
//           },
//         },
//         yaxis: {
//           lines: {
//             show: true, // Show/hide y-axis grid lines
//           },
//         },
//       },
//     },
//   });

//   const updateChartData = () => {
//     const maxDataValue = Math.max(...chartData.series.flatMap(serie => serie.data));
//     const minDataValue = Math.min(...chartData.series.flatMap(serie => serie.data));

//     setChartData((prevState) => ({
//       series: prevState.series,
//       options: {
//         ...prevState.options,
//         annotations: {
//           yaxis: [
//             {
//               y: 500,
//               borderColor: '#ff0000',
//               label: {
//                 borderColor: '#ff0000',
//                 style: {
//                   color: '#fff',
//                   background: '#ff0000',
//                 },
//                 text: 'Target',
//               },
//             },
//             {
//               y: maxDataValue,
//               borderColor: '#00ff00',
//               label: {
//                 borderColor: '#00ff00',
//                 style: {
//                   color: '#fff',
//                   background: '#00ff00',
//                 },
//                 text: 'Peak',
//               },
//             },
//             {
//               y: minDataValue,
//               borderColor: '#0000ff',
//               label: {
//                 borderColor: '#0000ff',
//                 style: {
//                   color: '#fff',
//                   background: '#0000ff',
//                 },
//                 text: 'Lowest',
//               },
//             },
//           ],
//         },
//       },
//     }));
//   };


//   useEffect(() => {
//     updateChartData();
//   }, [props]);

//   return (
//     <>
//       <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />
//     </>
//   );
// };

// export default Chart10;