import { Transaction } from "../context/TransactionsContext";

type Props = {
  transactions: Transaction[];
  onEdit?: (tx: Transaction) => void;
  onDelete?: (id: string) => void;
};

export default function TransactionList({ transactions, onEdit, onDelete }: Props) {
  if (!transactions.length) return <div className="mt-4 text-gray-500">Sem transações</div>;

  return (
    <ul className="mt-4 flex flex-col gap-3">
      {transactions.map(tx => (
        <li key={tx.id} className="flex items-center justify-between rounded-md border border-gray-300 p-3 bg-white shadow-sm">
          <div>
            <div className="font-medium">{tx.description ?? tx.type}</div>
            <div className="text-sm text-gray-500">{tx.date}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-medium">{Number(tx.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            {onEdit && (
              <button
                onClick={() => onEdit(tx)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(tx.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Excluir
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
