import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("transactions/DashboardPage"), {
  ssr: false,
});

export default function AppRoute() {
  return <DashboardPage />;
}
