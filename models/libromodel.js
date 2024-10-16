const mongoose = require("mongoose");
const libroSchema = new mongoose.Schema(   // Schema = esquema
    {   
        titulo: {
            type: String,
            required: true
        },
        autor: {
            type: String,
            required: true
        },
    },// configuraciones adicionales
    {
        timestamps: true, //Fecha de cracion y modificacion como columna
    }
)

const ModelLibro = mongoose.model("libros", libroSchema);
module.exports = ModelLibro;