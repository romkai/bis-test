import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TAccount } from '@/blogic/entities/Account';
import Operations from '@/blogic/classes/OperationsMgr/OperationsMgr';

class AccountsMgr {
	public getAccounts(): TAccount[] {
		return MainContext.$store.getters.accounts;
	}
	public acctOstForDate(acct: string, date: string): number {
		const account = MainContext.$store.getters.accounts.find((item: TAccount) => item.Acct === acct);
		if (!account) return 0.00;
		const initialAmount = account.Ost;
		const periodAmount = Operations.getOperationsForAccount(acct)
			.filter((op: TOpEntry) => op.OpDate <= date)
			.reduce(
				(acc: number, item: TOpEntry) =>
					acc + (item.AcctCr === acct ? -item.Amount : 0) + (item.AcctDB === acct ? item.Amount : 0),
				0);
		return initialAmount + periodAmount;
	}
	public accountExists(acct: string): boolean {
		return Boolean(MainContext.$store.state.accounts.find((acc: TAccount) => acc.Acct === acct));
	}
	public createAccount(account: TAccount): Promise<void> {
		return MainContext.$store.dispatch('createAccount', account);
	}
	public updateAccount(account: TAccount): Promise<void> {
		return MainContext.$store.dispatch('updateAccount', account);
	}
	public deleteAccount(account: TAccount): Promise<void> {
		return MainContext.$store.dispatch('deleteAccount', account);
	}
}

export default new AccountsMgr();


