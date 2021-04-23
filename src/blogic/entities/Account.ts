
export type TAccount = {
	Acct: string;
	Ost: number;
}

export function isAccount(obj: unknown): obj is TAccount {
	return !!(obj as TAccount).Acct;
}
