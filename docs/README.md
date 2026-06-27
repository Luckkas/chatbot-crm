# Chatbot CRM

Projeto MVP para gerenciamento de atendimentos via WhatsApp, usando WAHA + n8n + um painel administrativo simples.

## Objetivo

Criar um painel para facilitar testes, demonstrações e organização inicial do chatbot, sem depender de testes manuais via PowerShell/terminal.

Este projeto **não é necessariamente o backend definitivo**. Ele serve como protótipo funcional para validar a ideia, apresentar ao cliente e facilitar a integração com as automações.

## Stack sugerida

### Backend e painel

- Node.js
- Express
- Prisma ORM
- PostgreSQL local
- EJS para renderização das páginas
- Bootstrap para interface

### Automação

- WAHA para integração com WhatsApp
- n8n para orquestração dos fluxos
- Webhooks para comunicação entre sistemas

## Fluxo geral

```text
WhatsApp
   ↓
WAHA
   ↓
n8n
   ↓
Backend Express
   ↓
PostgreSQL
   ↓
Dashboard
```

## Funcionalidades do MVP

- Dashboard geral
- Cadastro de clientes
- Histórico de conversas
- Registro de mensagens recebidas e enviadas
- Configuração simples de menus do bot
- Logs de integrações
- Tela de disparos manuais
- Endpoints para o n8n consultar e gravar dados
