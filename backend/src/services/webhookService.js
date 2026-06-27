const clienteService = require('./clienteService');
const conversaService = require('./conversaService');
const mensagemService = require('./mensagemService');
const menuService = require('./menuService');
const logService = require('./logService');
const httpError = require('../utils/httpError');

async function receberMensagem(dados) {
  if (!dados.telefone) {
    throw httpError(400, 'Telefone e obrigatorio');
  }

  if (!dados.mensagem) {
    throw httpError(400, 'Mensagem e obrigatoria');
  }

  const cliente = await clienteService.procurarOuCriarPorTelefone({
    telefone: dados.telefone,
    nome: dados.nome
  });

  const menu = await menuService.buscarPorCodigo(String(dados.mensagem).trim());

  const conversa = await conversaService.procurarAbertaOuCriar({
    clienteId: cliente.id,
    telefone: dados.telefone,
    etapaAtual: menu ? menu.codigo : null
  });

  const mensagemRecebida = await mensagemService.criar({
    conversaId: conversa.id,
    telefone: dados.telefone,
    direcao: 'recebida',
    conteudo: dados.mensagem,
    origem: dados.origem || 'whatsapp'
  });

  const resposta = menu ? menu.respostaAutomatica : 'Opcao nao reconhecida.';

  await logService.criar({
    tipo: 'webhook_mensagem',
    origem: dados.origem || 'n8n',
    destino: 'backend',
    status: 'processado',
    mensagem: 'Mensagem recebida pelo webhook',
    payloadRecebido: dados,
    payloadEnviado: {
      telefone: dados.telefone,
      resposta
    }
  });

  return {
    telefone: dados.telefone,
    resposta,
    clienteId: cliente.id,
    conversaId: conversa.id,
    mensagemId: mensagemRecebida.id,
    menuCodigo: menu ? menu.codigo : null
  };
}

module.exports = {
  receberMensagem
};
