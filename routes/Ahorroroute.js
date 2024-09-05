const { Router } = require('express');
const { getCuenta, postCuenta, consignarDinero, retirarDinero, deleteCuenta } = require('../controllers/Ahorroscontroller');

const router = Router();

router.get('/cuenta/:numeroCuenta', getCuenta);
router.post('/cuenta', postCuenta);
router.post('/cuenta/consignar', consignarDinero);
router.post('/cuenta/retirar', retirarDinero);
router.delete('/cuenta', deleteCuenta);

module.exports = router;

