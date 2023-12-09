const express = require("express");
const app=express();
const Jugador = require('./models/jugador');
const bodyParser = require("body-parser");

const { dbConnection } = require('./database/dbconfig');

app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnection();

app.use(express.static("html"));

app.get("/jugadores",async function(req,res){
    const listaJugadores = await Jugador.find();
    res.json({resp:"jugadores", listaJugadores});
});

app.get("/jugadores/:id", async (req,res)=>{
    const id = req.params.id;
    
    try {
        const jugador = await Jugador.findById(id);

        if(!jugador)
        {
            return res.status(404).json({
                ok:false,
                msg: 'Jugador no encontrado por id'
            })
        }

        res.json({
            resp:"jugadores", 
            jugador
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    


});

app.post("/jugadores", async function(req,res){

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const anoNacimiento = req.body.anoNacimiento;

    const jugador = new Jugador({
        nombre: nombre, 
        apellido:apellido, 
        anoNacimiento:anoNacimiento
    })

    try {
        const jugadorBD = await jugador.save();

        res.json({
            ok:true,
            jugador:jugadorBD
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
});

app.delete("/jugadores/:id", async function(req,res){
    const deletParam = req.params.id;

    console.log(deletParam)

    try {
        const jugador = await Jugador.findById(deletParam);

        if(!jugador)
        {
            return res.status(404).json({
                ok:false,
                msg:"Jugador no encontrado"
            });
            
        }

        await Jugador.findByIdAndDelete(deletParam);

        res.json({
            ok:true,
            msg:"Jugador borrado de la bd"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
});

app.put("/jugadores/:id", async function(req, res){
    
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const anoNacimiento = req.body.anoNacimiento;

    try {
        
        const jugador = await Jugador.findById(id);

        if(!jugador)
        {
            return res.status(404).json({
                ok:false,
                msg: 'Jugador no encontrado por id'
            })
        }

        const cambiosJugador = {
            nombre: nombre, 
            apellido:apellido, 
            anoNacimiento:anoNacimiento
        }

        const jugadorActualizado = await Jugador.findByIdAndUpdate(id, cambiosJugador, {new:true});

        res.json({
            ok:true,
            jugadorActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
})

app.listen(4000, ()=>{
console.log("Hi");
});