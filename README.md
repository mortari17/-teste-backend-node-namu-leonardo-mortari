# Wellness Programs API

API REST para gerenciamento de programas de bem-estar, atividades e participação de usuários.

O projeto simula um cenário comum em plataformas de saúde e bem-estar, permitindo cadastrar programas (como meditação, yoga e nutrição), definir atividades dentro desses programas e registrar a participação dos usuários.

Este projeto foi desenvolvido como parte de um teste técnico backend.

Autor: **Leonardo Mortari**.

---

# Funcionalidades

## Programs

CRUD completo de programas.

```http
POST /programs
GET /programs
GET /programs/:program_id
PUT /programs/:program_id
DELETE /programs/:program_id
```

---

## Activities

CRUD completo de atividades vinculadas a um programa.

Endpoints:

```http
POST /programs/:program_id/activities
GET /programs/:program_id/activities
GET /activities/:activity_id
PUT /activities/:activity_id
DELETE /activities/:activity_id
```

---

## Participations

CRUD completo de participações de usuários em atividades.

```http
POST /participations
GET /participations
GET /participations/:participation_id
PUT /participations/:participation_id
DELETE /participations/:participation_id
```

---

## Program Summary

Relatório simples de um programa. Retorna total de atividades, total de participações e lista dos 5 participantes mais
ativos.

```http
GET /programs/:program_id/summary
```

---

# Tecnologias utilizadas

## NestJS

Framework backend baseado em arquitetura modular e fortemente tipado com TypeScript.

Motivos da escolha:

- organização clara por módulos
- injeção de dependência nativa
- arquitetura escalável
- integração simples com ferramentas do ecossistema

---

## TypeORM

ORM utilizado para acesso ao banco de dados.

Motivos da escolha:

- integração direta com NestJS
- suporte a migrations
- abstração segura de queries
- possibilidade de criação de consultas mais complexas

---

## MySQL

Banco de dados relacional utilizado para persistência.

Escolhido por ser amplamente utilizado em aplicações web e por já estar definido nos requisitos do teste técnico.

---

## Docker / Docker Compose

Utilizado para facilitar a execução do projeto e garantir um ambiente consistente.

O Docker Compose sobe dois serviços:

- API NestJS
- Banco de dados MySQL

Dessa forma, toda a aplicação pode ser iniciada com um único comando.

---

## pnpm

Gerenciador de pacotes utilizado no projeto.

Motivos da escolha:

- instalação mais rápida que npm/yarn
- melhor gerenciamento de dependências
- uso eficiente de espaço em disco

---

## Jest

Framework utilizado para testes.

Foram implementados:

- testes unitários para regras de negócio
- testes de integração (E2E) para endpoints principais

---

## ESLint + Prettier

Ferramentas utilizadas para manter:

- padronização de código
- formatação consistente
- prevenção de erros comuns

---

# Instalação

## 1. Clonar o repositório

```bash
git clone <repo>
cd <repo>
```

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

---

## 3. Subir toda a aplicação com Docker

```bash
pnpm run start:docker
```

Isso iniciará:

- API NestJS
- Banco MySQL

A API ficará disponível em:

```
http://localhost:3000
```

E, usando a documentação interativa da API do **Swagger**:

```
http://localhost:3000/docs
```

---

# Testes

Executar testes unitários:

```bash
pnpm run test
```

Executar testes E2E:

```bash
pnpm run test:e2e
```

---

# Health Check

Endpoint disponível para verificação da aplicação:

```http
GET /health
```

---

# CI

O projeto possui um workflow de **GitHub Actions** que executa automaticamente:

- instalação das dependências
- execução dos testes

a cada push no repositório e abertura de PRs.

---

# Estrutura do Projeto

O projeto segue uma arquitetura modular inspirada nas boas práticas do NestJS:

- src
  - config
  - modules
    - activities
    - participations
    - programs
  - shared
    - decorator
    - entity
    - utils

Cada módulo contém:

- controller
- service
- DTOs
- testes (e2e e unitários)

---

## Uso de DTOs

DTOs foram utilizados para:

- validação de dados
- tipagem clara das requisições
- separação entre entrada da API e modelo de domínio

---

# O que faria diferente com mais tempo

Algumas melhorias que poderiam ser implementadas:

- Uso de Redis para cache de consultas frequentes, como o relatório de resumo de programas, reduzindo carga no banco de dados.

- Melhoria no modelo de usuários, criando uma tabela `users` para representar os usuários da aplicação em vez de apenas armazenar `user_name` como texto nas participações.

- Implementação de auditoria nas entidades, adicionando campos como `created_by`, `created_at`, `updated_by` e `updated_at` nas tabelas para rastrear alterações realizadas no sistema.

- Implementação de novos endpoints de relatórios, como programas com maior número de participações e atividades mais realizadas.
