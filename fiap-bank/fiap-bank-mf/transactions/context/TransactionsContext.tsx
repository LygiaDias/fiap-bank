import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type TransactionType = "deposit" | "withdraw" | "payment" | "transfer";

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  attachmentName?: string;
  attachmentUrl?: string;
};

type TransactionsContextValue = {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  clearTransactions: () => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

const STORAGE_KEY = "fiap-bank:transactions:v1";

function readStorage(): Transaction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Transaction[];
  } catch {
    return [];
  }
}

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  // ✅ carrega direto do localStorage sem useEffect
  const [transactions, setTransactions] = useState<Transaction[]>(() => readStorage());

  // ✅ salva sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const value = useMemo<TransactionsContextValue>(() => {
    return {
      transactions,

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: crypto.randomUUID(),
        };

        setTransactions((prev) => [newTx, ...prev]);
      },

      updateTransaction: (tx) => {
        setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
      },

      deleteTransaction: (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      },

      clearTransactions: () => {
        setTransactions([]);
      },
    };
  }, [transactions]);

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
  return ctx;
}
