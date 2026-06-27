const contatoEnvioRepository = require('../repositories/contatoEnvioRepository');
const httpError = require('../utils/httpError');

function normalizarTelefone(telefone) {
  return String(telefone || '').replace(/\D/g, '');
}

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw httpError(400, 'ID invalido');
  }

  return parsed;
}

function validarDados(dados) {
  const nome = String(dados.nome || '').trim();
  const telefone = normalizarTelefone(dados.telefone);

  if (!nome) {
    throw httpError(400, 'Nome e obrigatorio');
  }

  if (!telefone) {
    throw httpError(400, 'Telefone e obrigatorio');
  }

  return {
    nome,
    telefone,
    ativo: dados.ativo === undefined ? true : Boolean(dados.ativo),
    observacao: dados.observacao ? String(dados.observacao).trim() : null
  };
}

function listar() {
  return contatoEnvioRepository.listar();
}

function listarAtivos() {
  return contatoEnvioRepository.listarAtivos();
}

async function buscarPorId(id) {
  const contato = await contatoEnvioRepository.buscarPorId(parseId(id));

  if (!contato) {
    throw httpError(404, 'Contato de envio nao encontrado');
  }

  return contato;
}

async function criar(dados) {
  const dadosValidados = validarDados(dados);
  const existente = await contatoEnvioRepository.buscarPorTelefone(dadosValidados.telefone);

  if (existente) {
    throw httpError(409, 'Ja existe um contato com este telefone');
  }

  return contatoEnvioRepository.criar(dadosValidados);
}

async function atualizar(id, dados) {
  const contatoId = parseId(id);
  const atual = await buscarPorId(contatoId);
  const dadosValidados = validarDados({
    ...dados,
    ativo: dados.ativo === undefined ? atual.ativo : dados.ativo
  });

  const existente = await contatoEnvioRepository.buscarPorTelefone(dadosValidados.telefone);

  if (existente && existente.id !== contatoId) {
    throw httpError(409, 'Ja existe um contato com este telefone');
  }

  return contatoEnvioRepository.atualizar(contatoId, dadosValidados);
}

async function excluir(id) {
  const contatoId = parseId(id);
  await buscarPorId(contatoId);
  return contatoEnvioRepository.excluir(contatoId);
}

async function alternarAtivo(id) {
  const contatoId = parseId(id);
  const contato = await buscarPorId(contatoId);

  return contatoEnvioRepository.atualizar(contatoId, {
    ativo: !contato.ativo
  });
}

module.exports = {
  listar,
  listarAtivos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  alternarAtivo,
  normalizarTelefone
};
