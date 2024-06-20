import React from 'react'
import '../styles/App.css'
import Form from './Form'

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

  function displayForm(event) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  return (
    <div>
      <div className='container'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Date de Naissance</th>
              <th>Addresse</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <button className='addUser' id='myBtn' onClick={displayForm}>Add User</button>
      </div>
      <Form />
    </div>
  )
}

export default App