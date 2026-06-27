const prisma = require('../config/prisma');

function listar() {
  return prisma.contatoEnvio.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

function listarAtivos() {
  return prisma.contatoEnvio.findMany({
    where: { ativo: true },
    select: {
      id: true,
      nome: true,
      telefone: true
    },
    orderBy: { nome: 'asc' }
  });
}

function buscarPorId(id) {
  return prisma.contatoEnvio.findUnique({
    where: { id }
  });
}

function buscarPorTelefone(telefone) {
  return prisma.contatoEnvio.findUnique({
    where: { telefone }
  });
}

function criar(dados) {
  return prisma.contatoEnvio.create({
    data: dados
  });
}

function atualizar(id, dados) {
  return prisma.contatoEnvio.update({
    where: { id },
    data: dados
  });
}

function excluir(id) {
  return prisma.contatoEnvio.delete({
    where: { id }
  });
}

module.exports = {
  listar,
  listarAtivos,
  buscarPorId,
  buscarPorTelefone,
  criar,
  atualizar,
  excluir
};
