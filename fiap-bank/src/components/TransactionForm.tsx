"use client";
import React, { useState } from "react";
import { Transaction } from "../context/TransactionsContext";

export default function TransactionForm({
  onClose,
  onSubmit,
  initial,
}: {
  onClose?: () => void;
  onSubmit: (t: Omit<Transaction, "id">) => void;
  initial?: Partial<Transaction>;
}) {
  const [type, setType] = useState(initial?.type ?? "deposit");
  const [amount, setAmount] = useState<number>(initial?.amount ?? 0);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [transferAccount, setTransferAccount] = useState(initial?.transferAccount ?? "");
  const [transferType, setTransferType] = useState<"own" | "external">(
    (initial?.transferType as "own" | "external") ?? "own"
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ type: type as any, amount: Number(amount), description, date, transferAccount, transferType });
    if (onClose) onClose();
  }

  // Formata o valor em R$
  const formatCurrencyBR = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as any)}
        className="p-2 rounded border"
      >
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
        <option value="payment">Pagamento</option>
        <option value="withdraw">Saque</option>
      </select>

      <input
        type="text"
        value={formatCurrencyBR(amount)}
        onChange={(e) => {
          const numericValue = Number(e.target.value.replace(/\D/g, "")) / 100;
          setAmount(numericValue);
        }}
        placeholder="Valor"
        className="p-2 rounded border"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 rounded border"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        className="p-2 rounded border"
      />

      {type === "transfer" && (
        <>
          <select
            value={transferType}
            onChange={(e) => setTransferType(e.target.value as "own" | "external")}
            className="p-2 rounded border"
          >
            <option value="own">Entre minhas contas</option>
            <option value="external">Para terceiros</option>
          </select>

          <input
            value={transferAccount}
            onChange={(e) => setTransferAccount(e.target.value)}
            placeholder="Conta destino"
            className="p-2 rounded border"
          />
        </>
      )}

      <div className="flex justify-end gap-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300"
          >
            Cancelar
          </button>
        )}
        <button type="submit" className="px-3 py-1 rounded bg-fiapPink text-white">
          Salvar
        </button>
      </div>
    </form>
  );
}
