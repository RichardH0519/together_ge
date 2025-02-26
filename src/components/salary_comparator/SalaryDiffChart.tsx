import React, { useEffect } from "react";
import { SalaryDatatype } from "./SalaryDatatype";
import Highcharts, { Options, SeriesColumnOptions } from "highcharts";

interface SalaryDiffChartProps {
  salary: SalaryDatatype;
}

const SalaryDiffChart: React.FC<SalaryDiffChartProps> = ({ salary }) => {
  const data = [
    {
      name: "Female",
      salary: salary.FemalesMedianweeklyearnings,
      color: "#F33A6A",
    },
    {
      name: "Person",
      salary: salary.PersonsMedianweeklyearnings,
      color: "#9F2B68",
    },
    {
      name: "Male",
      salary: salary.MalesMedianweeklyearnings,
      color: "#0000FF",
    },
  ];
  useEffect(() => {
    if (data && data.length > 0) {
      const options: Options = {
        chart: {
          type: "column",
          renderTo: "container-salarydiff",
        },
        title: {
          text: "Average weekly salary",
        },
        xAxis: {
          categories: data.map((value) => value.name),
        },
        yAxis: {
          title: {
            text: "Salary",
          },
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return (
              this.x +
              "<br/>" +
              "<br/>" +
              "<b>" +
              Highcharts.numberFormat(this.y, 0, ".", ",") +
              " $</b>"
            ); // Format with commas
          },
        },
        plotOptions: {
          column: {
            borderRadius: 5,
            dataLabels: {
              enabled: true,
              formatter: function () {
                return Highcharts.numberFormat(this.y, 0, ".", ",") + " $"; // Format with commas
              },
            },
            groupPadding: 0.1,
          },
        },
        series: [
          {
            type: "column",
            name: "Gender",
            // data: data.map((value) => parseFloat(parseFloat(value.salary).toFixed(2))),
            data: data.map((value) => ({
              y: parseFloat(parseFloat(value.salary).toFixed(2)),
              color: value.color, // Assign color for each bar
            })),
          } as SeriesColumnOptions,
        ],
      };

      Highcharts.chart(options);
    }
  }, [data]);

  return (
    <>
      <div id="container-salarydiff" style={{ height: "400px" }}></div>
    </>
  );
};

export default SalaryDiffChart;
