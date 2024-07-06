import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

function Stats() {
    const chartRef = useRef(null);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8081/user')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const chart = new Chart(
            chartRef.current,
            {
                type: 'bar',
                options: {
                    animation: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        },
                        title: {
                            display: true,
                            text: 'Custom Chart Title'
                        }
                    }
                },
                data: {
                    labels: data.map(row => new Date(row.dateNaissance).getFullYear()),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div style={{ width: "800px" }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Stats;
