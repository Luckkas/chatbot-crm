-- DropIndex
DROP INDEX "menu_opcoes_codigo_key";

-- CreateTable
CREATE TABLE "menu_configuracoes" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_configuracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_configuracoes_chave_key" ON "menu_configuracoes"("chave");

-- CreateIndex
CREATE INDEX "menu_opcoes_codigo_idx" ON "menu_opcoes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "menu_opcoes_codigo_ativo_unique" ON "menu_opcoes"("codigo") WHERE "ativo" = true;
