const express = require("express");
const app=express();

const cors = require('cors');
var bodyParser = require("body-parser");

const db = require('mongoose');

app.use(cors());
db.Promise = global.Promise;
db.connect('mongodb://127.0.0.1:27017/jugadoresFutbol');

const schema = db.Schema;

const esquemaJugador = new schema(
        {
            nombre:String,
            apellido:String,
            anoNacimiento:Number
        }
);

const modelJugadores=db.model('Jugadores',esquemaJugador);
// const { dbConnection } = require('./database/dbconfig');

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("html"));

app.get("/jugadores",async function(req,res){

    // const messi = new modelJugadores({ name: 'Erling', apellido:'Halland', anoNacimiento:2002 });
    // await messi.save();
    const anuncios = await modelJugadores.find();
    res.json({resp:"jugadores", anuncios});
});

app.listen(4000, ()=>{
console.log("Hi");
});