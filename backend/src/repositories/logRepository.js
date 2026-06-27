const prisma = require('../config/prisma');

function listar() {
  return prisma.logIntegracao.findMany({
    orderBy: { dataHora: 'desc' }
  });
}

function criar(dados) {
  return prisma.logIntegracao.create({
    data: dados
  });
}

module.exports = {
  listar,
  criar
};
