const { Router } = require('express');
const contatoEnvioPageController = require('../controllers/contatoEnvioPageController');

const router = Router();

router.get('/', contatoEnvioPageController.listar);
router.get('/novo', contatoEnvioPageController.novo);
router.post('/', contatoEnvioPageController.criar);
router.get('/:id/editar', contatoEnvioPageController.editar);
router.post('/:id', contatoEnvioPageController.atualizar);
router.post('/:id/excluir', contatoEnvioPageController.excluir);
router.post('/:id/toggle', contatoEnvioPageController.alternarAtivo);

module.exports = router;
