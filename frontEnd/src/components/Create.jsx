import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Create() {
    const [formData, setFormData] = React.useState({
        lastName: '',
        firstName: '',
        birthDate: '',
        address: ''
    });

    const [validity, setValidity] = React.useState({
        lastName: true,
        firstName: true
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newValidity = {
            lastName: formData.lastName.trim() !== '',
            firstName: formData.firstName.trim() !== ''
        };
        setValidity(newValidity);
        if (Object.values(newValidity).every(Boolean)) {
            axios.post('http://localhost:8081/adduser', formData)
            .then(() => {
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Ajouter Client</h1>
                <form>
                    <div className='mb-2'>
                        <label htmlFor='lastName'>Nom:</label>
                        <input
                            type='text'
                            name='lastName'
                            className={'form-control'}
                            placeholder='Nom *'
                            onChange={handleChange}
                            style={{ borderColor: validity.lastName ? '' : 'red' }}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='firstName'>Prénom:</label>
                        <input 
                            type='text'
                            name='firstName'
                            className='form-control'
                            placeholder='Prénom *'
                            onChange={handleChange}
                            style={{ borderColor: validity.firstName ? '' : 'red' }}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='birthDate'>Date de Naissance:</label>
                        <input 
                            type='date' 
                            name='birthDate' 
                            className='form-control' 
                            placeholder='Nom *'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='address'>Adresse</label>
                        <textarea 
                            className="form-control"
                            aria-label="With textarea"
                            name='address'
                            placeholder='Contoso Ltd
215 E Tasman Dr'
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                    <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
    )
}

export default Create