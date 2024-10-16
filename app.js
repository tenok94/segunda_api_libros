const express = require("express");
module.exports = router;
const app = express();
const dbconnect = require("./config/db.js");
const ModeLibro = require("./models/libromodel.js");


app.use(express.json()); //middleware para interpretar JSON
const router = express.Router();
app.use(router);

router.get("/", (req, res,) => {
    res.send("hola mundo!");
})

// Obtener todos los libros (GEt)
router.get("/libros", async (req, res) => {
    try{
        const libros = await ModeLibro.find();
        res.status(200).send(libros);
    }catch(error){
        res.status(500).send({mensaje: "al obtener los libros", error});
    }
});

// Crear un nuevo libro (POST)
router.post("/libros", async (req, res) =>{
    const body = req.body;
    try{
        const nuevoLibro = await ModeLibro.create(body);// insertar en la base de datos
        res.status(201).send(nuevoLibro); //201 indica que se ha creado un recurso
    } catch(error){
        res.status(400).send(error);
    }
})

// Obtener un libro por ID (GET)
router.get("/libros", async(req, res) => {
    try{
        const libro = await ModeLibro.findById(req.params.id);
        if(!libro){
            return res.status(404).send({mensaje: "Libro no Encontrado!"});
        }
        res.status(400).send(libro);
    }catch(error){
        res.status(500).send({mensaje: "error al obtener el libro", error});
    }
});

// Actualizar un libro por ID (PUT)
router.put('/libros/:id', async (req, res) => {
    try {
        const libroActualizado = await ModelLibro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!libroActualizado) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send(libroActualizado);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar el libro', error });
    }
});

// Eliminar un libro por ID (DELETE)
router.delete('/libros/:id', async (req, res) => {
    try {
        const libroEliminado = await ModelLibro.findByIdAndDelete(req.params.id); // Eliminar libro por ID
        if (!libroEliminado) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el libro', error });
    }
});

// Conectar a la base de datos
dbconetedition().then(() => {
    app.listen(port, () => {
        console.log("Server corriendo en el puerto 3000");
    });
}).catch(err  => {
    console.error("no se pudo iniciar el servido debido a un error en la base de datos")
});