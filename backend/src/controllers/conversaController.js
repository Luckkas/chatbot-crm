const conversaService = require('../services/conversaService');

async function listar(req, res, next) {
  try {
    const conversas = await conversaService.listar();
    res.json(conversas);
  } catch (error) {
    next(error);
  }
}

async function buscarPorTelefone(req, res, next) {
  try {
    const conversas = await conversaService.buscarPorTelefone(req.params.telefone);
    res.json(conversas);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const conversa = await conversaService.criar(req.body);
    res.status(201).json(conversa);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorTelefone,
  criar
};
