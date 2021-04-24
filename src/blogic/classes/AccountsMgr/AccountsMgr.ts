import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TAccount } from '@/blogic/entities/Account';
import dbo from '@/blogic/classes/Dbo/Dbo';
import { IAccountsMgr } from '@/blogic/classes/Dbo/types/AccountsMgrTypes';
import accountsModule from '@/store/modules/accountsModule';

class AccountsMgr implements IAccountsMgr {
	public getAccounts(): TAccount[] {
		return accountsModule.accounts;
	}

	public getAcctOstForDate(acct: string, date: string): number {
		const account = accountsModule.accounts.find((item: TAccount) => item.Acct === acct);
		if (!account) return 0.00;
		const initialAmount = account.Ost;
		const periodAmount = dbo.opEntriesMgr.getOpEntriesForAccount(acct)
			.filter((op: TOpEntry) => op.OpDate <= date)
			.reduce(
				(acc: number, item: TOpEntry) =>
					acc + (item.AcctCr === acct ? -item.Amount : 0) + (item.AcctDB === acct ? item.Amount : 0),
				0);
		return initialAmount + periodAmount;
	}

	public accountExists(acct: string): boolean {
		return Boolean(accountsModule.accounts.find((acc: TAccount) => acc.Acct === acct));
	}

	public createAccount(account: TAccount): Promise<void> {
		return accountsModule.createAccount(account);
	}

	public updateAccount(account: TAccount): Promise<void> {
		return accountsModule.updateAccount(account);
	}

	public deleteAccount(account: TAccount): Promise<void> {
		return accountsModule.deleteAccount(account);
	}
}

export default new AccountsMgr();


