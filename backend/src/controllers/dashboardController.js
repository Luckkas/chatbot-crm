const dashboardService = require('../services/dashboardService');
const clienteService = require('../services/clienteService');
const conversaService = require('../services/conversaService');
const mensagemService = require('../services/mensagemService');
const menuService = require('../services/menuService');
const logService = require('../services/logService');
const wahaService = require('../services/wahaService');

async function index(req, res, next) {
  try {
    const resumo = await dashboardService.obterResumo();
    const wahaStatus = await wahaService.verificarStatus();

    res.render('pages/dashboard', {
      title: 'Dashboard',
      activePage: 'dashboard',
      resumo,
      wahaStatus
    });
  } catch (error) {
    next(error);
  }
}

async function clientes(req, res, next) {
  try {
    const clientesLista = await clienteService.listar();

    res.render('pages/clientes', {
      title: 'Clientes',
      activePage: 'clientes',
      clientes: clientesLista
    });
  } catch (error) {
    next(error);
  }
}

async function conversas(req, res, next) {
  try {
    const conversasLista = await conversaService.listar();

    res.render('pages/conversas', {
      title: 'Conversas',
      activePage: 'conversas',
      conversas: conversasLista
    });
  } catch (error) {
    next(error);
  }
}

async function mensagens(req, res, next) {
  try {
    const mensagensLista = await mensagemService.listar();

    res.render('pages/mensagens', {
      title: 'Mensagens',
      activePage: 'mensagens',
      mensagens: mensagensLista
    });
  } catch (error) {
    next(error);
  }
}

async function menu(req, res, next) {
  try {
    const menus = await menuService.listar();

    res.render('pages/menu', {
      title: 'Menus',
      activePage: 'menu',
      menus
    });
  } catch (error) {
    next(error);
  }
}

async function logs(req, res, next) {
  try {
    const logsLista = await logService.listar();

    res.render('pages/logs', {
      title: 'Logs',
      activePage: 'logs',
      logs: logsLista
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  clientes,
  conversas,
  mensagens,
  menu,
  logs
};
