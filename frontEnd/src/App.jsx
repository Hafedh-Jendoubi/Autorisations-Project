import React from 'react'
import './App.css'

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:8081/user')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  function goToForm() {
    
  }

  return (
    <div className='container'>
      <table>
        <thead>
          <th>ID</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Date de Naissance</th>
          <th>Addresse</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.nom}</td>
              <td>{d.prenom}</td>
              <td>{formatDate(d.dateNaissance)}</td>
              <td>{d.addresse}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='addUser' onClick={goToForm}>Add User</button>
    </div>
  )
}

export default App