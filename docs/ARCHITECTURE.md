# Arquitetura

## Visão geral

```text
Cliente
  ↓
WhatsApp
  ↓
WAHA
  ↓
n8n
  ↓
Backend Node/Express
  ↓
PostgreSQL
  ↓
Dashboard EJS
```

## Componentes

### WAHA

Responsável por:
- manter sessão do WhatsApp;
- receber mensagens;
- enviar eventos via webhook para o n8n;
- enviar mensagens através da API `/api/sendText`.

### n8n

Responsável por:
- receber webhook do WAHA;
- interpretar mensagens;
- aplicar regras de menu;
- chamar backend quando necessário;
- enviar respostas pelo WAHA.

### Backend Node.js / Express

Responsável por:
- armazenar clientes;
- armazenar conversas;
- armazenar mensagens;
- fornecer dados para o dashboard;
- fornecer APIs para o n8n;
- permitir configuração simples do menu.

### PostgreSQL

Responsável por persistir:
- clientes;
- conversas;
- mensagens;
- opções de menu;
- logs de integração.

### Dashboard EJS

Responsável por:
- exibir visão geral;
- listar clientes;
- listar conversas;
- exibir histórico de mensagens;
- mostrar logs;
- permitir edição de menus simples.

## Comunicação entre n8n e Backend

O n8n deve chamar endpoints HTTP do backend.

Exemplo:

```text
n8n recebe mensagem "1"
↓
GET /api/menu/opcao/1
↓
backend retorna resposta
↓
n8n envia resposta pelo WAHA
```

## Payload padrão sugerido

```json
{
  "telefone": "5548999999999",
  "mensagem": "1",
  "nome": "Cliente",
  "origem": "whatsapp",
  "dataHora": "2026-06-26T23:00:00"
}
```

## Estrutura sugerida

```text
backend/
  src/
    controllers/
    services/
    repositories/
    routes/
    views/
    public/
    prisma/
    app.js
    server.js
  package.json
```

## Observação

O backend deve ser simples e direto. O objetivo é entregar um protótipo funcional, não uma arquitetura corporativa complexa.
