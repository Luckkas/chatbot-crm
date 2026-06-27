const { Router } = require('express');
const contatoEnvioApiController = require('../controllers/contatoEnvioApiController');

const router = Router();

router.get('/ativos', contatoEnvioApiController.listarAtivos);

module.exports = router;
