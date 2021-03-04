const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', (req, res) => {

    setTimeout(function() {
        res.send([
            { 'id' : 1, 'firstName' : '이', 'lastName' : '한용', 'sex' : '남', 'age' : 29, 'rank' : '대리', 'career' : '3년' },
            { 'id' : 2, 'firstName' : '오', 'lastName' : '태식', 'sex' : '남', 'age' : 33, 'rank' : '과장', 'career' : '8년' }
        ]);
    }, 3000);
    
});

app.listen(port, () => console.log(`Listening on port ${port}`));