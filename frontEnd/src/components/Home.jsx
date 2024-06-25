import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyDocument from './ReactPDF';
import { PDFDownloadLink } from "@react-pdf/renderer";

function Home() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8081/user')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    function deleteUser(id) {
        if (confirm("Are you sure about deleting this User?")) {
            axios.delete('http://localhost:8081/deleteuser/' + id)
                .then(() => {
                    // Refresh the data after deleting the user
                    fetch('http://localhost:8081/user')
                        .then(res => res.json())
                        .then(data => setData(data))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    }

    function handleChange(event) {
        const { value } = event.target;
        if (value !== "") {
            fetch('http://localhost:8081/getuserbycin/' + value)
                .then(res => {
                    if (res.status === 404) {
                        setData([]);
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data) {
                        setData(data);
                    }
                })
                .catch(err => console.log(err));
        } else {
            fetch('http://localhost:8081/user')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1 style={{ margin: "30px auto" }}>La liste des clients</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='row'>
                    <div className='col'>
                        <input
                            type='text'
                            name='search'
                            className={'form-control'}
                            placeholder='Rechercher par CIN...'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col col-lg-2'>
                        <Link to='/create' className='btn btn-success' style={{ marginBottom: "25px" }}>Ajouter Client</Link>
                    </div>
                </div>
                <table className='table table-hover align-middle'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Genre</th>
                            <th>CIN</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.nom}</td>
                                <td>{d.prenom}</td>
                                <td>{d.genre === "M" ? "Male" : "Femelle"}</td>
                                <td>{d.cin}</td>
                                <td>
                                    <Link to={`/read/${d.id}`} className='btn btn-sm btn-primary me-2'>Afficher</Link>
                                    <button className='btn btn-sm btn-danger me-2' onClick={() => deleteUser(d.id)}>Supprimer</button>
                                    <PDFDownloadLink
                                        document={<MyDocument client={d}/>}
                                        fileName={d.nom + "-" + d.prenom + ".pdf"}
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading ? (
                                                'Loading document...'
                                            ) : (
                                                <button className='btn btn-sm btn-info'>Autorisation</button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
