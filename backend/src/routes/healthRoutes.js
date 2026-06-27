const { Router } = require('express');
const healthController = require('../controllers/healthController');

const router = Router();

router.get('/health', healthController.health);
router.get('/health/database', healthController.database);

module.exports = router;
