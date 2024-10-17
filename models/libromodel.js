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
        categoria: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            enum: ["Disponible", "Prestado", "Vencido"],  // enum = enumerador
            default: "Disponible",
        },
        fechaPrestamo: {
            type: Date,
        },
        fehcaDevolucion: {
            type: Date,
        },

    },// configuraciones adicionales
    {
        timestamps: true, //Fecha de cracion y modificacion como columna
    }
)

const ModelLibro = mongoose.model("libros", libroSchema);
module.exports = ModelLibro;