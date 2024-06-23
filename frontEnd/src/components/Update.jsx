import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    addresse: ''
  });
  const [validity, setValidity] = React.useState({
    nom: true,
    prenom: true
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get('http://localhost:8081/getuser/' + id)
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newValidity = {
      nom: formData.nom.trim() !== '',
      prenom: formData.prenom.trim() !== ''
    };
    setValidity(newValidity);
    if (Object.values(newValidity).every(Boolean)) {
      axios.post('http://localhost:8081/updateuser', formData)
        .then(() => {
          navigate('/')
        })
        .catch(err => console.log(err));
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
              name='nom'
              className='form-control'
              placeholder='Nom *'
              value={formData.nom}
              onChange={handleChange}
              style={{ borderColor: validity.nom ? '' : 'red' }}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='firstName'>Prénom:</label>
            <input
              type='text'
              name='prenom'
              className='form-control'
              placeholder='Prénom *'
              value={formData.prenom}
              onChange={handleChange}
              style={{ borderColor: validity.prenom ? '' : 'red' }}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='birthDate'>Date de Naissance:</label>
            <input
              type='date'
              name='dateNaissance'
              className='form-control'
              value={formData.dateNaissance ? formatDate(formData.dateNaissance) : ''}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address'>Adresse</label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              name='addresse'
              placeholder='Contoso Ltd
215 E Tasman Dr'
              value={formData.addresse}
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