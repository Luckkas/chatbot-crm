const menuRepository = require('../repositories/menuRepository');

function listar() {
  return menuRepository.listar();
}

async function buscarPorCodigo(codigo) {
  const opcao = await menuRepository.buscarPorCodigo(codigo);

  if (opcao && opcao.ativo) {
    return opcao;
  }

  return menuRepository.buscarPorCodigo('invalido');
}

module.exports = {
  listar,
  buscarPorCodigo
};
