import dynamic from "next/dynamic";

const DashboardRemote = dynamic(() => import("transactions/DashboardRemote"), {
  ssr: false,
});

export default function HomeRoute() {
  return <DashboardRemote />;
}
