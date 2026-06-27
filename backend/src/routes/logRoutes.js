const { Router } = require('express');
const logController = require('../controllers/logController');

const router = Router();

router.get('/', logController.listar);
router.post('/', logController.criar);

module.exports = router;
