const { Router } = require('express');
const conversaController = require('../controllers/conversaController');

const router = Router();

router.get('/', conversaController.listar);
router.get('/telefone/:telefone', conversaController.buscarPorTelefone);
router.post('/', conversaController.criar);

module.exports = router;
