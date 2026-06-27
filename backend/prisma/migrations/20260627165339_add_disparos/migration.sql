-- CreateTable
CREATE TABLE "disparos_mensagem" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disparos_mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disparos_contatos" (
    "id" SERIAL NOT NULL,
    "disparoId" INTEGER NOT NULL,
    "contatoId" INTEGER NOT NULL,
    "statusEnvio" TEXT NOT NULL DEFAULT 'pendente',
    "dataEnvio" TIMESTAMP(3),
    "erroEnvio" TEXT,

    CONSTRAINT "disparos_contatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "disparos_mensagem_status_idx" ON "disparos_mensagem"("status");

-- CreateIndex
CREATE INDEX "disparos_contatos_statusEnvio_idx" ON "disparos_contatos"("statusEnvio");

-- CreateIndex
CREATE INDEX "disparos_contatos_contatoId_idx" ON "disparos_contatos"("contatoId");

-- CreateIndex
CREATE UNIQUE INDEX "disparos_contatos_disparoId_contatoId_key" ON "disparos_contatos"("disparoId", "contatoId");

-- AddForeignKey
ALTER TABLE "disparos_contatos" ADD CONSTRAINT "disparos_contatos_disparoId_fkey" FOREIGN KEY ("disparoId") REFERENCES "disparos_mensagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disparos_contatos" ADD CONSTRAINT "disparos_contatos_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "contatos_envio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
