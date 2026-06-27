const prisma = require('../config/prisma');

function listar() {
  return prisma.menuOpcao.findMany({
    orderBy: { codigo: 'asc' }
  });
}

function buscarPorCodigo(codigo) {
  return prisma.menuOpcao.findFirst({
    where: { codigo, ativo: true },
    orderBy: { id: 'asc' }
  });
}

function buscarPorId(id) {
  return prisma.menuOpcao.findUnique({
    where: { id }
  });
}

function buscarAtivaPorCodigo(codigo) {
  return prisma.menuOpcao.findFirst({
    where: { codigo, ativo: true },
    orderBy: { id: 'asc' }
  });
}

function listarAtivas() {
  return prisma.menuOpcao.findMany({
    where: { ativo: true },
    select: {
      codigo: true,
      descricao: true,
      respostaAutomatica: true
    },
    orderBy: { codigo: 'asc' }
  });
}

function criar(dados) {
  return prisma.menuOpcao.create({
    data: dados
  });
}

function atualizar(id, dados) {
  return prisma.menuOpcao.update({
    where: { id },
    data: dados
  });
}

function excluir(id) {
  return prisma.menuOpcao.delete({
    where: { id }
  });
}

function buscarConfiguracaoPorChave(chave) {
  return prisma.menuConfiguracao.findUnique({
    where: { chave }
  });
}

function salvarConfiguracao(chave, valor) {
  return prisma.menuConfiguracao.upsert({
    where: { chave },
    update: { valor },
    create: { chave, valor }
  });
}

module.exports = {
  listar,
  buscarPorCodigo,
  buscarPorId,
  buscarAtivaPorCodigo,
  listarAtivas,
  criar,
  atualizar,
  excluir,
  buscarConfiguracaoPorChave,
  salvarConfiguracao
};
