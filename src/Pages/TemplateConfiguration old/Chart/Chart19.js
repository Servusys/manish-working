import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Chart.css';

const Chart19 = (props) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chartData = {
                labels: ['2011', '2012', '2013', '2014', '2015', '2016'],
                datasets: [{
                    label: 'Actual',
                    data: [12, 44, 54, 66, 81, 67],
                    backgroundColor: props.Color || '#00E396',
                    borderColor: props.Color || '#00E396',
                    borderWidth: 1,
                    type: 'bar'
                }, {
                    label: 'Expected',
                    data: [14, 54, 52, 61, 66, 70],
                    borderColor: props.Color || '#775DD0',
                    borderWidth: 1,
                    borderDash: [2],
                    pointStyle: 'rectRounded',
                    radius: 0,
                    type: 'line'
                }]
            };

            const options = {
                plugins: {
                    legend: {
                        display: props.LegendDisplay === false ? false : true,
                        position: props.position ? props.position : "top",
                        labels: {
                            colors: props.LegendTextColor || "black",
                            usePointStyle: true,
                            generateLabels: function (chart) {
                                const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                labels.forEach(label => {
                                    if (label.text === 'Expected') {
                                        label.strokeStyle = props.Color || '#775DD0';
                                    }
                                });
                                return labels;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            color: props.TextColor || "black",
                            display: props.axisX === false ? false : true,
                            text: props.XAxis,
                            font: {
                                size: props.FontSize || 14,
                            }
                        },
                        grid: {
                            display: props.gridX === false ? false : true,
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                    y: {
                        title: {
                            display: props.axisY === false ? false : true,
                            color: props.TextColor || "black",
                            text: props.YAxis,
                            font: {
                                size: props.FontSize || 14,
                            }
                        },
                        grid: {
                            display: props.gridY === false ? false : true,
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                    }
                }
            };

            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: options
            });

            return () => chartInstance.destroy();
        }
    }, [props]);

    return <canvas ref={chartRef} style={{ backgroundColor: props.BackgroundColor || "transparent" }} />;
};

export default Chart19;
