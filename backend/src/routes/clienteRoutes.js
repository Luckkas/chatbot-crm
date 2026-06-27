const { Router } = require('express');
const clienteController = require('../controllers/clienteController');

const router = Router();

router.get('/', clienteController.listar);
router.get('/telefone/:telefone', clienteController.buscarPorTelefone);
router.post('/', clienteController.criar);

module.exports = router;
