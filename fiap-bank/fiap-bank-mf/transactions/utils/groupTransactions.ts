import { Transaction } from "../context/TransactionsContext";

function toDateKey(date: string) {
  return date;
}

function formatGroupTitle(dateKey: string) {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (dateKey === todayKey) return "Hoje";
  if (dateKey === yesterdayKey) return "Ontem";

  const [y, m, d] = dateKey.split("-");
  return `${d}/${m}/${y}`;
}

export type GroupedTransactions = {
  title: string;
  dateKey: string;
  items: Transaction[];
};

export function groupTransactionsByDate(transactions: Transaction[]): GroupedTransactions[] {
  const map = new Map<string, Transaction[]>();

  transactions.forEach((t) => {
    const key = toDateKey(t.date);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  });

  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1)) 
    .map(([dateKey, items]) => ({
      dateKey,
      title: formatGroupTitle(dateKey),
      items,
    }));
}
