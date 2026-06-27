const logRepository = require('../repositories/logRepository');
const httpError = require('../utils/httpError');

function listar() {
  return logRepository.listar();
}

function criar(dados) {
  if (!dados.tipo) {
    throw httpError(400, 'Tipo do log e obrigatorio');
  }

  return logRepository.criar({
    tipo: dados.tipo,
    origem: dados.origem || null,
    destino: dados.destino || null,
    status: dados.status || 'registrado',
    mensagem: dados.mensagem || null,
    payloadRecebido: dados.payloadRecebido || null,
    payloadEnviado: dados.payloadEnviado || null
  });
}

module.exports = {
  listar,
  criar
};
