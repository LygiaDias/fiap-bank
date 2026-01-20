export function suggestCategory(description: string, type: string) {
  const d = (description ?? "").toLowerCase();

  if (type === "deposit") {
    if (d.includes("salário") || d.includes("salario")) return "Salário";
    if (d.includes("freela") || d.includes("pix recebido")) return "Renda extra";
    return "Receitas";
  }

  if (type === "transfer") {
    if (d.includes("invest")) return "Investimentos";
    return "Transferências";
  }

  // despesas comuns
  if (d.includes("uber") || d.includes("99")) return "Transporte";
  if (d.includes("ifood") || d.includes("pizza") || d.includes("restaurante")) return "Alimentação";
  if (d.includes("mercado") || d.includes("supermercado")) return "Mercado";
  if (d.includes("aluguel") || d.includes("condomínio") || d.includes("condominio")) return "Moradia";
  if (d.includes("netflix") || d.includes("spotify") || d.includes("prime")) return "Assinaturas";
  if (d.includes("farmácia") || d.includes("farmacia")) return "Saúde";
  if (d.includes("energia") || d.includes("água") || d.includes("agua")) return "Contas";

  return "Outros";
}
