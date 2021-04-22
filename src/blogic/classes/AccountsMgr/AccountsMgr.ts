import store from '@/store/index';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TAccount } from '@/blogic/entities/Account';
import OpEntriesMgr from '@/blogic/classes/OpEntriesMgr/OpEntriesMgr';
import { sortBy } from 'lodash';

class AccountsMgr {
	public get accounts(): TAccount[] {
		return sortBy(store.state.accounts, 'Acct')
	}
	public acctOstForDate(acct: string, date: string): number {
		const account = this.accounts.find((item: TAccount) => item.Acct === acct);
		if (!account) return 0.00;
		const initialAmount = account.Ost;
		const periodAmount = OpEntriesMgr.getOpEntriesForAccount(acct)
			.filter((op: TOpEntry) => op.OpDate <= date)
			.reduce(
				(acc: number, item: TOpEntry) =>
					acc + (item.AcctCr === acct ? -item.Amount : 0) + (item.AcctDB === acct ? item.Amount : 0),
				0);
		return initialAmount + periodAmount;
	}
	public accountExists(acct: string): boolean {
		return Boolean(store.state.accounts.find((acc: TAccount) => acc.Acct === acct));
	}
	public createAccount(account: TAccount): Promise<void> {
		return store.dispatch('createAccount', account);
	}
	public updateAccount(account: TAccount): Promise<void> {
		return store.dispatch('updateAccount', account);
	}
	public deleteAccount(account: TAccount): Promise<void> {
		return store.dispatch('deleteAccount', account);
	}
}

export default new AccountsMgr();


