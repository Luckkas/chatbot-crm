const mensagemRepository = require('../repositories/mensagemRepository');
const httpError = require('../utils/httpError');

function listar() {
  return mensagemRepository.listar();
}

function criar(dados) {
  if (!dados.telefone) {
    throw httpError(400, 'Telefone e obrigatorio');
  }

  if (!dados.conteudo) {
    throw httpError(400, 'Conteudo e obrigatorio');
  }

  return mensagemRepository.criar({
    conversaId: dados.conversaId || null,
    telefone: dados.telefone,
    direcao: dados.direcao || 'recebida',
    conteudo: dados.conteudo,
    origem: dados.origem || 'whatsapp'
  });
}

module.exports = {
  listar,
  criar
};
