const { Router } = require('express');
const disparoApiController = require('../controllers/disparoApiController');

const router = Router();

router.get('/pendentes', disparoApiController.listarPendentes);
router.post('/:id/marcar-enviado', disparoApiController.marcarEnviado);
router.post('/contatos/:id/marcar-enviado', disparoApiController.marcarContatoEnviado);
router.post('/contatos/:id/marcar-erro', disparoApiController.marcarErro);

module.exports = router;
