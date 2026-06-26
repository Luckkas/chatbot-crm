# Planejamento do Projeto

## Contexto

O projeto nasceu como uma automação de atendimento via WhatsApp utilizando WAHA e n8n.

A primeira etapa já validou o fluxo:

```text
Cliente envia mensagem
→ WhatsApp
→ WAHA
→ Webhook n8n
→ Switch/Menu
→ HTTP Request WAHA
→ Cliente recebe resposta
```

Agora o objetivo é criar um painel simples para facilitar testes, organizar dados e apresentar algo visual ao cliente.

## Importante

Este sistema deve ser tratado como **MVP/protótipo funcional**.

O backend definitivo poderá ser refeito, expandido ou substituído posteriormente pelo responsável técnico do projeto.

## Responsabilidades

### Lucas
- Integração WAHA
- Fluxos n8n
- Automação de mensagens
- Protótipo do dashboard
- Testes ponta a ponta

### Gidian
- Backend definitivo
- Arquitetura final
- Regras de negócio finais
- Integração com sistemas do cliente, se necessário

## Stack inicial recomendada

Para entregar rápido:

- ASP.NET Core MVC
- Entity Framework Core
- SQLite
- Bootstrap
- Swagger para APIs

Evitar React no primeiro momento para reduzir complexidade.

## Módulos do MVP

### 1. Dashboard
Exibir:
- total de clientes
- mensagens recebidas hoje
- mensagens enviadas hoje
- atendimentos abertos
- últimas mensagens

### 2. Clientes
Campos:
- id
- nome
- telefone
- status
- data de cadastro
- observações

### 3. Conversas
Campos:
- id
- clienteId
- telefone
- status da conversa
- etapa atual do menu
- data de abertura
- data de atualização

### 4. Mensagens
Campos:
- id
- conversaId
- telefone
- direção: recebida/enviada
- conteúdo
- origem: whatsapp/n8n/sistema
- data/hora

### 5. Menus do bot
Permitir cadastrar opções simples:
- código da opção
- descrição
- resposta automática
- ativo/inativo

### 6. Logs
Registrar eventos importantes:
- webhook recebido
- mensagem enviada
- erro de integração
- payload recebido
- payload enviado

## Endpoints iniciais para o n8n

### Clientes

```http
GET /api/clientes
GET /api/clientes/telefone/{telefone}
POST /api/clientes
```

### Conversas

```http
GET /api/conversas
POST /api/conversas
GET /api/conversas/telefone/{telefone}
```

### Mensagens

```http
GET /api/mensagens
POST /api/mensagens
```

### Menu

```http
GET /api/menu
GET /api/menu/opcao/{codigo}
```

### Logs

```http
POST /api/logs
GET /api/logs
```

## Regras de desenvolvimento

- Criar código simples e legível.
- Evitar overengineering.
- Priorizar entrega.
- Usar nomes em português para entidades principais.
- Separar Controllers, Services, Models e Data.
- Usar DTOs para entrada e saída de API.
- Deixar Swagger habilitado.
- Criar seed inicial com menus 1, 2, 3 e inválido.

## Critério de sucesso

O MVP será considerado funcional quando:

- for possível cadastrar clientes;
- visualizar conversas;
- salvar mensagens recebidas pelo n8n;
- salvar mensagens enviadas;
- configurar respostas de menu;
- consultar dados pelo n8n via API;
- apresentar o painel visualmente ao cliente.
