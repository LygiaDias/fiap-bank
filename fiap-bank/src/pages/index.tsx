import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Welcome() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-fiap-gradient p-8">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-2xl w-full bg-black/20 backdrop-blur rounded-3xl p-12 text-center">
        <motion.div initial={{ rotate: -15 }} animate={{ rotate: 0 }} transition={{ duration: 0.8 }} className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} style={{ color: "white", fontWeight: 800 }}>
            FIAP
          </motion.span>
        </motion.div>

        <h1 className="text-4xl font-extrabold text-white mb-4">Bem-vindo(a), Taylor Swift!</h1>
        <p className="text-white/90 mb-8">Seu painel FIAP Bank já está pronto. Gerencie seu saldo e suas transações com facilidade.</p>
        <motion.button whileHover={{ scale: 1.03 }} onClick={() => router.push("/home")} className="bg-white text-black px-6 py-3 rounded-2xl font-semibold">
          Entrar no FIAP Bank
        </motion.button>
      </motion.div>
    </main>
  );
}
