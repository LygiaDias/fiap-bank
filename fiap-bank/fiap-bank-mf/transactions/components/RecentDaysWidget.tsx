interface ChartData {
  day: string;
  value: number;
}

export default function RecentDaysWidget({ chartData }: { chartData: ChartData[] }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-card fiap-pink">
      <h4 className="font-semibold text-gray-700 mb-2">Resumo Últimos Dias</h4>
      <div className="flex gap-1 h-24 items-end mb-2">
        {chartData.map((d, i) => {
          const height = Math.min(Math.abs(d.value) / 100, 100);
          return (
            <div
              key={i}
              className={`w-4 rounded ${d.value >= 0 ? "bg-green-500" : "bg-red-500"}`}
              style={{ height: `${height}%` }}
              title={`${d.day}: ${d.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full" /> Entrada
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" /> Saída
        </span>
      </div>
    </div>
  );
}
