const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'autorisation'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

/* **************************************************** */
/* ---------------------- Routes ---------------------- */
/* **************************************************** */

// Get Data
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Get User Data
app.get('/getuser/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM `user` WHERE id=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: 'User not found' });
        return res.json(data[0]);
    });
});


// Add new user
app.post('/adduser', (req, res) => {
    const { lastName, firstName, birthDate, address } = req.body;
    if (!lastName || !firstName ) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "INSERT INTO `user`(`nom`, `prenom`, `dateNaissance`, `addresse`) VALUES (?, ?, ?, ?)";
    db.query(sql, [lastName, firstName, birthDate, address], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: 'User added successfully', result });
    });
});

// Delete User
app.delete('/deleteuser/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM `user` WHERE id=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        return res.json({ message: 'User deleted successfully' });
    });
});


// Update user
app.post('/updateuser', (req, res) => {
    const { id, nom, prenom, dateNaissance, addresse } = req.body;
    if (!nom || !prenom ) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "UPDATE `user` SET `nom`=?,`prenom`=?,`dateNaissance`=?,`addresse`=? WHERE id=?";
    db.query(sql, [nom, prenom, dateNaissance, addresse, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: 'User added successfully', result });
    });
});

/* **************************************************** */

app.listen(8081, () => {
    console.log("listening on port 8081");
});
