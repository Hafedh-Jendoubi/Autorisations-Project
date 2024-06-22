import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  React.useEffect(() => {
    axios.get('http://localhost:8081/getuser/' + id)
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newValidity = {
      lastName: formData.lastName.trim() !== '',
      firstName: formData.firstName.trim() !== ''
    };
    setValidity(newValidity);
    if (Object.values(newValidity).every(Boolean)) {
      try {
        await axios.post('http://localhost:8081/updateuser/' + id, formData);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (dateString !== "0000-00-00") {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return "[Not Set]";
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Modifier Client</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='lastName'>Nom:</label>
            <input
              type='text'
              name='lastName'
              className='form-control'
              placeholder='Nom *'
              value={formData.nom}
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
              value={formData.firstName}
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
              value={formData.birthDate ? formatDate(formData.birthDate) : ''}
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
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn btn-success'>Update</button>
          <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;