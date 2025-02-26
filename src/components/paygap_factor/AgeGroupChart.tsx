import { useEffect } from "react";
import Highcharts, { Options, SeriesColumnOptions } from "highcharts";
import useApiRequest from "../reusable/ApiRequest";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const AgeGroupChart: React.FC = () => {
  const { data, loading, error } = useApiRequest("agecategory");

  useEffect(() => {
    if (data && data.length > 0) {
      const options: Options = {
        chart: {
          type: "column",
          renderTo: "container-agegroup",
        },
        title: {
          text: "Gender Pay Gap across different Age Group",
        },
        xAxis: {
          categories: data.map((value) => value.category),
        },
        yAxis: {
          title: {
            text: "Gender Paygap %",
          },
        },
        tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.y}</b> % GPG </sub>',
        },
        plotOptions: {
          column: {
            borderRadius: 5,
            dataLabels: {
              enabled: true,
            },
            groupPadding: 0.1,
          },
        },
        series: [
          {
            type: "column",
            name: "Age Group",
            data: data.map((value) => parseFloat(parseFloat(value.values).toFixed(2)))
          } as SeriesColumnOptions,
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
    <>
      <div id="container-agegroup" style={{ height: "400px" }}></div>
    </>
  );
};

export default AgeGroupChart;
