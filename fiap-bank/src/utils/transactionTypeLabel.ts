import { Transaction } from "../context/TransactionsContext";

export function transactionTypeLabel(type: Transaction["type"]) {
  switch (type) {
    case "deposit":
      return "Depósito";
    case "transfer":
      return "Transferência";
    case "payment":
      return "Pagamento";
    case "withdraw":
      return "Saque";
    default:
      return type;
  }
}
