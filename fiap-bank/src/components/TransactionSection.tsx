import { Transaction } from "../context/TransactionsContext";
import TransactionList from "./TransactionList";
interface Props {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export default function TransactionsSection({ transactions, onEdit, onDelete, onNew }: Props) {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Últimas transações</h2>
        <button
          onClick={onNew}
          className="bg-fiapPink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Nova Transação
        </button>
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  );
}
