import { useEffect } from "react";
import Highcharts from 'highcharts';
import HCMore from 'highcharts/highcharts-more';
import useApiRequest from "../reusable/ApiRequest";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

HCMore(Highcharts);

const OccupationSubChart: React.FC = () => {
  const { data, loading, error } = useApiRequest("OccupationSubCategory");

  useEffect(() => {
    if (data && data.length > 0) {
      const groupedData: any[] = [];
      let currentOccupation: any = null;

      data.forEach(item => {
        if (parseInt(item.isCheck) === 1) {
          // It's a main occupation, create a new object
          currentOccupation = {
            name: item.Industry,
            data: []
          };
          groupedData.push(currentOccupation);
        } else if (parseInt(item.isCheck) === 0 && currentOccupation) {
          // It's a sub-occupation, add it to the current main occupation
          currentOccupation.data.push({
            name: item.Industry,
            value: parseInt(item.gpg)
          });
        }
      });

      // Highcharts options
      const options: Highcharts.Options = {
        chart: {
          type: 'packedbubble',
          height: '80%'
        },
        title: {
          text: 'Gender Pay Gap based on Occupation',
          align: 'left'
        },
        tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.value} % GPG </sub>'
        },
        plotOptions: {
          packedbubble: {
            minSize: '30%',
            maxSize: '100%',
            zMin: 0,
            zMax: 100,
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}:<br><b>{point.value}%</b>',
              filter: {
                property: 'y',
                operator: '>',
                value: 1
              },
              style: {
                color: 'black',
                textOutline: 'none',
                fontWeight: 'normal'
              }
            }
          }
        },
        series: groupedData
      };

      // Render the chart
      Highcharts.chart('container-Occupation-sub', options);
    }
  }, [data]);

  // Handling loading and error states
  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: '400px', alignItems: 'center' }}>
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
      <div id="container-Occupation-sub"></div>
    </>
  );
}

export default OccupationSubChart;
