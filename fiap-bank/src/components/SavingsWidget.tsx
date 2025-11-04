interface Savings {
  invested: number;
  yield: number;
}

export default function SavingsWidget({ savings }: { savings: Savings }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <h4 className="font-semibold text-gray-700 mb-2">Poupança</h4>
      <div className="flex justify-between mb-2">
        <span className="text-sm">Investido</span>
        <span className="font-bold">
          {savings.invested.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm">Rendimento</span>
        <span className="font-bold text-green-500">
          {savings.yield.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
        <div
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${(savings.yield / savings.invested) * 100}%` }}
        />
      </div>
    </div>
  );
}
