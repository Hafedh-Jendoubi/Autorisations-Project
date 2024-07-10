import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

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
                    indexAxis: 'y', // Make the bars horizontal
                    animation: {
                        duration: 1500, // Animation duration in milliseconds
                        easing: 'easeInOutQuad' // Animation easing function
                    },
                    scales: {
                        x: {
                            ticks: {
                                stepSize: 1 // Ensure ticks use integer values
                            },
                            title: {
                                display: true,
                                text: 'Count' // X-axis label
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Year' // Y-axis label
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
                            label: 'Nombre de naissances par an',
                            data: chartData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
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
        <div>
            <div style={{marginLeft: "40px"}}>
                <Link to='/' className='btn btn-primary ms-3' style={{marginLeft: "90px", marginTop: "50px"}}>Retour</Link>
            </div>
            <div style={{ width: "80%", margin: "20px auto", display: "flex", justifyContent: "center", padding: "10px" }}>
                <canvas ref={chartRef} style={{ width: "900px", height: "120px" }}></canvas>
            </div>
        </div>
    );
}

export default Stats;
