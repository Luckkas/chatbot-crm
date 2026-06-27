const { Router } = require('express');
const wahaController = require('../controllers/wahaController');

const router = Router();

router.get('/status', wahaController.status);
router.post('/start', wahaController.iniciar);
router.post('/stop', wahaController.parar);
router.post('/restart', wahaController.reiniciar);

module.exports = router;
