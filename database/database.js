require('dotenv').config();

const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

client.connect()
    .then(()=> console.log('Conectado!'))
    .catch(err => console.log(err.stack));

const addPonto = (request, response) =>{
    const {nome, lat, lng} = request.body;

    const query = `INSERT INTO ponto (nome, localizacao) VALUES ('${nome}', ST_GeomFromText('POINT(${lat} ${lng})'))`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Inserido');
        });
};

const getPonto = (request, response) => {

    const query = `SELECT ST_AsText(localizacao) localizacao FROM ponto`;
 
    client.query(query,(error, results) => {
       if (error) {
         response.status(400).send(error);
         console.log(error);
         return;
       }
       response.status(200).json(results.rows);
     });
 };

module.exports = {
    addPonto,
    getPonto
};