const dashboardRepository = require('../repositories/dashboardRepository');

async function obterResumo() {
  const inicioHoje = new Date();
  inicioHoje.setHours(0, 0, 0, 0);

  const inicioAmanha = new Date(inicioHoje);
  inicioAmanha.setDate(inicioAmanha.getDate() + 1);

  const [
    totalClientes,
    conversasAbertas,
    mensagensRecebidasHoje,
    mensagensEnviadasHoje,
    ultimasMensagens
  ] = await Promise.all([
    dashboardRepository.contarClientes(),
    dashboardRepository.contarConversasAbertas(),
    dashboardRepository.contarMensagensPorDirecaoNoPeriodo('recebida', inicioHoje, inicioAmanha),
    dashboardRepository.contarMensagensPorDirecaoNoPeriodo('enviada', inicioHoje, inicioAmanha),
    dashboardRepository.listarUltimasMensagens()
  ]);

  return {
    totalClientes,
    conversasAbertas,
    mensagensRecebidasHoje,
    mensagensEnviadasHoje,
    ultimasMensagens
  };
}

module.exports = {
  obterResumo
};
