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

// Get Data
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add new user
app.post('/adduser', (req, res) => {
    const { lastName, firstName, birthDate, address } = req.body;
    if (!lastName || !firstName || !birthDate || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const sql = "INSERT INTO `user`(`nom`, `prenom`, `dateNaissance`, `addresse`) VALUES (?, ?, ?, ?)";
    db.query(sql, [lastName, firstName, birthDate, address], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: 'User added successfully', result });
    });
});

// Delete User
app.post('/deleteuser', (req, res) => {
    const { userID } = req.body;
    const sql = "DELETE FROM `user` WHERE id=?";
    db.query(sql, [userID], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({message: 'User deleted successfully', result});
    });
});

app.listen(8081, () => {
    console.log("listening on port 8081");
});
