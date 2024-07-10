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
        // Process the data to count the number of users born in each year
        const birthYearCount = data.reduce((acc, curr) => {
            const year = new Date(curr.dateNaissance).getFullYear();
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {});

        // Extract labels (years) and data (counts)
        const labels = Object.keys(birthYearCount).sort((a, b) => a - b);
        const chartData = labels.map(year => birthYearCount[year]);

        const chart = new Chart(
            chartRef.current,
            {
                type: 'bar',
                options: {
                    indexAxis: 'y',
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutQuad'
                    },
                    scales: {
                        x: {
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        },
                        title: {
                            display: true,
                            text: 'Statistique des utilisateurs selon leurs Date de Naissance'
                        }
                    }
                },
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Nombre de clients ayant cette date de naissance',
                            data: chartData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2
                        }
                    ]
                }
            }
        );

        return () => {
            chart.destroy();
        };
    }, [data]); // Add 'data' as a dependency to the useEffect hook

    return (
        <div style={{ width: "90%", margin: "0 auto", display: "flex", justifyContent: "center" }}>
            <canvas ref={chartRef} style={{ width: "1000px", height: "150px" }}></canvas>
        </div>
    );
}

export default Stats;
