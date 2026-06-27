# Prompts úteis para o Codex

## Criar backend inicial

Leia o PLANNING.md, ARCHITECTURE.md e CONTEXT.md.

Crie a estrutura inicial do projeto Node.js usando Express, Prisma ORM, PostgreSQL, EJS e Bootstrap. Não implemente autenticação ainda. Priorize simplicidade e entrega.

## Criar clientes

Implemente CRUD de Clientes com rotas API e telas EJS. Campos: nome, telefone, status, observações e data de cadastro.

## Criar conversas

Implemente Conversas vinculadas a Clientes. Uma conversa deve ter telefone, status, etapa atual do menu, data de abertura e data de atualização.

## Criar mensagens

Implemente Mensagens vinculadas a Conversas. Cada mensagem deve ter direção, conteúdo, origem, telefone e data/hora.

## Criar menus

Implemente MenuOpcao com código, descrição, resposta automática e ativo/inativo. Crie endpoint para buscar menu por código.

## Criar logs

Implemente LogIntegracao para registrar eventos de webhook, payload recebido, payload enviado e erros.

## Integração com n8n

Crie um endpoint POST /api/webhook/mensagem para receber mensagens vindas do n8n no formato:

{
  "telefone": "5548999999999",
  "mensagem": "1",
  "nome": "Cliente",
  "origem": "whatsapp"
}

O endpoint deve:
1. procurar ou criar cliente pelo telefone;
2. criar ou atualizar conversa;
3. salvar mensagem recebida;
4. buscar resposta no menu;
5. retornar JSON com telefone e resposta.
