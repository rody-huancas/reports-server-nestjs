export class CurrencyFormatter {
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}
