import { useEffect } from "react";
import Highcharts, { Options, SeriesBarOptions } from "highcharts";
import useApiRequest from "../reusable/ApiRequest";
import { Spinner } from "react-bootstrap"; // Import the Spinner component

const OccupationChart: React.FC = () => {
    const { data, loading, error } = useApiRequest("OccupationCategory");

    useEffect(() => {
        if (data && data.length > 0) {
            const options: Options = {
                chart: {
                    type: 'bar',
                    renderTo: 'container-occupation',
                },
                title: {
                    text: 'Gender Pay Gap by Occupation',
                    align: 'center',
                },
                xAxis: {
                    categories: data.map(value => value.Occupation),
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Percent',
                    },
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
                        ': <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true,
                },
                legend: {
                    reversed: true,
                },
                plotOptions: {
                    bar: {
                        stacking: 'percent',
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.0f}%',
                        },
                    },
                },
                series: [{
                    type: 'bar', // Specify the type for each series
                    name: 'Female',
                    data: data.map(value => parseFloat(value.Females)),
                    color: '#FFC0CB',
                }, {
                    type: 'bar', // Specify the type for each series
                    name: 'Male',
                    data: data.map(value => parseFloat(value.Males)),
                    color: '#2171b5',
                }] as SeriesBarOptions[], // Type assertion for series
            };

            Highcharts.chart(options);
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
            <div id="container-occupation" style={{ height: '400px' }}></div>
        </>
    );
};

export default OccupationChart;
