import { Transaction } from "../context/TransactionsContext";
import { getTransactionTypeLabel } from "./transactionLabels";

export function exportTransactionsCsv(transactions: Transaction[]) {
  const headers = ["Data", "Tipo", "Descrição", "Categoria", "Valor", "Anexos"];

  const rows = transactions.map((t) => [
    t.date,
    getTransactionTypeLabel(t.type),
    t.description ?? "",
    t.category ?? "",
    String(t.amount),
    String(t.attachments?.length ?? 0),
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `transacoes-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
