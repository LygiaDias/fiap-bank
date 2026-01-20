import { useMemo, useState } from "react";
import Link from "next/link";

import { useTransactions, Transaction } from "../context/TransactionsContext";
import TransactionItem from "../components/TransactionItem";
import EditTransactionForm from "../components/EditTransactionForm";
import ModalWrapper from "../components/ModalWrapper";
import Button from "../components/Button";
import Card from "../components/Card";
import { exportTransactionsCsv } from "src/utils/esportCsv";
import { exportTransactionsPdfPremium } from "../utils/exportPdf";

function formatCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const PAGE_SIZE = 10;

export default function TransactionsPage() {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const [editing, setEditing] = useState<Transaction | null>(null);

  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | Transaction["type"]>("all");
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return transactions.filter((tx) => {
      if (type !== "all" && tx.type !== type) return false;

      if (q) {
        const desc = (tx.description ?? "").toLowerCase();
        const t = tx.type.toLowerCase();
        const cat = (tx.category ?? "").toLowerCase();

        if (!desc.includes(q) && !t.includes(q) && !cat.includes(q)) return false;
      }

      if (minValue) {
        const min = Number(minValue);
        if (!Number.isNaN(min) && Math.abs(tx.amount) < min) return false;
      }

      if (maxValue) {
        const max = Number(maxValue);
        if (!Number.isNaN(max) && Math.abs(tx.amount) > max) return false;
      }

      if (startDate && tx.date < startDate) return false;
      if (endDate && tx.date > endDate) return false;

      return true;
    });
  }, [transactions, query, type, minValue, maxValue, startDate, endDate]);

  const visible = useMemo(() => {
    return filtered.slice(0, page * PAGE_SIZE);
  }, [filtered, page]);

  const totalIn = useMemo(() => {
    return filtered
      .filter((t) => t.type === "deposit")
      .reduce((acc, t) => acc + Number(t.amount), 0);
  }, [filtered]);

  const totalOut = useMemo(() => {
    return filtered
      .filter((t) => t.type === "withdraw" || t.type === "payment" || t.type === "transfer")
      .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
  }, [filtered]);

  return (
    <main className="min-h-screen p-8 bg-fiapLight">
      <header className="container flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-fiapPink">Transações</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => exportTransactionsCsv(filtered)}
            aria-label="Exportar transações filtradas para CSV"
          >
            Exportar CSV
          </Button>

          <Button
            variant="ghost"
            onClick={() => exportTransactionsPdfPremium(filtered)}
            aria-label="Exportar transações filtradas para PDF"
          >
            Exportar PDF
          </Button>

          <Link href="/home" className="text-sm text-gray-600">
            Voltar
          </Link>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto flex flex-col gap-4">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card>
            <p className="text-sm text-gray-500">Entradas</p>
            <p className="text-lg font-bold text-green-600">{formatCurrencyBRL(totalIn)}</p>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Saídas</p>
            <p className="text-lg font-bold text-red-600">{formatCurrencyBRL(totalOut)}</p>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-bold">{filtered.length} transações</p>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por descrição, tipo ou categoria..."
                className="p-2 rounded border w-full"
              />

              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as any);
                  setPage(1);
                }}
                className="p-2 rounded border w-full md:w-56"
              >
                <option value="all">Todos os tipos</option>
                <option value="deposit">Depósito</option>
                <option value="transfer">Transferência</option>
                <option value="payment">Pagamento</option>
                <option value="withdraw">Saque</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                value={minValue}
                onChange={(e) => {
                  setMinValue(e.target.value);
                  setPage(1);
                }}
                placeholder="Valor mín."
                type="number"
                className="p-2 rounded border"
              />
              <input
                value={maxValue}
                onChange={(e) => {
                  setMaxValue(e.target.value);
                  setPage(1);
                }}
                placeholder="Valor máx."
                type="number"
                className="p-2 rounded border"
              />
              <input
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                type="date"
                className="p-2 rounded border"
              />
              <input
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                type="date"
                className="p-2 rounded border"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setQuery("");
                  setType("all");
                  setMinValue("");
                  setMaxValue("");
                  setStartDate("");
                  setEndDate("");
                  setPage(1);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista */}
        <ul className="flex flex-col gap-3">
          {visible.map((tx) => (
            <TransactionItem
              key={tx.id}
              tx={tx}
              onEdit={() => setEditing(tx)}
              onDelete={() => deleteTransaction(tx.id)}
            />
          ))}
        </ul>

        {/* Paginação estilo scroll */}
        {visible.length < filtered.length && (
          <div className="flex justify-center pt-2">
            <Button onClick={() => setPage((p) => p + 1)}>Carregar mais</Button>
          </div>
        )}

        {!filtered.length && (
          <p className="text-center text-gray-500 py-8">Nenhuma transação encontrada com os filtros atuais.</p>
        )}
      </div>

      {/* Modal editar */}
      {editing && (
        <ModalWrapper onClose={() => setEditing(null)}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-fiapPink">Editar transação</h3>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Fechar
            </Button>
          </div>

          <EditTransactionForm
            transaction={editing}
            onClose={() => setEditing(null)}
            onUpdate={(t) => {
              updateTransaction(t);
              setEditing(null);
            }}
          />
        </ModalWrapper>
      )}
    </main>
  );
}
