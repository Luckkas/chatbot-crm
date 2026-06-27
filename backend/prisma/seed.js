const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const opcoes = [
  {
    codigo: '1',
    descricao: 'Suporte',
    respostaAutomatica: 'Voce escolheu Suporte. Em breve nossa equipe vai continuar o atendimento.',
    ativo: true
  },
  {
    codigo: '2',
    descricao: 'Financeiro',
    respostaAutomatica: 'Voce escolheu Financeiro. Vamos direcionar sua solicitacao.',
    ativo: true
  },
  {
    codigo: '3',
    descricao: 'Planos',
    respostaAutomatica: 'Voce escolheu Planos. Vamos enviar as opcoes disponiveis.',
    ativo: true
  },
  {
    codigo: 'invalido',
    descricao: 'Opcao invalida',
    respostaAutomatica: 'Opcao nao reconhecida. Responda com 1 para Suporte, 2 para Financeiro ou 3 para Planos.',
    ativo: true
  }
];

async function main() {
  for (const opcao of opcoes) {
    const existente = await prisma.menuOpcao.findFirst({
      where: { codigo: opcao.codigo }
    });

    if (existente) {
      await prisma.menuOpcao.update({
        where: { id: existente.id },
        data: opcao
      });
    } else {
      await prisma.menuOpcao.create({
        data: opcao
      });
    }
  }

  await prisma.menuConfiguracao.upsert({
    where: { chave: 'menu_inicial' },
    update: {},
    create: {
      chave: 'menu_inicial',
      valor: 'Ola! Escolha uma opcao:\n1. Suporte\n2. Financeiro\n3. Planos'
    }
  });
}

main()
  .then(async () => {
    console.log('Seed de menus concluido.');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
