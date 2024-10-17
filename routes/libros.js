const express = require('express');
const router = express.Router();
const ModelLibro = require('../models/libromodel'); // Importar el modelo de libros


// Obtener todos los libros (GET)
router.get('/libros', async (req, res) => {
    try {
        const libros = await ModelLibro.find(); // Obtener todos los libros
        res.status(200).send(libros);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los libros', error });
    }
});

// Obtener un libro por ID (GET)
router.get('/libros/:id', async (req, res) => {
    try {
        const libro = await ModelLibro.findById(req.params.id); // Buscar libro por ID
        if (!libro) {
            return res.status(404).send({ mensaje: 'Libro no encontrado' });
        }
        res.status(200).send(libro);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el libro', error });
    }
});

// Crear un nuevo libro (POST)
router.post('/libros', async (req, res) => {
    const body = req.body;
    try {
        const nuevoLibro = await ModelLibro.create(body); // Insertar en la base de datos
        res.status(201).send(nuevoLibro); // 201 indica que se ha creado un recurso
    } catch (error) {
        res.status(400).send(error); // Manejar errores
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

// Endpoint de búsqueda con filtros (autor, categoría, estado)
router.get('/libros/busqueda', async (req, res) => {
    const { autor, categoria, estado } = req.query;  // Obtenemos los filtros de los query params

    try {
        const query = {};
        if (autor) query.autor = autor;  // Filtrar por autor si está en los query params
        if (categoria) query.categoria = categoria;  // Filtrar por categoría si está en los query params
        if (estado) query.estado = estado;  // Filtrar por estado (disponible, prestado, vencido)

        const libros = await ModelLibro.find(query);  // Buscar libros según los filtros aplicados
        if (!libros.length) {
            return res.status(404).send({ mensaje: 'No se encontraron libros con los criterios proporcionados' });
        }

        res.status(200).send(libros);  // Enviar los libros encontrados
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar libros', error });
    }
});

module.exports = router;