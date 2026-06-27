const menuService = require('../services/menuService');

function obterMensagem(req) {
  return {
    sucesso: req.query.sucesso || null,
    erro: req.query.erro || null
  };
}

async function listar(req, res, next) {
  try {
    const [menus, textoInicial] = await Promise.all([
      menuService.listar(),
      menuService.obterTextoInicial()
    ]);

    res.render('pages/menu', {
      title: 'Menus',
      activePage: 'menu',
      menus,
      textoInicial,
      mensagem: obterMensagem(req)
    });
  } catch (error) {
    next(error);
  }
}

async function salvarTextoInicial(req, res, next) {
  try {
    await menuService.salvarTextoInicial(req.body.textoInicial);
    res.redirect('/menu?sucesso=Texto inicial atualizado com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.redirect(`/menu?erro=${encodeURIComponent(error.message)}`);
    }

    return next(error);
  }
}

function novo(req, res) {
  res.render('pages/menu-form', {
    title: 'Nova opcao de menu',
    activePage: 'menu',
    formTitle: 'Nova opcao',
    action: '/menu/opcoes',
    opcao: {
      codigo: '',
      descricao: '',
      respostaAutomatica: '',
      ativo: true
    },
    error: null
  });
}

async function criar(req, res, next) {
  try {
    await menuService.criar({
      ...req.body,
      ativo: req.body.ativo === 'on'
    });

    res.redirect('/menu?sucesso=Opcao cadastrada com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.status(error.status).render('pages/menu-form', {
        title: 'Nova opcao de menu',
        activePage: 'menu',
        formTitle: 'Nova opcao',
        action: '/menu/opcoes',
        opcao: {
          ...req.body,
          ativo: req.body.ativo === 'on'
        },
        error: error.message
      });
    }

    return next(error);
  }
}

async function editar(req, res, next) {
  try {
    const opcao = await menuService.buscarPorId(req.params.id);

    res.render('pages/menu-form', {
      title: 'Editar opcao de menu',
      activePage: 'menu',
      formTitle: 'Editar opcao',
      action: `/menu/opcoes/${opcao.id}`,
      opcao,
      error: null
    });
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    await menuService.atualizar(req.params.id, {
      ...req.body,
      ativo: req.body.ativo === 'on'
    });

    res.redirect('/menu?sucesso=Opcao atualizada com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.status(error.status).render('pages/menu-form', {
        title: 'Editar opcao de menu',
        activePage: 'menu',
        formTitle: 'Editar opcao',
        action: `/menu/opcoes/${req.params.id}`,
        opcao: {
          id: req.params.id,
          ...req.body,
          ativo: req.body.ativo === 'on'
        },
        error: error.message
      });
    }

    return next(error);
  }
}

async function excluir(req, res, next) {
  try {
    await menuService.excluir(req.params.id);
    res.redirect('/menu?sucesso=Opcao excluida com sucesso');
  } catch (error) {
    next(error);
  }
}

async function alternarAtivo(req, res, next) {
  try {
    await menuService.alternarAtivo(req.params.id);
    res.redirect('/menu?sucesso=Status da opcao atualizado com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.redirect(`/menu?erro=${encodeURIComponent(error.message)}`);
    }

    return next(error);
  }
}

module.exports = {
  listar,
  salvarTextoInicial,
  novo,
  criar,
  editar,
  atualizar,
  excluir,
  alternarAtivo
};
