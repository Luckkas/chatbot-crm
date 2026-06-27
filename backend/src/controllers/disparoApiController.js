const disparoService = require('../services/disparoService');

async function listarPendentes(req, res, next) {
  try {
    const disparos = await disparoService.listarPendentesParaN8n();
    res.json(disparos);
  } catch (error) {
    next(error);
  }
}

async function marcarEnviado(req, res, next) {
  try {
    const disparo = await disparoService.marcarDisparoEnviado(req.params.id);
    res.json(disparo);
  } catch (error) {
    next(error);
  }
}

async function marcarContatoEnviado(req, res, next) {
  try {
    const contatoDisparo = await disparoService.marcarContatoEnviado(req.params.id);
    res.json(contatoDisparo);
  } catch (error) {
    next(error);
  }
}

async function marcarErro(req, res, next) {
  try {
    const contatoDisparo = await disparoService.marcarContatoErro(req.params.id, req.body.erroEnvio);
    res.json(contatoDisparo);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarPendentes,
  marcarEnviado,
  marcarContatoEnviado,
  marcarErro
};
