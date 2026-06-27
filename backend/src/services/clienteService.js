const clienteRepository = require('../repositories/clienteRepository');
const httpError = require('../utils/httpError');

function listar() {
  return clienteRepository.listar();
}

async function buscarPorTelefone(telefone) {
  const cliente = await clienteRepository.buscarPorTelefone(telefone);

  if (!cliente) {
    throw httpError(404, 'Cliente nao encontrado');
  }

  return cliente;
}

async function criar(dados) {
  if (!dados.telefone) {
    throw httpError(400, 'Telefone e obrigatorio');
  }

  const existente = await clienteRepository.buscarPorTelefone(dados.telefone);

  if (existente) {
    throw httpError(409, 'Cliente ja cadastrado com este telefone');
  }

  return clienteRepository.criar({
    nome: dados.nome || null,
    telefone: dados.telefone,
    status: dados.status || 'ativo',
    observacoes: dados.observacoes || null
  });
}

async function procurarOuCriarPorTelefone(dados) {
  const existente = await clienteRepository.buscarPorTelefone(dados.telefone);

  if (existente) {
    if (dados.nome && !existente.nome) {
      return clienteRepository.atualizarPorTelefone(dados.telefone, {
        nome: dados.nome
      });
    }

    return existente;
  }

  return clienteRepository.criar({
    nome: dados.nome || null,
    telefone: dados.telefone,
    status: 'ativo',
    observacoes: null
  });
}

module.exports = {
  listar,
  buscarPorTelefone,
  criar,
  procurarOuCriarPorTelefone
};
