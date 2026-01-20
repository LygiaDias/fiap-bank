import React from "react";
import { Transaction } from "../context/TransactionsContext";
import Button from "./Button";

export default function TransactionItem({
  tx,
  onEdit,
  onDelete,
}: {
  tx: Transaction;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="flex items-center justify-between bg-white rounded-lg p-3 shadow">
      <div className="flex flex-col gap-1">
        <div className="font-medium">{tx.description ?? tx.type}</div>

        <div className="text-xs text-gray-400">
          {tx.date} · {tx.type}
        </div>

        {tx.category && (
          <div className="text-xs text-gray-500">
            Categoria: <span className="font-medium">{tx.category}</span>
          </div>
        )}

        {tx.attachments?.length ? (
          <div className="text-xs text-gray-400">{tx.attachments.length} anexo(s)</div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className={tx.amount >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {Number(tx.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </div>

        <Button size="sm" onClick={onEdit} aria-label="Editar transação">
          Editar
        </Button>

        <Button size="sm" variant="danger" onClick={onDelete} aria-label="Excluir transação">
          Excluir
        </Button>
      </div>
    </li>
  );
}
