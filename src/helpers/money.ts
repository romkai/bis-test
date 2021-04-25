export function formatMoney(x: number, digits = 2, sep = '\u202F'): string {
	const x1 = Math.floor(Number(x));
	const x2 = (Number(x) - x1).toFixed(digits);
	return String(x1).replace(/\B(?=(\d{3})+(?!\d))/g, sep) + x2.slice(1);
}

export const moneyUnits = "р.";
