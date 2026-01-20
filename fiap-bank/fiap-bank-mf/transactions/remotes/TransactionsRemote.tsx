import { TransactionsProvider } from "../context/TransactionsContext";
import TransactionsPage from "../pages/transactions";

export default function TransactionsRemote() {
  return (
    <TransactionsProvider>
      <TransactionsPage />
    </TransactionsProvider>
  );
}
