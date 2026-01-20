# FIAP Bank — Tech Challenge (Microfrontends)

Projeto desenvolvido para o **Tech Challenge FIAP**, com foco em **escalabilidade**, **arquitetura de microfrontends**, **deploy cloud**, melhorias de **UX**, **performance** e **segurança**.

A aplicação é um gerenciador financeiro com Dashboard e Transações, evoluída para uma arquitetura de **Microfrontends** utilizando **Next.js + Module Federation**.

---

## ✨ Funcionalidades Implementadas

### 🏠 Dashboard (Home)
- Widgets e visão geral financeira
- Cards de insights:
  - Entradas
  - Saídas
  - Saldo do período
  - Maior gasto
- Listagem de últimas transações

### 💳 Transações
- Listagem completa de transações
- Busca e filtros avançados:
  - por descrição
  - por tipo
  - por categoria
  - por valor mínimo/máximo
  - por período (data inicial e final)
- Paginação estilo “Carregar mais”
- Adicionar e editar transação
- Validação avançada (UX)
- Upload de anexos (PDF/JPG/PNG)
- Exibição de categoria e anexos na listagem
- Exportação:
  - CSV
  - PDF Premium

---

## 🧱 Arquitetura (Microfrontends)

A aplicação é composta por 2 apps:

### 1) Shell (Host) — Porta 3000
Responsável por:
- Tela de boas-vindas
- Navegação
- Carregamento do microfrontend remoto via Module Federation

📍 URL: http://localhost:3000

### 2) Transactions (Remote) — Porta 3001
Responsável por:
- Dashboard (`/home`)
- Página de transações (`/transactions`)
- Contexto e regras de negócio do módulo de transações

📍 URL: http://localhost:3001

---

## 🔌 Integração entre Microfrontends

O **Shell** carrega páginas do **Transactions** via Module Federation.

Exemplo:
- Shell acessa `/home` → renderiza o remote `transactions/HomeRemote`
- Shell acessa `/transactions` → renderiza o remote `transactions/TransactionsRemote`

---

## 🛠️ Tecnologias Utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Module Federation** (`@module-federation/nextjs-mf`)
- **TailwindCSS**
- **Docker / Docker Compose**
- **Storybook**
- **Framer Motion**
- **jsPDF**

---

## 📦 Pré-requisitos

Para rodar localmente, você precisa ter instalado:

- Node.js **18+** (recomendado 20)
- npm ou yarn
- Docker Desktop (opcional, mas recomendado)

---

# ▶️ Como Rodar o Projeto

## ✅ Opção 1 — Rodar com Docker (Recomendado)

Na raiz do projeto:

```bash
docker compose up --build
