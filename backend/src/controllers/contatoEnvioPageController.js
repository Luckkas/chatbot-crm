const contatoEnvioService = require('../services/contatoEnvioService');

function obterMensagem(req) {
  return {
    sucesso: req.query.sucesso || null,
    erro: req.query.erro || null
  };
}

async function listar(req, res, next) {
  try {
    const contatos = await contatoEnvioService.listar();

    res.render('pages/contatos-envio/index', {
      title: 'Contatos de envio',
      activePage: 'contatos-envio',
      contatos,
      mensagem: obterMensagem(req)
    });
  } catch (error) {
    next(error);
  }
}

function novo(req, res) {
  res.render('pages/contatos-envio/form', {
    title: 'Novo contato de envio',
    activePage: 'contatos-envio',
    contato: {
      nome: '',
      telefone: '',
      ativo: true,
      observacao: ''
    },
    action: '/contatos-envio',
    formTitle: 'Novo contato',
    error: null
  });
}

async function criar(req, res, next) {
  try {
    await contatoEnvioService.criar({
      ...req.body,
      ativo: req.body.ativo === 'on'
    });

    res.redirect('/contatos-envio?sucesso=Contato cadastrado com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.status(error.status).render('pages/contatos-envio/form', {
        title: 'Novo contato de envio',
        activePage: 'contatos-envio',
        contato: {
          ...req.body,
          ativo: req.body.ativo === 'on'
        },
        action: '/contatos-envio',
        formTitle: 'Novo contato',
        error: error.message
      });
    }

    return next(error);
  }
}

async function editar(req, res, next) {
  try {
    const contato = await contatoEnvioService.buscarPorId(req.params.id);

    res.render('pages/contatos-envio/form', {
      title: 'Editar contato de envio',
      activePage: 'contatos-envio',
      contato,
      action: `/contatos-envio/${contato.id}`,
      formTitle: 'Editar contato',
      error: null
    });
  } catch (error) {
    next(error);
  }
}

async function atualizar(req, res, next) {
  try {
    await contatoEnvioService.atualizar(req.params.id, {
      ...req.body,
      ativo: req.body.ativo === 'on'
    });

    res.redirect('/contatos-envio?sucesso=Contato atualizado com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      return res.status(error.status).render('pages/contatos-envio/form', {
        title: 'Editar contato de envio',
        activePage: 'contatos-envio',
        contato: {
          id: req.params.id,
          ...req.body,
          ativo: req.body.ativo === 'on'
        },
        action: `/contatos-envio/${req.params.id}`,
        formTitle: 'Editar contato',
        error: error.message
      });
    }

    return next(error);
  }
}

async function excluir(req, res, next) {
  try {
    await contatoEnvioService.excluir(req.params.id);
    res.redirect('/contatos-envio?sucesso=Contato excluido com sucesso');
  } catch (error) {
    next(error);
  }
}

async function alternarAtivo(req, res, next) {
  try {
    await contatoEnvioService.alternarAtivo(req.params.id);
    res.redirect('/contatos-envio?sucesso=Status atualizado com sucesso');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  novo,
  criar,
  editar,
  atualizar,
  excluir,
  alternarAtivo
};
