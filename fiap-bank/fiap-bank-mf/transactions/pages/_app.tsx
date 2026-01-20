import type { AppProps } from "next/app";
import "../styles/globals.css";
import { TransactionsProvider } from "../context/TransactionsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionsProvider>
      <Component {...pageProps} />
    </TransactionsProvider>
  );
}
