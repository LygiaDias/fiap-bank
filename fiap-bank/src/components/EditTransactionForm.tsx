"use client";
import React, { useState } from "react";
import { Transaction } from "../context/TransactionsContext";

export default function EditTransactionForm({ transaction, onClose, onUpdate }: { transaction: Transaction; onClose: () => void; onUpdate: (t: Transaction) => void; }) {
  const [description, setDescription] = useState(transaction.description ?? "");
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [date, setDate] = useState<string>(transaction.date);
  const [type, setType] = useState<Transaction["type"]>(transaction.type);

  function save(e: React.FormEvent) {
    e.preventDefault();
    onUpdate({ ...transaction, description, amount: Number(amount), date, type });
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-3">
      <input value={description} onChange={e => setDescription(e.target.value)} className="p-2 rounded border" />
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="p-2 rounded border" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-2 rounded border" />
      <select value={type} onChange={e => setType(e.target.value as any)} className="p-2 rounded border">
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
        <option value="payment">Pagamento</option>
        <option value="withdraw">Saque</option>
      </select>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-300">Cancelar</button>
        <button type="submit" className="px-3 py-1 rounded bg-fiapPink text-white">Salvar</button>
      </div>
    </form>
  );
}
