const { Router } = require('express');
const menuController = require('../controllers/menuController');

const router = Router();

router.get('/', menuController.listar);
router.get('/texto-inicial', menuController.textoInicial);
router.get('/opcoes-ativas', menuController.opcoesAtivas);
router.get('/opcao/:codigo', menuController.buscarPorCodigo);

module.exports = router;
