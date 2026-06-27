const { Router } = require('express');
const webhookController = require('../controllers/webhookController');

const router = Router();

router.post('/mensagem', webhookController.receberMensagem);

module.exports = router;
