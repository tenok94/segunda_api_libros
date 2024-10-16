const express = require("express");
const app = express();
const dbconnect = require("./config/db.js"); // importa la base de datos

app.use(express.json()); //middleware para interpretar JSON
const router = express.Router();
app.use(router);

// ruta de prueba
router.get("/", (req, res,) => { 
    res.send("hola mundo!");
})

// Conectar a la base de datos
dbconetedition().then(() => {
    app.listen(3000, () => {
        console.log("Server corriendo en el puerto 3000");
    });
}).catch(err  => {
    console.error("no se pudo iniciar el servido debido a un error en la base de datos")
});