const express = require("express");
const app = express();
const dbconnect = require("./config/db.js"); // importa la base de datos
const librosRoutes = require("./routes/libros") // importa la ruta de los libros

app.use(express.json()); //middleware para interpretar JSON
app.use(librosRoutes); //usa la ruta de los libros

// // ruta de prueba
// router.get("/", (req, res,) => { 
//     res.send("hola mundo!");
// })

// Conectar a la base de datos
dbconetedition().then(() => {
    app.listen(3000, () => {
        console.log("Server corriendo en el puerto 3000");
    });
}).catch(err  => {
    console.error("no se pudo iniciar el servido debido a un error en la base de datos")
});