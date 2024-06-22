import React from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

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
                <div className='mb-2'>
                    <strong>Full Name: </strong>{data.nom} {data.prenom} 
                </div>
                <div className='mb-2'>
                    <strong>Date de Naissance: </strong> {data.dateNaissance}
                </div>
                <div className='mb-3'>
                    <strong>Adresse: </strong> {data.addresse}
                </div>
                <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </div>
        </div>
    )
}

export default Read