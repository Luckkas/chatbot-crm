const prisma = require('../config/prisma');

function listar() {
  return prisma.menuOpcao.findMany({
    orderBy: { codigo: 'asc' }
  });
}

function buscarPorCodigo(codigo) {
  return prisma.menuOpcao.findUnique({
    where: { codigo }
  });
}

module.exports = {
  listar,
  buscarPorCodigo
};
