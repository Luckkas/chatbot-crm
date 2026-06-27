const logService = require('../services/logService');

async function listar(req, res, next) {
  try {
    const logs = await logService.listar();
    res.json(logs);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const log = await logService.criar(req.body);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  criar
};
