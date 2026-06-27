const wahaService = require('../services/wahaService');

async function status(req, res, next) {
  try {
    const resultado = await wahaService.verificarStatus();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

async function iniciar(req, res, next) {
  try {
    const resultado = await wahaService.iniciar();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

async function parar(req, res, next) {
  try {
    const resultado = await wahaService.parar();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

async function reiniciar(req, res, next) {
  try {
    const resultado = await wahaService.reiniciar();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  status,
  iniciar,
  parar,
  reiniciar
};
