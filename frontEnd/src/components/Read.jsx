import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { formatDate } from '../utils'

function Read() {
    const [data, setData] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        axios.get('http://localhost:8081/getuser/' + id)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Detail of Client:</h3>
                <hr style={{opacity: "0.2"}}></hr>
                <div className='mb-2'>
                    <strong>Nom et Prenom: </strong>{data.nom} {data.prenom} 
                </div>
                <div className='mb-2'>
                    <strong>Genre: </strong>{data.genre === "M" ? "Male" : "Femelle"}
                </div>
                <div className='mb-2'>
                    <strong>Date de Naissance: </strong> {formatDate(data.dateNaissance)}
                </div>
                <div className='mb-2'>
                    <strong>Adresse: </strong> {data.addresse}
                </div>
                <div className='mb-2'>
                    <strong>Numero Telephone: </strong> (+216) {data.tel} 
                </div>
                <div className='mb-2'>
                    <strong>CIN: </strong> {data.cin} 
                </div>
                <div className='mb-3'>
                    <strong>Adresse Email: </strong> {data.email} 
                </div>
                <Link to={`/update/${id}`} className='btn btn-success'>Modifier</Link>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </div>
        </div>
    )
}

export default Read