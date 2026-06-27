const disparoService = require('../services/disparoService');

function obterMensagem(req) {
  return {
    sucesso: req.query.sucesso || null,
    erro: req.query.erro || null
  };
}

async function listar(req, res, next) {
  try {
    const disparos = await disparoService.listar();

    res.render('pages/disparos/index', {
      title: 'Disparos',
      activePage: 'disparos',
      disparos,
      mensagem: obterMensagem(req)
    });
  } catch (error) {
    next(error);
  }
}

async function novo(req, res, next) {
  try {
    const dadosFormulario = await disparoService.prepararFormulario();

    res.render('pages/disparos/form', {
      title: 'Criar disparo',
      activePage: 'disparos',
      contatos: dadosFormulario.contatos,
      disparo: {
        titulo: '',
        mensagem: dadosFormulario.mensagem,
        contatoIds: []
      },
      error: null
    });
  } catch (error) {
    next(error);
  }
}

async function criar(req, res, next) {
  try {
    await disparoService.criar({
      titulo: req.body.titulo,
      mensagem: req.body.mensagem,
      contatoIds: req.body.contatoIds
    });

    res.redirect('/disparos?sucesso=Disparo criado com sucesso');
  } catch (error) {
    if (error.status && error.status < 500) {
      const dadosFormulario = await disparoService.prepararFormulario();
      const contatoIds = Array.isArray(req.body.contatoIds)
        ? req.body.contatoIds
        : [req.body.contatoIds].filter(Boolean);

      return res.status(error.status).render('pages/disparos/form', {
        title: 'Criar disparo',
        activePage: 'disparos',
        contatos: dadosFormulario.contatos,
        disparo: {
          titulo: req.body.titulo || '',
          mensagem: req.body.mensagem || dadosFormulario.mensagem,
          contatoIds: contatoIds.map((id) => Number(id))
        },
        error: error.message
      });
    }

    return next(error);
  }
}

async function excluir(req, res, next) {
  try {
    await disparoService.excluir(req.params.id);
    res.redirect('/disparos?sucesso=Disparo excluido com sucesso');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  novo,
  criar,
  excluir
};
