const prisma = require('../config/prisma');

function listar() {
  return prisma.cliente.findMany({
    orderBy: { dataCadastro: 'desc' }
  });
}

function buscarPorTelefone(telefone) {
  return prisma.cliente.findUnique({
    where: { telefone }
  });
}

function criar(dados) {
  return prisma.cliente.create({
    data: dados
  });
}

function atualizarPorTelefone(telefone, dados) {
  return prisma.cliente.update({
    where: { telefone },
    data: dados
  });
}

module.exports = {
  listar,
  buscarPorTelefone,
  criar,
  atualizarPorTelefone
};
