"use client";

import React from "react";
import { Transaction } from "../context/TransactionsContext";
import TransactionForm from "./TransactionForm";

export default function EditTransactionForm({
  transaction,
  onClose,
  onUpdate,
}: {
  transaction: Transaction;
  onClose: () => void;
  onUpdate: (t: Transaction) => void;
}) {
  return (
    <TransactionForm
      initial={transaction}
      onClose={onClose}
      onSubmit={(payload) => {
        onUpdate({ ...transaction, ...payload });
      }}
    />
  );
}
