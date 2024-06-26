import React from "react";
import { Chart } from "react-google-charts";
import './Chart.css'

export const data = [
    [
        "Employee Name",
        { type: "date", label: "Start Date (Long)" },
        { type: "date", label: "Start Date (Medium)" },
        { type: "date", label: "Start Date (Short)" },
    ],
    [
        "Mike",
        new Date(2008, 1, 28, 0, 31, 26),
        new Date(2008, 1, 28, 0, 31, 26),
        new Date(2008, 1, 28, 0, 31, 26),
    ],
    [
        "Bob",
        new Date(2007, 5, 1, 0),
        new Date(2007, 5, 1, 0),
        new Date(2007, 5, 1, 0),
    ],
    [
        "Alice",
        new Date(2006, 7, 16),
        new Date(2006, 7, 16),
        new Date(2006, 7, 16),
    ],
];

export const options = {
    showRowNumber: true,
};

export const formatters = [
    {
        type: "DateFormat",
        column: 1,
        options: {
            formatType: "long",
        },
    },
    {
        type: "DateFormat",
        column: 2,
        options: {
            formatType: "medium",
        },
    },
    {
        type: "DateFormat",
        column: 3,
        options: {
            formatType: "short",
        },
    },
];

export default function Chart36() {
    return (
        <Chart
            chartType="Table"
            width="100%"
            height="400px"
            data={data}
            options={options}
            formatters={formatters}
        />
    );
}
