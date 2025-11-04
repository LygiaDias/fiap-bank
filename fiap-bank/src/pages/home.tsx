"use client";

import { useState } from "react";
import { TransactionsProvider, useTransactions, Transaction } from "../context/TransactionsContext";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";
import UserHeader from "../components/UserHeader";
import RecentDaysWidget from "../components/RecentDaysWidget";
import SavingsWidget from "../components/SavingsWidget";
import ModalWrapper from "../components/ModalWrapper";
import TransactionsSection from "@components/TransactionSection";
TransactionsSection

export default function HomePage() {
  return (
    <TransactionsProvider>
      <HomeContent />
    </TransactionsProvider>
  );
}

function HomeContent() {
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

  const chartData = transactions.slice(-7).map((t, i) => ({
    day: `Dia ${i + 1}`,
    value: t.amount * (t.type === "withdraw" ? -1 : 1),
  }));

  const savingsData = {
    invested: user.savings,
    yield: user.savings * 0.012, // rendimento fictício
  };

  return (
    <main className="min-h-screen bg-fiapLight p-8">
      <header className="container mx-auto mb-8 flex flex-col gap-4">
        <UserHeader user={user} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentDaysWidget chartData={chartData} />
          <SavingsWidget savings={savingsData} />
        </div>
      </header>

      <div className="container max-w-4xl mx-auto flex flex-col gap-8">

        <TransactionsSection
          transactions={transactions.slice(0, 5)}
          onEdit={(tx) => setEditing(tx)}
          onDelete={(id) => deleteTransaction(id)}
          onNew={() => setOpenNew(true)}
        />
      </div>

      {/* Modais */}
      {openNew && (
        <ModalWrapper onClose={() => setOpenNew(false)}>
          <TransactionForm
            onClose={() => setOpenNew(false)}
            onSubmit={(v) => {
              addTransaction(v);
              setOpenNew(false);
            }}
          />
        </ModalWrapper>
      )}

      {editing && (
        <ModalWrapper onClose={() => setEditing(null)}>
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
