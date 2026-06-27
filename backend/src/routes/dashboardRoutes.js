const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

router.get('/', dashboardController.index);
router.get('/clientes', dashboardController.clientes);
router.get('/conversas', dashboardController.conversas);
router.get('/mensagens', dashboardController.mensagens);
router.get('/menu', dashboardController.menu);
router.get('/logs', dashboardController.logs);

module.exports = router;
