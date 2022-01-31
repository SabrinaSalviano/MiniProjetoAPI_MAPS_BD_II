const express = require('express');
const cors = require('cors');
const db = require('./database/database');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

app.post('/ponto', db.addPonto);

app.get('/getponto', db.getPonto);
