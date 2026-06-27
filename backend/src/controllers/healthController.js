const prisma = require('../config/prisma');

async function health(req, res) {
  res.json({
    status: 'ok',
    service: 'chatbot-crm-backend'
  });
}

async function database(req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: error.message
    });
  }
}

module.exports = {
  health,
  database
};
