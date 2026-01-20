"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};

export type Transaction = {
  id: string;
  type: "deposit" | "transfer" | "payment" | "withdraw";
  amount: number;
  description?: string;
  date: string;

  category?: string;
  attachments?: Attachment[];
};

type ContextValue = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionsContext = createContext<ContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/transactions.json")
      .then(r => r.json())
      .then((data) => setTransactions(data))
      .catch((e) => {
        console.error("Erro carregando mock:", e);
        setTransactions([]);
      });
  }, []);

  function addTransaction(t: Omit<Transaction, "id">) {
    const newTx: Transaction = { ...t, id: Math.random().toString(36).slice(2, 9) };
    setTransactions(prev => [newTx, ...prev]);
  }

  function updateTransaction(updated: Transaction) {
    setTransactions(prev => prev.map(tx => (tx.id === updated.id ? updated : tx)));
  }

  function deleteTransaction(id: string) {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
  return ctx;
}
