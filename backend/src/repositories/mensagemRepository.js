const prisma = require('../config/prisma');

function listar() {
  return prisma.mensagem.findMany({
    include: { conversa: true },
    orderBy: { dataHora: 'desc' }
  });
}

function criar(dados) {
  return prisma.mensagem.create({
    data: dados
  });
}

module.exports = {
  listar,
  criar
};
