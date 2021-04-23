import { TAccount } from '@/blogic/entities/Account';

export interface IAccountsMgr {
	getAccounts: () => TAccount[];
	acctOstForDate: (acct: string, date: string) => number;
	accountExists: (acct: string) => boolean;
	createAccount: (account: TAccount) => Promise<void>;
	updateAccount: (account: TAccount) => Promise<void>;
	deleteAccount: (account: TAccount) => Promise<void>;
}
