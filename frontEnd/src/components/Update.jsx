import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils'

function Update() {
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    genre: '',
    tel: '',
    cin: '',
    addresse: '',
    email: ''
  });
  const [validity, setValidity] = React.useState({
    nom: true,
    prenom: true,
    genre: true,
    tel: true,
    cin: true
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

    //Controle de saisie!
    const newValidity = {
      nom: formData.nom.trim() !== '' && formData.nom.length > 2,
      prenom: formData.prenom.trim() !== '' && formData.nom.length > 3,
      genre: formData.genre.trim() !== '',
      tel: formData.tel.trim() !== '' && formData.tel.length === 8,
      cin: formData.cin.trim() !== '' && formData.cin.length === 8
    };
    setValidity(newValidity);
    if (!newValidity.nom)
      document.getElementById('nomCtrl').innerHTML = "Le nom doit contenir plus que 2 caractères.";
    else
      document.getElementById('nomCtrl').innerHTML = "";
    if (!newValidity.prenom)
      document.getElementById('prenomCtrl').innerHTML = "Le prénom doit contenir plus que 3 caractères.";
    else
      document.getElementById('prenomCtrl').innerHTML = "";
    if (!newValidity.tel)
      document.getElementById('telCtrl').innerHTML = "Numero de telephone doit contenir 8 caractères.";
    else
      document.getElementById('telCtrl').innerHTML = "";
    if (!newValidity.cin)
      document.getElementById('cinCtrl').innerHTML = "Numero CIN doit contenir 8 caractères.";
    else
      document.getElementById('cinCtrl').innerHTML = "";

    if (Object.values(newValidity).every(Boolean)) {
      axios.post('http://localhost:8081/updateuser', formData)
        .then(() => {
          navigate('/')
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Modifier Client</h1>
        <hr style={{opacity: "0.2"}}></hr>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <div className='d-flex'>
              <label htmlFor='nom'>Nom:</label><p style={{ color: "red", marginLeft: "10px" }} id='nomCtrl'></p>
            </div>
            <input
              id='nom'
              type='text'
              name='nom'
              className={'form-control'}
              placeholder='Nom *'
              onChange={handleChange}
              style={{ borderColor: validity.nom ? '' : 'red' }}
              value={formData.nom}
            />
          </div>
          <div className='mb-2'>
            <div className='d-flex'>
              <label htmlFor='prenom'>Prénom:</label><p style={{ color: "red", marginLeft: "10px" }} id='prenomCtrl'></p>
            </div>
            <input
              id='prenom'
              type='text'
              name='prenom'
              className='form-control'
              placeholder='Prénom *'
              onChange={handleChange}
              style={{ borderColor: validity.prenom ? '' : 'red' }}
              value={formData.prenom}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='genre'>Genre:</label>
            <select
              id='genre'
              name='genre'
              className='form-select'
              onChange={handleChange}
              value={formData.genre}
              style={{ borderColor: validity.genre ? '' : 'red' }}
            >
              <option value="">Select Genre</option>
              <option value="M">Male</option>
              <option value="F">Femelle</option>
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor='dateNaissance'>Date de Naissance:</label>
            <input
              id='dateNaissance'
              type='date'
              name='dateNaissance'
              className='form-control'
              placeholder='Date de Naissance *'
              onChange={handleChange}
              value={formatDate(formData.dateNaissance)}
            />
          </div>
          <div className='mb-2'>
            <div className='d-flex'>
              <label htmlFor='tel'>Numero Telephone:</label><p style={{ color: "red", marginLeft: "10px" }} id='telCtrl'></p>
            </div>
            <input
              id='tel'
              type='text'
              name='tel'
              className='form-control'
              placeholder='Numero Telephone *'
              onChange={handleChange}
              style={{ borderColor: validity.tel ? '' : 'red' }}
              value={formData.tel}
            />
          </div>
          <div className='mb-2'>
            <div className='d-flex'>
              <label htmlFor='cin'>Numero CIN:</label><p style={{ color: "red", marginLeft: "10px" }} id='cinCtrl'></p>
            </div>
            <input
              id='cin'
              type='text'
              name='cin'
              className='form-control'
              placeholder='CIN *'
              onChange={handleChange}
              style={{ borderColor: validity.cin ? '' : 'red' }}
              value={formData.cin}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='text'
              name='email'
              className='form-control'
              placeholder='Email'
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='addresse'>Adresse:</label>
            <textarea
              id='addresse'
              className="form-control"
              aria-label="With textarea"
              name='addresse'
              placeholder='Contoso Ltd
215 E Tasman Dr'
              onChange={handleChange}
              value={formData.addresse}
            ></textarea>
          </div>
          <button className='btn btn-success' type='submit'>Modifier</button>
          <Link to='/' className='btn btn-primary ms-3'>Retour</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;