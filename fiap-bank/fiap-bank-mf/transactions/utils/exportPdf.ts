import jsPDF from "jspdf";
import { Transaction } from "../context/TransactionsContext";
import { getTransactionTypeLabel } from "./transactionLabels";
import { groupTransactionsByDate } from "./groupTransactions";
groupTransactionsByDate

function formatCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDateTimeBR() {
  return new Date().toLocaleString("pt-BR");
}

function safeText(text: string, max = 40) {
  const t = (text ?? "").trim();
  if (!t) return "-";
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}

type ExportPdfOptions = {
  title?: string;
  subtitle?: string;
};

export function exportTransactionsPdfPremium(
  transactions: Transaction[],
  options?: ExportPdfOptions
) {
  const doc = new jsPDF();

  const title = options?.title ?? "FIAP Bank";
  const subtitle = options?.subtitle ?? "Relatório de Transações";

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 14;

  let y = 16;

  // ===== Header =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(subtitle, marginX, y + 7);

  doc.setFontSize(9);
  doc.setTextColor(90);
  doc.text(`Gerado em: ${formatDateTimeBR()}`, marginX, y + 13);
  doc.setTextColor(0);

  // Linha separadora
  doc.setDrawColor(220);
  doc.line(marginX, y + 17, pageWidth - marginX, y + 17);

  y += 26;

  // ===== Resumo =====
  const totalIn = transactions
    .filter((t) => t.type === "deposit")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalOut = transactions
    .filter((t) => t.type === "withdraw" || t.type === "payment" || t.type === "transfer")
    .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

  const net = totalIn - totalOut;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Resumo", marginX, y);

  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Entradas: ${formatCurrencyBRL(totalIn)}`, marginX, y);
  doc.text(`Saídas: ${formatCurrencyBRL(totalOut)}`, marginX + 70, y);
  doc.text(`Saldo: ${formatCurrencyBRL(net)}`, marginX + 130, y);

  y += 8;

  doc.setDrawColor(230);
  doc.line(marginX, y, pageWidth - marginX, y);

  y += 10;

  // ===== Conteúdo =====
  if (!transactions.length) {
    doc.setFontSize(12);
    doc.text("Nenhuma transação encontrada para exportar.", marginX, y);
    doc.save(`transacoes-${new Date().toISOString().slice(0, 10)}.pdf`);
    return;
  }

  const groups = groupTransactionsByDate(transactions);

  const addPageIfNeeded = (extraSpace = 0) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + extraSpace > pageHeight - 14) {
      doc.addPage();
      y = 16;
    }
  };

  // Cabeçalho de colunas
  const drawTableHeader = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("Data", marginX, y);
    doc.text("Tipo", marginX + 26, y);
    doc.text("Descrição", marginX + 60, y);
    doc.text("Valor", pageWidth - marginX - 22, y);

    doc.setDrawColor(230);
    doc.line(marginX, y + 2, pageWidth - marginX, y + 2);

    doc.setFont("helvetica", "normal");
    y += 8;
  };

  drawTableHeader();

  groups.forEach((group: any) => {
    addPageIfNeeded(16);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(group.title.toUpperCase(), marginX, y);

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    y += 7;

    group.items.forEach((t: any) => {
      addPageIfNeeded(18);

      const typeLabel = getTransactionTypeLabel(t.type);
      const desc = safeText(t.description ?? "", 42);
      const valueIsOut = t.type === "withdraw" || t.type === "payment" || t.type === "transfer";

      const signedValue = valueIsOut ? -Math.abs(t.amount) : Math.abs(t.amount);
      const valueText = `${signedValue < 0 ? "-" : ""}${formatCurrencyBRL(Math.abs(signedValue))}`;

      doc.setFontSize(10);
      doc.setTextColor(0);

      doc.text(t.date, marginX, y);
      doc.text(typeLabel, marginX + 26, y);
      doc.text(desc, marginX + 60, y);

      doc.text(valueText, pageWidth - marginX, y, { align: "right" });

      y += 5;

      doc.setFontSize(8);
      doc.setTextColor(120);

      const categoryText = `Categoria: ${t.category ?? "-"}`;
      const attachText = `Anexos: ${t.attachments?.length ?? 0}`;

      doc.text(`${categoryText}  |  ${attachText}`, marginX + 26, y);

      doc.setTextColor(0);
      y += 8;

      doc.setDrawColor(245);
      doc.line(marginX, y - 4, pageWidth - marginX, y - 4);
    });

    y += 2;
  });

  addPageIfNeeded(20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(110);

  doc.text(
    "FIAP Bank • Relatório gerado automaticamente para fins acadêmicos.",
    marginX,
    doc.internal.pageSize.getHeight() - 12
  );

  doc.setTextColor(0);

  doc.save(`transacoes-${new Date().toISOString().slice(0, 10)}.pdf`);
}
