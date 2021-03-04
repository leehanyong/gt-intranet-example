const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const databaseJson = fs.readFileSync('./database.json');
const conf = JSON.parse(databaseJson);
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

dbConnection.connect();

app.get('/api/employee', (req, res) => {

    dbConnection.query(
        'SELECT * FROM EMPLOYEE', (err, rows, fields) => {
            res.send(rows);
        }
    )

});

app.listen(port, () => console.log(`Listening on port ${port}`));