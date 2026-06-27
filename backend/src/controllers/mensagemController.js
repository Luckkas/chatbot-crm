const mensagemService = require('../services/mensagemService');

async function listar(req, res, next) {
  try {
    const mensagens = await mensagemService.listar();
    res.json(mensagens);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const mensagem = await mensagemService.criar(req.body);
    res.status(201).json(mensagem);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  criar
};
