const conversaRepository = require('../repositories/conversaRepository');
const httpError = require('../utils/httpError');

function listar() {
  return conversaRepository.listar();
}

function buscarPorTelefone(telefone) {
  return conversaRepository.buscarPorTelefone(telefone);
}

function criar(dados) {
  if (!dados.telefone) {
    throw httpError(400, 'Telefone e obrigatorio');
  }

  return conversaRepository.criar({
    clienteId: dados.clienteId || null,
    telefone: dados.telefone,
    status: dados.status || 'aberta',
    etapaAtual: dados.etapaAtual || null
  });
}

async function procurarAbertaOuCriar(dados) {
  const conversa = await conversaRepository.buscarAbertaPorTelefone(dados.telefone);

  if (conversa) {
    return conversaRepository.atualizar(conversa.id, {
      clienteId: conversa.clienteId || dados.clienteId || null,
      etapaAtual: dados.etapaAtual || conversa.etapaAtual || null
    });
  }

  return criar(dados);
}

module.exports = {
  listar,
  buscarPorTelefone,
  criar,
  procurarAbertaOuCriar
};
