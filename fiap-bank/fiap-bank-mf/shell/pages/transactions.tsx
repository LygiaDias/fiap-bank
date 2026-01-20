import dynamic from "next/dynamic";

const TransactionsRemote = dynamic(
  () => import("transactions/TransactionsRemote"),
  { ssr: false }
);

export default function TransactionsRoute() {
  return <TransactionsRemote />;
}
