const clienteService = require('../services/clienteService');

async function listar(req, res, next) {
  try {
    const clientes = await clienteService.listar();
    res.json(clientes);
  } catch (error) {
    next(error);
  }
}

async function buscarPorTelefone(req, res, next) {
  try {
    const cliente = await clienteService.buscarPorTelefone(req.params.telefone);
    res.json(cliente);
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    const cliente = await clienteService.criar(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorTelefone,
  criar
};
