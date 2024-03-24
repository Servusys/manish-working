

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart6 = (props) => {
  const [data, setData] = useState();
  
  const getData = async () => {
    const data = await axios.get(
        `${process.env.REACT_APP_BASE_URL}isleepData?category=${props?.categoryValue}&subcategory=${props?.subCategoryValue}&metrics=${props?.subvalue}`
    )
    console.log({ data });
    let series = [];
    let labels = [];
    if( data?.data?.message?.length){
    data?.data?.message?.map((i) => {
      series.push(i?.volume);
      labels.push(i?.labels||' ');
    });
    setData({
      labels,
      series,
    });}
    
    console.log({ labels }, { series });
  };
  useEffect(() => {
    if(props?.subvalue)  getData();
  }, [props?.subvalue]);

  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#008ffb",
    "#00e396",
    "#feb019",
    "#ff4560",
    "#775dd0",
  ]).map(color => color);
  const [chartState, setChartState] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'polarArea',
        color: backgroundColors,
      },
      labels: ['Data A', 'Data B', 'Data C', 'Data D', 'Data E'],
      legend: {
        display: props.LegendDisplay === false ? false : true,
        position: props.position ? props.position : "top",
        labels: {
          colors: props.LegendTextColor || "black",
        },
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
        }
      }]
    }
  });

  useEffect(() => {
    setChartState({
      series: data?.series || [44, 55, 13, 43, 22],
      options: {
        labels: data?.labels ||  ['Data A', 'Data B', 'Data C', 'Data D', 'Data E'],
        legend: {
          show: props.LegendDisplay === false ? false : true,
          position: props.position ? props.position : "top",
        },
        colors: backgroundColors // Updated here
      }
    });
  }, [props,data]);


  useEffect(() => {
    setChartState(prevState => {
      const newSeries = [...prevState.series];
      const newDataLabels = {
        enabled: true,
        formatter: function (val, opts) {
          const tot = newSeries.reduce((acc, curr) => acc + curr, 0); // total
          const min = Math.min(...newSeries).toFixed(1);
          const max = Math.max(...newSeries).toFixed(1);
          const mind = ((min * 100) / tot).toFixed(1);
          const maxd = ((max * 100) / tot).toFixed(1);

          if (props.DataLabels === "all") {
            if (val.toFixed(1) == maxd) {
              return 'Max: ' + val.toFixed(1) + '%';
            } else if (val.toFixed(1) == mind) {
              return 'Min: ' + val.toFixed(1) + '%';
            } else {
              return val.toFixed(1) + '%';
            }
          } else if (props.DataLabels === "min") {
            if (val.toFixed(1) == mind) {
              return 'Min: ' + val.toFixed(1) + '%';
            } else {
              return '';
            }
          } else if (props.DataLabels === "max") {
            if (val.toFixed(1) == maxd) {
              return 'Max: ' + val.toFixed(1) + '%';
            } else {
              return '';
            }
          } else if (props.DataLabels === "both") {
            if (val.toFixed(1) == maxd) {
              return 'Max: ' + val.toFixed(1) + '%';
            } else if (val.toFixed(1) == mind) {
              return 'Min: ' + val.toFixed(1) + '%';
            } else {
              return '';
            }
          }
        },
        offsetX: 0,
        offsetY: 0,
        background: {
          enabled: true,
          foreColor: '#000',
        },
      };

      const newOptions = {
        ...prevState.options,
        dataLabels: newDataLabels
      };

      return {
        series: newSeries,
        options: newOptions
      };
    });
  }, [props.DataLabels]);

  return (
    <ReactApexChart
      options={chartState.options}
      series={chartState.series}
      type="polarArea" // Changed type to donut
      width={'100%'}
      height={'100%'}
      style={{ backgroundColor: props.BackgroundColor || "transparent" }}
    />
  );
};

export default Chart6;

