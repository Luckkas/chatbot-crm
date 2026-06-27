const menuRepository = require('../repositories/menuRepository');
const httpError = require('../utils/httpError');

const CHAVE_MENU_INICIAL = 'menu_inicial';
const TEXTO_INICIAL_PADRAO = 'Ola! Escolha uma opcao:\n1. Suporte\n2. Financeiro\n3. Planos';

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw httpError(400, 'ID invalido');
  }

  return parsed;
}

function validarOpcao(dados) {
  const codigo = String(dados.codigo || '').trim();
  const descricao = String(dados.descricao || '').trim();
  const respostaAutomatica = String(dados.respostaAutomatica || '').trim();

  if (!codigo) {
    throw httpError(400, 'Codigo e obrigatorio');
  }

  if (!descricao) {
    throw httpError(400, 'Descricao e obrigatoria');
  }

  if (!respostaAutomatica) {
    throw httpError(400, 'Resposta automatica e obrigatoria');
  }

  return {
    codigo,
    descricao,
    respostaAutomatica,
    ativo: dados.ativo === undefined ? true : Boolean(dados.ativo)
  };
}

function listar() {
  return menuRepository.listar();
}

function listarAtivas() {
  return menuRepository.listarAtivas();
}

async function buscarPorCodigo(codigo) {
  const opcao = await menuRepository.buscarPorCodigo(codigo);

  if (opcao && opcao.ativo) {
    return opcao;
  }

  return menuRepository.buscarPorCodigo('invalido');
}

async function buscarPorId(id) {
  const opcao = await menuRepository.buscarPorId(parseId(id));

  if (!opcao) {
    throw httpError(404, 'Opcao de menu nao encontrada');
  }

  return opcao;
}

async function validarCodigoAtivoDuplicado(codigo, idAtual = null) {
  const existente = await menuRepository.buscarAtivaPorCodigo(codigo);

  if (existente && existente.id !== idAtual) {
    throw httpError(409, 'Ja existe uma opcao ativa com este codigo');
  }
}

async function criar(dados) {
  const dadosValidados = validarOpcao(dados);

  if (dadosValidados.ativo) {
    await validarCodigoAtivoDuplicado(dadosValidados.codigo);
  }

  return menuRepository.criar(dadosValidados);
}

async function atualizar(id, dados) {
  const opcaoId = parseId(id);
  const atual = await buscarPorId(opcaoId);
  const dadosValidados = validarOpcao({
    ...dados,
    ativo: dados.ativo === undefined ? atual.ativo : dados.ativo
  });

  if (dadosValidados.ativo) {
    await validarCodigoAtivoDuplicado(dadosValidados.codigo, opcaoId);
  }

  return menuRepository.atualizar(opcaoId, dadosValidados);
}

async function excluir(id) {
  const opcaoId = parseId(id);
  await buscarPorId(opcaoId);
  return menuRepository.excluir(opcaoId);
}

async function alternarAtivo(id) {
  const opcaoId = parseId(id);
  const opcao = await buscarPorId(opcaoId);

  if (!opcao.ativo) {
    await validarCodigoAtivoDuplicado(opcao.codigo, opcaoId);
  }

  return menuRepository.atualizar(opcaoId, {
    ativo: !opcao.ativo
  });
}

async function obterTextoInicial() {
  const configuracao = await menuRepository.buscarConfiguracaoPorChave(CHAVE_MENU_INICIAL);

  if (configuracao) {
    return configuracao.valor;
  }

  return TEXTO_INICIAL_PADRAO;
}

async function salvarTextoInicial(texto) {
  const valor = String(texto || '').trim();

  if (!valor) {
    throw httpError(400, 'Texto do menu inicial e obrigatorio');
  }

  return menuRepository.salvarConfiguracao(CHAVE_MENU_INICIAL, valor);
}

module.exports = {
  listar,
  listarAtivas,
  buscarPorCodigo,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  alternarAtivo,
  obterTextoInicial,
  salvarTextoInicial
};
