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

const multer = require('multer');   // express에 multer 모듈 적용
const upload = multer({dest: './upload'}); // 입력파일이 upload/ 폴더내에 저장

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

app.use('/image', express.static('./upload'));

app.post('/api/employeeAdd', upload.single('image'), (req, res) => {

    let sql = 'INSERT INTO EMPLOYEE VALUES (NULL, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let rank = req.body.rank;
    let parmas = [image, name, birthday, gender, rank];
    dbConnection.query(sql, parmas, (err, rows, fields) => {
        res.send(rows);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));