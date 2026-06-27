const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const COMPOSE_DIR = process.env.WAHA_COMPOSE_DIR || 'C:\\Docker\\chatbot';

function executarDockerCompose(comando) {
  return execAsync(comando, {
    cwd: COMPOSE_DIR,
    windowsHide: true,
    timeout: 15000
  });
}

function normalizarSaidaJson(stdout) {
  const texto = stdout.trim();

  if (!texto) {
    return [];
  }

  try {
    const parsed = JSON.parse(texto);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    return texto
      .split(/\r?\n/)
      .map((linha) => linha.trim())
      .filter(Boolean)
      .map((linha) => {
        try {
          return JSON.parse(linha);
        } catch (parseError) {
          return { raw: linha };
        }
      });
  }
}

function containerEstaRodando(container) {
  const valores = Object.values(container)
    .filter((valor) => typeof valor === 'string')
    .join(' ')
    .toLowerCase();

  return valores.includes('waha') && (valores.includes('running') || valores.includes('up'));
}

async function verificarStatus() {
  try {
    const { stdout } = await executarDockerCompose('docker compose ps --format json');
    const containers = normalizarSaidaJson(stdout);
    const online = containers.some(containerEstaRodando);

    return {
      online,
      status: online ? 'online' : 'offline',
      composeDir: COMPOSE_DIR
    };
  } catch (error) {
    return {
      online: false,
      status: 'offline',
      composeDir: COMPOSE_DIR,
      erro: error.message
    };
  }
}

async function iniciar() {
  const resultado = await executarDockerCompose('docker compose up -d');
  return {
    acao: 'iniciar',
    status: 'executado',
    stdout: resultado.stdout,
    stderr: resultado.stderr
  };
}

async function parar() {
  const resultado = await executarDockerCompose('docker compose down');
  return {
    acao: 'parar',
    status: 'executado',
    stdout: resultado.stdout,
    stderr: resultado.stderr
  };
}

async function reiniciar() {
  const resultado = await executarDockerCompose('docker compose restart');
  return {
    acao: 'reiniciar',
    status: 'executado',
    stdout: resultado.stdout,
    stderr: resultado.stderr
  };
}

module.exports = {
  verificarStatus,
  iniciar,
  parar,
  reiniciar
};
