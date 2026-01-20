import { Transaction } from "../context/TransactionsContext";
import Button from "./Button";
import { transactionTypeLabel } from "../utils/transactionTypeLabel";

type Props = {
  transactions: Transaction[];
  onEdit?: (tx: Transaction) => void;
  onDelete?: (id: string) => void;
};

export default function TransactionList({ transactions, onEdit, onDelete }: Props) {
  if (!transactions.length) return <div className="mt-4 text-gray-500">Sem transações</div>;

  return (
    <ul className="mt-4 flex flex-col gap-3">
      {transactions.map((tx) => (
        <li
          key={tx.id}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-md border border-gray-200 p-4 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-800">{tx.description ?? transactionTypeLabel(tx.type)}</span>

              {tx.category && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                  {tx.category}
                </span>
              )}

              {tx.attachments?.length ? (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                  📎 {tx.attachments.length}
                </span>
              ) : null}
            </div>

            <div className="text-sm text-gray-500">{tx.date}</div>

            <div className="text-xs text-gray-400">
              Tipo: <span className="font-medium text-gray-600">{transactionTypeLabel(tx.type)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            <div
              className={
                tx.amount >= 0
                  ? "text-green-600 font-bold text-base"
                  : "text-red-600 font-bold text-base"
              }
            >
              {Number(tx.amount).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>

            <div className="flex gap-2">
              {onEdit && (
                <Button size="sm" onClick={() => onEdit(tx)} aria-label="Editar transação">
                  Editar
                </Button>
              )}

              {onDelete && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(tx.id)}
                  aria-label="Excluir transação"
                >
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
