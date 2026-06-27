const disparoRepository = require('../repositories/disparoRepository');
const contatoEnvioService = require('./contatoEnvioService');
const menuService = require('./menuService');
const httpError = require('../utils/httpError');

function parseId(id) {
  const parsed = Number(id);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw httpError(400, 'ID invalido');
  }

  return parsed;
}

function normalizarContatoIds(contatoIds) {
  const ids = Array.isArray(contatoIds) ? contatoIds : [contatoIds];

  return [...new Set(ids
    .filter(Boolean)
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0))];
}

async function montarMensagemMenu() {
  const [textoInicial, opcoes] = await Promise.all([
    menuService.obterTextoInicial(),
    menuService.listarAtivas()
  ]);

  const linhasOpcoes = opcoes
    .filter((opcao) => opcao.codigo !== 'invalido')
    .map((opcao) => `${opcao.codigo} - ${opcao.descricao}`);

  if (linhasOpcoes.length === 0) {
    return textoInicial;
  }

  return `${textoInicial}\n\n${linhasOpcoes.join('\n')}`;
}

function listar() {
  return disparoRepository.listar();
}

async function prepararFormulario() {
  const [contatos, mensagem] = await Promise.all([
    contatoEnvioService.listarAtivos(),
    montarMensagemMenu()
  ]);

  return {
    contatos,
    mensagem
  };
}

async function criar(dados) {
  const titulo = String(dados.titulo || '').trim();
  const mensagem = String(dados.mensagem || '').trim();
  const contatoIds = normalizarContatoIds(dados.contatoIds);

  if (!titulo) {
    throw httpError(400, 'Titulo e obrigatorio');
  }

  if (!mensagem) {
    throw httpError(400, 'Mensagem e obrigatoria');
  }

  if (contatoIds.length === 0) {
    throw httpError(400, 'Selecione ao menos um contato');
  }

  const contatosAtivos = await contatoEnvioService.listarAtivos();
  const idsAtivos = new Set(contatosAtivos.map((contato) => contato.id));
  const todosAtivos = contatoIds.every((id) => idsAtivos.has(id));

  if (!todosAtivos) {
    throw httpError(400, 'Todos os contatos selecionados devem estar ativos');
  }

  return disparoRepository.criar({
    titulo,
    mensagem,
    status: 'pendente'
  }, contatoIds);
}

function listarPendentes() {
  return disparoRepository.listarPendentes();
}

async function listarPendentesParaN8n() {
  const disparos = await listarPendentes();

  return disparos.map((disparo) => ({
    id: disparo.id,
    disparoId: disparo.id,
    mensagem: disparo.mensagem,
    contatos: disparo.contatos.map((item) => ({
      id: item.id,
      disparoContatoId: item.id,
      contatoId: item.contato.id,
      nome: item.contato.nome,
      telefone: item.contato.telefone
    }))
  }));
}

async function marcarDisparoEnviado(id) {
  const disparoId = parseId(id);
  const disparo = await disparoRepository.buscarPorId(disparoId);

  if (!disparo) {
    throw httpError(404, 'Disparo nao encontrado');
  }

  return disparoRepository.marcarDisparoEnviado(disparoId);
}

async function excluir(id) {
  const disparoId = parseId(id);
  const disparo = await disparoRepository.buscarPorId(disparoId);

  if (!disparo) {
    throw httpError(404, 'Disparo nao encontrado');
  }

  return disparoRepository.excluir(disparoId);
}

async function marcarContatoEnviado(id) {
  const contatoDisparoId = parseId(id);
  const contatoDisparo = await disparoRepository.buscarContatoDisparoPorId(contatoDisparoId);

  if (!contatoDisparo) {
    throw httpError(404, 'Contato do disparo nao encontrado');
  }

  return disparoRepository.marcarContatoEnviado(contatoDisparoId);
}

async function marcarContatoErro(id, erroEnvio) {
  const contatoDisparoId = parseId(id);
  const contatoDisparo = await disparoRepository.buscarContatoDisparoPorId(contatoDisparoId);

  if (!contatoDisparo) {
    throw httpError(404, 'Contato do disparo nao encontrado');
  }

  return disparoRepository.marcarContatoErro(
    contatoDisparoId,
    String(erroEnvio || 'Erro informado pelo n8n').trim()
  );
}

module.exports = {
  listar,
  prepararFormulario,
  montarMensagemMenu,
  criar,
  excluir,
  listarPendentesParaN8n,
  marcarDisparoEnviado,
  marcarContatoEnviado,
  marcarContatoErro
};
