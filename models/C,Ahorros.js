const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CuentaSchema = mongoose.Schema({
    numeroCuenta: {
        type: Number,
        unique: true,
        required: true,
    },
    documentoCliente: {
        type: String,
        required: true,
    },
    fechaApertura: {
        type: Date,
        default: Date.now,
    },
    saldo: {
        type: Number,
        default: 0,
    },
    claveAcceso: {
        type: String,
        required: true,
    }
});

// Middleware para encriptar la clave antes de guardar
CuentaSchema.pre('save', async function (next) {
    if (this.isModified('claveAcceso')) {
        const salt = await bcrypt.genSalt(10);
        this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
    }
    next();
});

module.exports = mongoose.model('Cuenta', CuentaSchema);