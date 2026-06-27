# Chatbot CRM

MVP de painel administrativo para apoiar testes e demonstracoes de um chatbot WhatsApp usando WAHA, n8n, Node.js, Express, Prisma, PostgreSQL, EJS e Bootstrap.

## Estrutura inicial

```text
backend/
  prisma/
    migrations/
    schema.prisma
    seed.js
  src/
    config/
    controllers/
    repositories/
    routes/
    services/
    public/
    views/
    app.js
    server.js
docs/
frontend/
```

## Requisitos

- Node.js
- PostgreSQL local
- npm

## Configuracao

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Ajuste a variavel `DATABASE_URL` conforme seu PostgreSQL local:

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/chatbot_crm?schema=public"
PORT=3000
```

Rode a migration inicial para criar as tabelas:

```bash
npm run prisma:migrate
```

Gere o client do Prisma, se necessario:

```bash
npm run prisma:generate
```

Execute o seed inicial dos menus:

```bash
npm run seed
```

## Execucao

Para rodar em desenvolvimento:

```bash
npm run dev
```

Para rodar sem nodemon:

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## Telas do painel

- `GET /` - dashboard
- `GET /clientes` - listagem de clientes
- `GET /conversas` - listagem de conversas
- `GET /mensagens` - listagem de mensagens
- `GET /contatos-envio` - CRUD de contatos para disparos via n8n
- `GET /disparos` - listagem e criacao de disparos de menu para o n8n
- `GET /menu` - customizacao do texto inicial e opcoes do menu
- `GET /logs` - listagem de logs

## Rotas iniciais

- `GET /` - dashboard inicial
- `GET /api/health` - status do backend
- `GET /api/health/database` - teste de conexao com PostgreSQL

## APIs do MVP

### Menu

- `GET /api/menu`
- `GET /api/menu/opcao/:codigo`
- `GET /api/menu/texto-inicial`
- `GET /api/menu/opcoes-ativas`

Resposta de `GET /api/menu/texto-inicial`:

```json
{
  "texto": "Ola! Escolha uma opcao:\n1. Suporte\n2. Financeiro\n3. Planos"
}
```

Resposta de `GET /api/menu/opcoes-ativas`:

```json
[
  {
    "codigo": "1",
    "descricao": "Suporte",
    "respostaAutomatica": "Voce escolheu Suporte."
  }
]
```

### Clientes

- `GET /api/clientes`
- `GET /api/clientes/telefone/:telefone`
- `POST /api/clientes`

Exemplo:

```json
{
  "nome": "Cliente Teste",
  "telefone": "5548999999999",
  "status": "ativo",
  "observacoes": "Cadastro de teste"
}
```

### Conversas

- `GET /api/conversas`
- `GET /api/conversas/telefone/:telefone`
- `POST /api/conversas`

Exemplo:

```json
{
  "clienteId": 1,
  "telefone": "5548999999999",
  "status": "aberta",
  "etapaAtual": "1"
}
```

### Mensagens

- `GET /api/mensagens`
- `POST /api/mensagens`

Exemplo:

```json
{
  "conversaId": 1,
  "telefone": "5548999999999",
  "direcao": "recebida",
  "conteudo": "1",
  "origem": "whatsapp"
}
```

### Logs

- `GET /api/logs`
- `POST /api/logs`

Exemplo:

```json
{
  "tipo": "webhook_recebido",
  "origem": "n8n",
  "destino": "backend",
  "status": "processado",
  "mensagem": "Payload recebido com sucesso",
  "payloadRecebido": {
    "telefone": "5548999999999"
  }
}
```

### Contatos de envio

- `GET /api/contatos-envio/ativos` - lista contatos ativos para disparos via n8n

Resposta:

```json
[
  {
    "id": 1,
    "nome": "Cliente Teste",
    "telefone": "5548999999999"
  }
]
```

### Disparos

- `GET /api/disparos/pendentes` - lista disparos pendentes para o n8n enviar pelo WAHA
- `POST /api/disparos/:id/marcar-enviado` - marca um disparo como enviado
- `POST /api/disparos/contatos/:id/marcar-enviado` - marca um contato do disparo como enviado
- `POST /api/disparos/contatos/:id/marcar-erro` - marca um contato do disparo com erro

Resposta de `GET /api/disparos/pendentes`:

```json
[
  {
    "id": 1,
    "mensagem": "Ola! Escolha uma opcao:\n\n1 - Suporte",
    "contatos": [
      {
        "id": 10,
        "disparoContatoId": 10,
        "contatoId": 2,
        "nome": "Cliente Teste",
        "telefone": "5548999999999"
      }
    ]
  }
]
```

Payload de erro:

```json
{
  "erroEnvio": "Falha informada pelo n8n"
}
```

### Webhook principal

- `POST /api/webhook/mensagem`

Exemplo:

```json
{
  "telefone": "5548999999999",
  "mensagem": "1",
  "nome": "Cliente",
  "origem": "whatsapp"
}
```

Resposta esperada:

```json
{
  "telefone": "5548999999999",
  "resposta": "Voce escolheu Suporte. Em breve nossa equipe vai continuar o atendimento.",
  "clienteId": 1,
  "conversaId": 1,
  "mensagemId": 1,
  "menuCodigo": "1"
}
```

### WAHA

As rotas abaixo usam o `docker-compose.yml` em `C:\Docker\chatbot`.

- `GET /api/waha/status` - verifica se o container WAHA esta online
- `POST /api/waha/start` - executa `docker compose up -d`
- `POST /api/waha/stop` - executa `docker compose down`
- `POST /api/waha/restart` - executa `docker compose restart`

## Observacao

Esta etapa cria a base tecnica do projeto, os models iniciais do banco, as APIs iniciais e o endpoint principal para receber mensagens do n8n. Telas completas e integracoes ponta a ponta com n8n/WAHA serao implementadas nas proximas etapas.
