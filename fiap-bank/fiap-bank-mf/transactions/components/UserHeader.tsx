interface User {
  name: string;
  account: string;
  agency: string;
  avatar: string;
  balance: number;
  savings: number;
}

export default function UserHeader({ user }: { user: User }) {
  return (
    <div className="bg-fiapPink text-white rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-card gap-4">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="Avatar do usuário"
          className="w-16 h-16 rounded-full border-2 border-white object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user.name}</span>
          <span className="text-sm">Agência {user.agency} | Conta {user.account}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-8 mt-4 md:mt-0">
        <div>
          <span className="text-sm">Saldo Corrente</span>
          <p className="text-2xl font-bold">
            {user.balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div>
          <span className="text-sm">Saldo Poupança</span>
          <p className="text-2xl font-bold">
            {user.savings.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>
    </div>
  );
}
