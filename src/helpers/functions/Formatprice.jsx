export function formatCurrency(amount, currency = "COP") {
  // Usamos el Intl.NumberFormat para formatear el número a la moneda deseada
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}
