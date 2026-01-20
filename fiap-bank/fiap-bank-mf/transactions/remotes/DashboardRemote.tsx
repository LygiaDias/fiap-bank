
import { TransactionsProvider } from "../context/TransactionsContext";
import DashboardPage from "../pages/index";

export default function DashboardRemote() {
  return (
    <TransactionsProvider>
      <DashboardPage />
    </TransactionsProvider>
  );
}
