import { Transaction } from "../context/TransactionsContext";

export const TRANSACTION_TYPE_LABEL: Record<Transaction["type"], string> = {
  deposit: "Depósito",
  payment: "Pagamento",
  transfer: "Transferência",
  withdraw: "Saque",
};

export function getTransactionTypeLabel(type: Transaction["type"]) {
  return TRANSACTION_TYPE_LABEL[type] ?? type;
}
