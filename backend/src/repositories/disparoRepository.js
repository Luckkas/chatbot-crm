const prisma = require('../config/prisma');

function listar() {
  return prisma.disparoMensagem.findMany({
    include: {
      contatos: {
        include: { contato: true },
        orderBy: { id: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

function criar(dados, contatoIds) {
  return prisma.disparoMensagem.create({
    data: {
      ...dados,
      contatos: {
        create: contatoIds.map((contatoId) => ({
          contatoId
        }))
      }
    },
    include: {
      contatos: {
        include: { contato: true }
      }
    }
  });
}

function buscarPorId(id) {
  return prisma.disparoMensagem.findUnique({
    where: { id },
    include: {
      contatos: {
        include: { contato: true },
        orderBy: { id: 'asc' }
      }
    }
  });
}

function excluir(id) {
  return prisma.disparoMensagem.delete({
    where: { id }
  });
}

function listarPendentes() {
  return prisma.disparoMensagem.findMany({
    where: {
      status: 'pendente',
      contatos: {
        some: { statusEnvio: 'pendente' }
      }
    },
    include: {
      contatos: {
        where: { statusEnvio: 'pendente' },
        include: { contato: true },
        orderBy: { id: 'asc' }
      }
    },
    orderBy: { createdAt: 'asc' }
  });
}

function marcarDisparoEnviado(id) {
  return prisma.$transaction(async (tx) => {
    await tx.disparoContato.updateMany({
      where: {
        disparoId: id,
        statusEnvio: 'pendente'
      },
      data: {
        statusEnvio: 'enviado',
        dataEnvio: new Date(),
        erroEnvio: null
      }
    });

    return tx.disparoMensagem.update({
      where: { id },
      data: { status: 'enviado' }
    });
  });
}

function buscarContatoDisparoPorId(id) {
  return prisma.disparoContato.findUnique({
    where: { id },
    include: { disparo: true }
  });
}

async function atualizarStatusDisparo(tx, disparoId) {
  const contatos = await tx.disparoContato.findMany({
    where: { disparoId },
    select: { statusEnvio: true }
  });

  if (contatos.length === 0) {
    return tx.disparoMensagem.update({
      where: { id: disparoId },
      data: { status: 'pendente' }
    });
  }

  const todosEnviados = contatos.every((contato) => contato.statusEnvio === 'enviado');
  const todosFinalizados = contatos.every((contato) => contato.statusEnvio !== 'pendente');
  const algumErro = contatos.some((contato) => contato.statusEnvio === 'erro');

  let status = 'pendente';

  if (todosEnviados) {
    status = 'enviado';
  } else if (todosFinalizados && algumErro) {
    status = 'erro';
  }

  return tx.disparoMensagem.update({
    where: { id: disparoId },
    data: { status }
  });
}

function marcarContatoEnviado(id) {
  return prisma.$transaction(async (tx) => {
    const contatoDisparo = await tx.disparoContato.update({
      where: { id },
      data: {
        statusEnvio: 'enviado',
        dataEnvio: new Date(),
        erroEnvio: null
      }
    });

    await atualizarStatusDisparo(tx, contatoDisparo.disparoId);

    return contatoDisparo;
  });
}

function marcarContatoErro(id, erroEnvio) {
  return prisma.$transaction(async (tx) => {
    const contatoDisparo = await tx.disparoContato.update({
      where: { id },
      data: {
        statusEnvio: 'erro',
        erroEnvio,
        dataEnvio: new Date()
      }
    });

    await atualizarStatusDisparo(tx, contatoDisparo.disparoId);

    return contatoDisparo;
  });
}

module.exports = {
  listar,
  criar,
  buscarPorId,
  excluir,
  listarPendentes,
  marcarDisparoEnviado,
  buscarContatoDisparoPorId,
  marcarContatoEnviado,
  marcarContatoErro
};
