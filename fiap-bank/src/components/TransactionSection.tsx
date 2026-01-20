import Link from "next/link";
import { Transaction } from "../context/TransactionsContext";
import TransactionList from "./TransactionList";
import Button from "./Button";

interface Props {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export default function TransactionsSection({ transactions, onEdit, onDelete, onNew }: Props) {
  return (
    <section className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Últimas transações</h2>
          <p className="text-sm text-gray-500">
            Visualização rápida das transações mais recentes
          </p>
        </div>

        {/* Menu de ações */}
        <div className="flex items-center gap-2">
          <Link href="/transactions">
            <Button variant="ghost">Ver todas</Button>
          </Link>

          <Button onClick={onNew}>Nova transação</Button>
        </div>
      </div>

      {/* Lista */}
      <TransactionList transactions={transactions} onEdit={onEdit} onDelete={onDelete} />
    </section>
  );
}
