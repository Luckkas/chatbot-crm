-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "telefone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "observacoes" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversas" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER,
    "telefone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aberta',
    "etapaAtual" TEXT,
    "dataAbertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" SERIAL NOT NULL,
    "conversaId" INTEGER,
    "telefone" TEXT NOT NULL,
    "direcao" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "origem" TEXT NOT NULL DEFAULT 'whatsapp',
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_opcoes" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "respostaAutomatica" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_opcoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_integracao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "origem" TEXT,
    "destino" TEXT,
    "status" TEXT NOT NULL DEFAULT 'registrado',
    "mensagem" TEXT,
    "payloadRecebido" JSONB,
    "payloadEnviado" JSONB,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_integracao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_telefone_key" ON "clientes"("telefone");

-- CreateIndex
CREATE INDEX "conversas_telefone_idx" ON "conversas"("telefone");

-- CreateIndex
CREATE INDEX "conversas_clienteId_idx" ON "conversas"("clienteId");

-- CreateIndex
CREATE INDEX "mensagens_telefone_idx" ON "mensagens"("telefone");

-- CreateIndex
CREATE INDEX "mensagens_conversaId_idx" ON "mensagens"("conversaId");

-- CreateIndex
CREATE UNIQUE INDEX "menu_opcoes_codigo_key" ON "menu_opcoes"("codigo");

-- CreateIndex
CREATE INDEX "logs_integracao_tipo_idx" ON "logs_integracao"("tipo");

-- CreateIndex
CREATE INDEX "logs_integracao_dataHora_idx" ON "logs_integracao"("dataHora");

-- AddForeignKey
ALTER TABLE "conversas" ADD CONSTRAINT "conversas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_conversaId_fkey" FOREIGN KEY ("conversaId") REFERENCES "conversas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
