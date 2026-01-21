# FIAP Bank — Tech Challenge (Microfrontends)

Repositório: https://github.com/LygiaDias/fiap-bank.git

Este projeto é uma aplicação de gerenciamento financeiro construída com **Next.js + React + TypeScript**, evoluída para uma arquitetura de **Microfrontends** usando **Module Federation**.

---

## 🎯 Objetivo do Tech Challenge

Aprimorar e escalar a aplicação existente, incluindo:
- Dashboard com análises financeiras
- Listagem de transações com filtros avançados e busca
- Paginação/scroll infinito (carregar mais)
- Criar/editar transações com validações avançadas
- Upload de anexos (comprovantes)
- Melhorias de performance, segurança e UX
- Deploy e execução em ambientes cloud
- Containerização com Docker

---

## 🧱 Arquitetura (Microfrontends)

O projeto foi separado em 2 aplicações (MVP funcional):

- **shell (host)** → porta **3000**
  - Tela de boas-vindas
  - Rotas `/home` e `/transactions` carregam módulos remotos
- **transactions (remote)** → porta **3001**
  - Dashboard/Home completo
  - Página de transações com filtros, anexos e exportação

---

## 🗂 Estrutura de pastas (microfront)

```
fiap-bank-mf/
  shell/
  transactions/
  docker-compose.yml
```

---

## 🧪 Rotas

### Shell (host)
- `http://localhost:3000/` → Welcome
- `http://localhost:3000/home` → Dashboard remoto
- `http://localhost:3000/transactions` → Transações remoto

### Transactions (remote)
- `http://localhost:3001/home` → Dashboard local
- `http://localhost:3001/transactions` → Transações local

---

## 🚀 Como rodar localmente (sem Docker)

> Abra **2 terminais**.

### Terminal 1 — Transactions (Remote)
```bash
cd fiap-bank-mf/transactions
npm install
npm run dev -p 3001
```

### Terminal 2 — Shell (Host)
```bash
cd fiap-bank-mf/shell
npm install
npm run dev -p 3000
```

Acesse:
- Shell: http://localhost:3000
- Home: http://localhost:3000/home
- Transactions: http://localhost:3000/transactions

---

## 🐳 Como rodar com Docker (Docker Compose)

Pré-requisito: **Docker Desktop** instalado e rodando.

Na pasta `fiap-bank-mf`:

```bash
docker compose up --build
```

Acesse:
- http://localhost:3000

---

## 📦 Principais features entregues

### Dashboard/Home
- Cards de resumo (Entradas / Saídas / Saldo do período)
- Widgets de visualização (ex: últimos dias, economia)
- UX melhorado e layout responsivo

### Transações
- Busca por descrição / tipo / categoria
- Filtros por:
  - tipo
  - valor mínimo e máximo
  - intervalo de datas
- Paginação estilo “Carregar mais”
- Exibição de **categoria** e **anexos**
- CRUD completo (criar / editar / excluir)

### Exportação
- Exportação **CSV**
- Exportação **PDF Premium**

---

## 🧩 Module Federation (Resumo)

### Remote (transactions)
Expondo módulos:
- `./DashboardRemote`
- `./TransactionsRemote`

### Host (shell)
Consumindo:
- `transactions@http://localhost:3001/_next/static/chunks/remoteEntry.js`

---

## ⚠️ Problemas comuns (Troubleshooting)

### Remote offline (RUNTIME-008)
- Verifique se o `transactions` está rodando na porta 3001
- Verifique se o remoteEntry está acessível:
  - `http://localhost:3001/_next/static/chunks/remoteEntry.js`

### Global CSS
No Next.js, `globals.css` deve ser importado apenas no:
- `pages/_app.tsx`

### `useTransactions must be used within TransactionsProvider`
Isso acontece quando o componente remoto usa o hook sem Provider.
Solução: garantir que o Remote exporte um wrapper com Provider, ou que o Shell envolva o remote com o Provider.

---

## ☁️ Deploy (Cloud)
Recomendado: **Vercel**

Deploy separado:
- `shell` em um projeto
- `transactions` em outro projeto

Depois ajustar a URL do remote no shell:

```js
remotes: {
  transactions:
    "transactions@https://SEU-REMOTE.vercel.app/_next/static/chunks/remoteEntry.js",
}
```

---

## 📽️ Vídeo demonstrativo (Checklist)
No vídeo, mostrar:
- Navegação Shell → Home (remote)
- Navegação Shell → Transactions (remote)
- Criar transação
- Editar transação
- Filtros + busca + carregar mais
- Upload e exibição de anexos
- Exportar CSV e PDF
- Rodando com Docker (opcional, se disponível)

---

## 👩‍💻 Autoria
Projeto desenvolvido por: **Lygia Dias**
