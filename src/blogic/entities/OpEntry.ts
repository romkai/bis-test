export type TOpEntry = {
	Id: number;
	OpDate: string;
	AcctDB: string;
	AcctCr: string;
	Amount: number;
}

export function isOpEntry(obj: unknown): obj is TOpEntry {
	return !!(obj as TOpEntry).Id && !(obj as TOpEntry).OpDate;
}
