import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TransactionsProvider } from "../context/TransactionsContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionsProvider>
      <Component {...pageProps} />
    </TransactionsProvider>
  );
}
