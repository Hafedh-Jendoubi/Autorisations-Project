import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8081/user')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);

    function formatDate(dateString) {
        if (dateString !== "0000-00-00") {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            return "[Not Set]";
        }
    };

    function deleteUser(id) {
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
    

    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1 style={{margin: "30px auto"}}>La liste des clients:</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success' style={{marginBottom: "20px"}}>Ajouter +</Link>
                </div>
                <table className='table table-hover'>
                    <thead className='table-dark'>
                        <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Date de Naissance</th>
                        <th>Addresse</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.nom}</td>
                            <td>{d.prenom}</td>
                            <td>{formatDate(d.dateNaissance)}</td>
                            <td>{d.addresse}</td>
                            <td>
                                <Link to={`/read/${d.id}`} className='btn btn-sm btn-primary me-2'>Read</Link>
                                <button className='btn btn-sm btn-info me-2'>Modifier</button>
                                <button className='btn btn-sm btn-danger me-2' onClick={() => deleteUser(d.id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home