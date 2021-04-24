import { TAccount } from '@/blogic/Entities/Account';

export default interface IAccountsMgr {
	getAccounts(): TAccount[];
	getAcctOstForDate(acct: string, date: string): number;
	accountExists(acct: string): boolean;
	createAccount(account: TAccount): Promise<void>;
	updateAccount(account: TAccount): Promise<void>;
	deleteAccount(account: TAccount): Promise<void>;
}
