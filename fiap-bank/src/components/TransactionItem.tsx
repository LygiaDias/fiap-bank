import React from "react";
import { Transaction } from "../context/TransactionsContext";

export default function TransactionItem({ tx, onEdit, onDelete }: { tx: Transaction; onEdit: () => void; onDelete: () => void; }) {
  return (
    <li className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
      <div>
        <div className="font-medium">{tx.description ?? tx.type}</div>
        <div className="text-xs text-gray-400">{tx.date} · {tx.type}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className={tx.amount >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {Number(tx.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>
        <button onClick={onEdit} className="px-3 py-1 rounded bg-fiapPink text-white">Editar</button>
        <button onClick={onDelete} className="px-3 py-1 rounded bg-red-500 text-white">Excluir</button>
      </div>
    </li>
  );
}
