import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const GenderDiffChart = ({ percentage }: { percentage: number }) => {
  const data = [
    { name: "Men", menEarning: 1000 },
    { name: "Women", womenEarning: (1000 * (100 - percentage)) / 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={100}
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis type="number" domain={[0, 1000 * 1.1]} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="menEarning"
          fill="#00ED48"
          name="Men's Earning in AUD$"
          barSize={40}
          label={{ position: "insideRight", fill: "black", fontSize: 28 }}
        />
        <Bar
          dataKey="womenEarning"
          fill="#FF6B6B"
          name="Women's Earning in AUD$"
          barSize={40}
          label={{ position: "insideRight", fill: "black", fontSize: 28 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenderDiffChart;