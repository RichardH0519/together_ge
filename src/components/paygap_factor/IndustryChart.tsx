import { useEffect } from "react";
import Highcharts, { Options, SeriesBarOptions } from "highcharts";
import useApiRequest from "../reusable/ApiRequest";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const IndustryChart: React.FC = () => {
  const { data, loading, error } = useApiRequest("IndustryYear");

  useEffect(() => {
    if (data && data.length > 0) {
      const options: Options = {
        chart: {
          type: "bar",
          renderTo: "container-Industry",
        },
        title: {
          text: "Gender Pay Gap by Industry",
          align: "center",
        },
        xAxis: {
          categories: data.map((value) => value.Industry),
        },
        yAxis: {
          min: -5,
          title: {
            text: "Percent",
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>' +
            ": <b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
          shared: true,
        },
        legend: {
          reversed: true,
        },
        plotOptions: {
          bar: {
            borderRadius: 5, // Adjusted from "50%" to a number
            dataLabels: {
              enabled: true,
            },
            groupPadding: 0.1,
          },
        },
        series: [
          {
            type: "bar",
            name: "Industry",
            data: data.map((value) => parseFloat(value.gpg)),
          } as SeriesBarOptions,
        ],
      };

      Highcharts.chart(options);
    }
  }, [data]);

  // Handling loading and error states
  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: "400px", alignItems: "center" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    ); // Show the spinner while loading
  }

  if (error) {
    const errorMessage = error.message || 'An unknown error occurred.';
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div id="container-Industry" style={{ height: "400px" }}></div>
  );
};

export default IndustryChart;
