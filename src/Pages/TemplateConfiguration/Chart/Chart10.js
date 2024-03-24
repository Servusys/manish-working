import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const generateRandomData = (count) => {
  const data = [];
  const currentTime = new Date().getTime();
  for (let i = 0; i < count; i++) {
    const newDataPoint = {
      x: currentTime - (count - i) * 5000,
      y: Math.round(Math.random() * 5),
    };
    data.push(newDataPoint);
  }
  return data;
};

const Chart10 = (props) => {
  const backgroundColors = (props?.Color?.length ? props.Color : [
    "#008FFB",
  ]).map(color => color);

  const [chartData, setChartData] = useState({
    series: [{
      data: generateRandomData(5),
      color: backgroundColors[0],
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      // rest of your options
    },
  });

  // useEffect for your data update interval

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      color={props.Color || '#008FFB'}
      height={props.height - 20 || "100%"}
      style={{ backgroundColor: props.BackgroundColor || "transparent" }}
      width={props.width - 20 || "100%"}
    />
  );
};

export default Chart10;
