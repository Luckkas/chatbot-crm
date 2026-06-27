const prisma = require('../config/prisma');

function listar() {
  return prisma.conversa.findMany({
    include: { cliente: true },
    orderBy: { dataAtualizacao: 'desc' }
  });
}

function buscarPorTelefone(telefone) {
  return prisma.conversa.findMany({
    where: { telefone },
    include: { cliente: true },
    orderBy: { dataAtualizacao: 'desc' }
  });
}

function buscarAbertaPorTelefone(telefone) {
  return prisma.conversa.findFirst({
    where: {
      telefone,
      status: 'aberta'
    },
    orderBy: { dataAtualizacao: 'desc' }
  });
}

function criar(dados) {
  return prisma.conversa.create({
    data: dados
  });
}

function atualizar(id, dados) {
  return prisma.conversa.update({
    where: { id },
    data: dados
  });
}

module.exports = {
  listar,
  buscarPorTelefone,
  buscarAbertaPorTelefone,
  criar,
  atualizar
};
