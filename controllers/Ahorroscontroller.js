const Cuenta = require('../models/C,Ahorros');

//listar cuentas
const getCuenta = async (req, res) => {
    const { numeroCuenta } = req.params;
    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
        return res.status(404).json({ msg: 'Cuenta no encontrada' });
    }

    res.json(cuenta);
};

// Crear una nueva cuenta
const postCuenta = async (req, res) => {
    const { documentoCliente, claveAcceso } = req.body;

    // Obtener el ultimo numero de cuenta y autoincrementar
    const ultimaCuenta = await Cuenta.findOne().sort({ numeroCuenta: -1});
    const nuevoNumeroCuenta = ultimaCuenta ? ultimaCuenta.numeroCuenta + 1 : 1;

    const nuevaCuenta = new Cuenta({
        numeroCuenta: nuevoNumeroCuenta,
        documentoCliente,
        claveAcceso
    });

    await nuevaCuenta.save();
    res.json(nuevaCuenta);
};

// Consignar dinero
const consignarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;

    if (monto <= 0) {
        return res.status(400).json({ msg: 'El monto debe ser mayor a 0' });
    }

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
        return res.status(404).json({ msg: 'Cuenta no encontrada' });
    }

    cuenta.saldo += monto;
    await cuenta.save();
    res.json(cuenta);
};

// Retirar dinero
const retirarDinero = async (req, res) => {
    const { numeroCuenta, monto } = req.body;

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
        return res.status(404).json({ msg: 'Cuenta no encontrada' });
    }

    if (monto > cuenta.saldo) {
        return res.status(400).json({ msg: 'Saldo insuficiente' });
    }

    cuenta.saldo -= monto;
    await cuenta.save();
    res.json(cuenta);

};

// Eliminar una cuenta
const deleteCuenta = async (req, res) => {
    const { numeroCuenta } = req.body;

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
        return res.status(404).json({ msg: 'Cuenta no encontrada' });
    }

    if (cuenta.saldo > 0) {
        return res.status(400).json({ msg: 'No se puede eliminar una cuenta con saldo mayor a cero'});
    }

    await Cuenta.findByAndDelete(cuenta._id);
    res.json({ msg: 'Cuenta eliminada correctamente' });
};

module.exports = {
    getCuenta,
    postCuenta,
    consignarDinero,
    retirarDinero,
    deleteCuenta
};
