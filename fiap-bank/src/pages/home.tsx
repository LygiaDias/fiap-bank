"use client";

import { useMemo, useState } from "react";
import { useTransactions, Transaction } from "../context/TransactionsContext";

import UserHeader from "../components/UserHeader";
import RecentDaysWidget from "../components/RecentDaysWidget";
import SavingsWidget from "../components/SavingsWidget";
import ModalWrapper from "../components/ModalWrapper";
import TransactionsSection from "../components/TransactionSection";
import TransactionForm from "../components/TransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";
import Card from "../components/Card";
import Button from "../components/Button";

function formatCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function HomePage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [openNew, setOpenNew] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const user = {
    name: "Taylor Swift",
    account: "1234-5",
    agency: "0001",
    avatar: "https://i.pravatar.cc/100?img=5",
    balance: 5230.75,
    savings: 1500.45,
  };

  const chartData = useMemo(() => {
    // últimos 7 itens (melhorar depois com agrupamento por dia)
    return transactions.slice(-7).map((t, i) => ({
      day: `Dia ${i + 1}`,
      value: t.amount * (t.type === "withdraw" ? -1 : 1),
    }));
  }, [transactions]);

  const savingsData = useMemo(() => {
    return {
      invested: user.savings,
      yield: user.savings * 0.012,
    };
  }, [user.savings]);

  const insights = useMemo(() => {
    const totalIn = transactions
      .filter((t) => t.type === "deposit")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalOut = transactions
      .filter((t) => t.type === "withdraw" || t.type === "payment")
      .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    const net = totalIn - totalOut;

    const biggestExpense = transactions
      .filter((t) => t.type === "withdraw" || t.type === "payment")
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];

    return {
      totalIn,
      totalOut,
      net,
      biggestExpense,
    };
  }, [transactions]);

  return (
    <main className="min-h-screen bg-fiapLight p-8">
      <header className="container mx-auto mb-8 flex flex-col gap-4">
        <UserHeader user={user} />

        {/* Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentDaysWidget chartData={chartData} />
          <SavingsWidget savings={savingsData} />
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-gray-500">Entradas</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrencyBRL(insights.totalIn)}</p>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Saídas</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrencyBRL(insights.totalOut)}</p>
          </Card>

          <Card>
            <p className="text-sm text-gray-500">Saldo do período</p>
            <p className="text-2xl font-bold">{formatCurrencyBRL(insights.net)}</p>
          </Card>
        </div>

        {insights.biggestExpense && (
          <Card className="border border-red-100">
            <p className="text-sm text-gray-500">Maior gasto</p>
            <p className="font-semibold">
              {insights.biggestExpense.description ?? insights.biggestExpense.type} —{" "}
              <span className="text-red-600">
                {formatCurrencyBRL(Math.abs(insights.biggestExpense.amount))}
              </span>
            </p>
            <p className="text-xs text-gray-400">{insights.biggestExpense.date}</p>
          </Card>
        )}
      </header>

      <div className="container max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-fiapPink">Dashboard</h1>
        </div>

        <TransactionsSection
          transactions={transactions.slice(0, 5)}
          onEdit={(tx) => setEditing(tx)}
          onDelete={(id) => deleteTransaction(id)}
          onNew={() => setOpenNew(true)}
        />
      </div>

      {/* Modal - Nova */}
      {openNew && (
        <ModalWrapper onClose={() => setOpenNew(false)}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-fiapPink">Nova transação</h3>
            <Button variant="ghost" onClick={() => setOpenNew(false)}>
              Fechar
            </Button>
          </div>

          <TransactionForm
            onClose={() => setOpenNew(false)}
            onSubmit={(v) => {
              addTransaction(v);
              setOpenNew(false);
            }}
          />
        </ModalWrapper>
      )}

      {/* Modal - Editar */}
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
            onUpdate={(v) => {
              updateTransaction(v);
              setEditing(null);
            }}
          />
        </ModalWrapper>
      )}
    </main>
  );
}
