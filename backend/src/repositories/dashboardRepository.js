const prisma = require('../config/prisma');

function contarClientes() {
  return prisma.cliente.count();
}

function contarConversasAbertas() {
  return prisma.conversa.count({
    where: { status: 'aberta' }
  });
}

function contarMensagensPorDirecaoNoPeriodo(direcao, inicio, fim) {
  return prisma.mensagem.count({
    where: {
      direcao,
      dataHora: {
        gte: inicio,
        lt: fim
      }
    }
  });
}

function listarUltimasMensagens(limite = 8) {
  return prisma.mensagem.findMany({
    take: limite,
    include: {
      conversa: {
        include: { cliente: true }
      }
    },
    orderBy: { dataHora: 'desc' }
  });
}

module.exports = {
  contarClientes,
  contarConversasAbertas,
  contarMensagensPorDirecaoNoPeriodo,
  listarUltimasMensagens
};
