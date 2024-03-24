import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

const Chart30 = (props) => {
    const backgroundColors = (props?.Color?.length ? props.Color : [
        "#26a0fc",
        "#26e7a6",
        "#c4b8b8",
      ]).map(color => color);

    const [series, setSeries] = useState([
        {
            name: 'South',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },
        {
            name: 'North',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 20
            })
        },
        {
            name: 'Central',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 15
            })
        }
    ]);

    const [options, setOptions] = useState({
        chart: {
            type: 'area',
            height: "100%",
            stacked: true,
            events: {
                selection: function (chart, e) {
                    // console.log(new Date(e.xaxis.min));
                }
            }
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        xaxis: {
            type: 'datetime'
        }
    });

    useEffect(() => {
        setOptions(prevOptions => ({
          ...prevOptions,
          chart: {
            type: 'bar',
            height: "100%",
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: backgroundColors,
          dataLabels: {
            enabled: true,
            enabledOnSeries: [0, 1, 2],
            formatter: function (val, opts) {
                if (props.DataLabels === "all") {
                    return val.toFixed(0);
                } else if (props.DataLabels === "min") {
                    if (val === Math.min(...series[opts.seriesIndex].data.map(item => item[1]))) {
                        return val.toFixed(0);
                    } else {
                        return '';
                    }
                } else if (props.DataLabels === "max") {
                    if (val === Math.max(...series[opts.seriesIndex].data.map(item => item[1]))) {
                        return val.toFixed(0);
                    } else {
                        return '';
                    }
                } else if (props.DataLabels === "both") {
                    const minValue = Math.min(...series[opts.seriesIndex].data.map(item => item[1]));
                    const maxValue = Math.max(...series[opts.seriesIndex].data.map(item => item[1]));
                    if (val === minValue || val === maxValue) {
                        return val.toFixed(0);
                    } else {
                        return '';
                    }
                }
            }
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
            ...prevOptions.xaxis,
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
        }));
      }, [props]);

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
                background: props.PeakValueC || '#ff0000',
                fontSize: props.FontSizePeak || '12px'
              },
              text: props.ValuePeak === true ? props.PeakValueTitle && props.PeakValueTitle + " - " + maxDataValue || 'Peak' + " - " + maxDataValue : props.PeakValueTitle || 'Peak',
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
              text: props.ValueLowest === true ? props.LowestValueTitle&& props.LowestValueTitle+ " - " + minDataValue || 'Lowest' + " - " + minDataValue : props.LowestValueTitle || 'Lowest',
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
        <ReactApexChart options={options} series={series} type="area" height={"100%"} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />
    );
};

export default Chart30;