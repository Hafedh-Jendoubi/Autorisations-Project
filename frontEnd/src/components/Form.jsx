import React from "react"
import '../styles/Form.css'
import axios from "axios"

function Form() {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newValidity = {
            lastName: formData.lastName.trim() !== '',
            firstName: formData.firstName.trim() !== ''
        };

        setValidity(newValidity);

        if (Object.values(newValidity).every(Boolean)) {
            try {
                const response = await axios.post('http://localhost:8081/adduser', formData);
            } catch (error) {
                console.error('There was an error adding the user!', error);
            }
        }
    };

    var modal = document.getElementById("myModal");
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="lastName">Nom:</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Nom"
                        onChange={handleChange}
                        className={validity.lastName ? '' : 'invalid'}
                    />
                    <label htmlFor="firstName">Prenom:</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Prenom"
                        onChange={handleChange}
                        className={validity.firstName ? '' : 'invalid'}
                    />
                    <label htmlFor="birthDate">Date de naissance:</label>
                    <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        onChange={handleChange}
                    />
                    <label htmlFor="address">Addresse:</label>
                    <textarea
                        id="address"
                        name="address"
                        placeholder="Addresse"
                        onChange={handleChange}
                    />
                    <div className="button-container">
                        <input type="submit" />
                        <input type="reset" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;