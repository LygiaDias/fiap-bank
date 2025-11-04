import { TransactionsProvider, useTransactions } from "../context/TransactionsContext";
import TransactionItem from "../components/TransactionItem";
import { useState } from "react";
import EditTransactionForm from "../components/EditTransactionForm";
import Link from "next/link";

export default function TransactionsPage() {
  return (
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  );
}

function Transactions() {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const [editing, setEditing] = useState<any | null>(null);

  return (
    <main className="min-h-screen p-8 bg-fiapLight">
      <header className="container flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-fiapPink">Transações</h1>
        <Link href="/home"><a className="text-sm text-gray-600">Voltar</a></Link>
      </header>

      <div className="container max-w-4xl mx-auto">
        <ul className="flex flex-col gap-3">
          {transactions.map(tx => (
            <TransactionItem key={tx.id} tx={tx} onEdit={() => setEditing(tx)} onDelete={() => deleteTransaction(tx.id)} />
          ))}
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative z-10 w-full max-w-lg p-6">
            <div className="bg-white rounded-xl p-4 shadow-card">
              <h3 className="text-xl font-bold text-fiapPink mb-3">Editar transação</h3>
              <EditTransactionForm transaction={editing} onClose={() => setEditing(null)} onUpdate={(t) => { updateTransaction(t); setEditing(null); }} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
