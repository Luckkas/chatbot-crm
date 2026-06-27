const contatoEnvioService = require('../services/contatoEnvioService');

async function listarAtivos(req, res, next) {
  try {
    const contatos = await contatoEnvioService.listarAtivos();
    res.json(contatos);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarAtivos
};
