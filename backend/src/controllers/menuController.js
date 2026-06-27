const menuService = require('../services/menuService');

async function listar(req, res, next) {
  try {
    const menus = await menuService.listar();
    res.json(menus);
  } catch (error) {
    next(error);
  }
}

async function buscarPorCodigo(req, res, next) {
  try {
    const menu = await menuService.buscarPorCodigo(req.params.codigo);
    res.json(menu);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  buscarPorCodigo
};
