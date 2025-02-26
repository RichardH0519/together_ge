import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const IndustryDiffLineChart: React.FC = () => {
  const data = [
    {
      name: "Page A",
      woman: 4000,
      man: 2400,
    },
    {
      name: "Page B",
      woman: 3000,
      man: 1398,
    },
    {
      name: "Page C",
      woman: 2000,
      man: 9800,
    },
    {
      name: "Page D",
      woman: 2780,
      man: 3908,
    },
    {
      name: "Page E",
      woman: 1890,
      man: 4800,
    },
    {
      name: "Page F",
      woman: 2390,
      man: 3800,
    },
    {
      name: "Page G",
      woman: 3490,
      man: 4300,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="man"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="woman" stroke="#F33A6A" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default IndustryDiffLineChart;
