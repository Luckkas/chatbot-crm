const { Router } = require('express');
const mensagemController = require('../controllers/mensagemController');

const router = Router();

router.get('/', mensagemController.listar);
router.post('/', mensagemController.criar);

module.exports = router;
