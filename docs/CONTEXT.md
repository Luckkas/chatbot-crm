# Contexto do Projeto

Este projeto é desenvolvido como apoio a uma automação de chatbot via WhatsApp.

## Situação atual

Já existe uma integração funcional entre:

- WAHA
- WhatsApp
- n8n
- Webhook
- Switch de opções
- Envio de resposta via WAHA

As mensagens já conseguem seguir este fluxo:

```text
Mensagem recebida no WhatsApp
→ WAHA envia webhook para n8n
→ n8n identifica opção
→ n8n chama WAHA
→ WhatsApp recebe resposta
```

## Motivação do painel

Os testes estavam sendo feitos com PowerShell, curl e endpoints manuais.

O painel será criado para:
- facilitar testes;
- visualizar clientes e conversas;
- demonstrar o projeto para o cliente;
- validar formato do sistema antes do backend definitivo;
- reduzir dependência de comandos no terminal.

## Papel do MVP

Este projeto é um protótipo funcional.

Ele pode ser:
- mantido;
- reaproveitado parcialmente;
- usado apenas como referência;
- substituído pelo backend definitivo depois.

## Decisões tomadas

- Usar ASP.NET Core MVC em vez de React no primeiro momento.
- Usar SQLite inicialmente.
- Priorizar entrega rápida.
- Evitar complexidade desnecessária.
- Criar APIs simples para integração com n8n.
- Manter n8n como orquestrador principal da automação.

## Objetivo prático

Criar algo que possa ser apresentado visualmente e ajude no desenvolvimento do projeto real.
