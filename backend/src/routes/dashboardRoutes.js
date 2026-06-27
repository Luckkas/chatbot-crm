const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');
const menuPageController = require('../controllers/menuPageController');

const router = Router();

router.get('/', dashboardController.index);
router.get('/clientes', dashboardController.clientes);
router.get('/conversas', dashboardController.conversas);
router.get('/mensagens', dashboardController.mensagens);
router.get('/menu', menuPageController.listar);
router.post('/menu/texto-inicial', menuPageController.salvarTextoInicial);
router.get('/menu/opcoes/nova', menuPageController.novo);
router.post('/menu/opcoes', menuPageController.criar);
router.get('/menu/opcoes/:id/editar', menuPageController.editar);
router.post('/menu/opcoes/:id', menuPageController.atualizar);
router.post('/menu/opcoes/:id/toggle', menuPageController.alternarAtivo);
router.post('/menu/opcoes/:id/excluir', menuPageController.excluir);
router.get('/logs', dashboardController.logs);

module.exports = router;
