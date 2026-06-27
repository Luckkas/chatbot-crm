const { Router } = require('express');
const disparoPageController = require('../controllers/disparoPageController');

const router = Router();

router.get('/', disparoPageController.listar);
router.get('/novo', disparoPageController.novo);
router.post('/', disparoPageController.criar);
router.post('/:id/excluir', disparoPageController.excluir);

module.exports = router;
