import React from 'react'
import '../styles/App.css'
import Form from './Form'
import axios from 'axios'

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

  const getValue = async (event, id) => {
    const { value } = event.target;
    if(value === '1') { //Delete Function
      if(confirm("Are you sure you want to delete this User?")){
        try{
          const response = await axios.post('http://localhost:8081/deleteuser', {userID: id});
        }catch(error) {
          console.log("Delete User Error: " + error);
        }
      }
      location.reload();
    }else if(value === '2') { //Update Function
      console.log('Updating the user ID: ' + x);
    }
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
                <td width={"190px"}>
                  <div className="page">
                    <div className="select-dropdown">
                      <select onChange={() => getValue(event, d.id)}>
                        <option value={""}>-- Chose Action --</option>
                        <option value={"1"}>Delete</option>
                        <option value={"2"}>Update</option>
                      </select>
                    </div>
                  </div>
                </td>
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