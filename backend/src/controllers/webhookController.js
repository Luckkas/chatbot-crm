const webhookService = require('../services/webhookService');

async function receberMensagem(req, res, next) {
  try {
    const resultado = await webhookService.receberMensagem(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  receberMensagem
};
