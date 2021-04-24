import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import accountsData from '@/store/json/acct.json';
import { TAccount } from '@/blogic/Entities/Account';
import { orderBy } from 'lodash';
import store from '@/store';
import opEntriesModule from '@/store/modules/opEntriesModule';
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import IAccountsMgr from '@/blogic/Dbo/types/IAccountsMgr';

@Module
class AccountsModule extends VuexModule implements IAccountsMgr {

	private accountsTable: TAccount[] = accountsData.AcctAcct;

	@Mutation
	private CREATE_ACCOUNT(account: TAccount) {
		this.accountsTable.push(account);
	}

	@Mutation
	private UPDATE_ACCOUNT(account: TAccount) {
		const index = this.accountsTable.findIndex(item => item.Acct === account.Acct);
		if (index === -1) return;
		this.accountsTable.splice(index, 1, account);
	}

	@Mutation
	private DELETE_ACCOUNT(account: TAccount) {
		const index = this.accountsTable.findIndex(item => item.Acct === account.Acct);
		if (index === -1) return;
		this.accountsTable.splice(index, 1);
	}

	private get accounts() {
		return orderBy(this.accountsTable,  ['Acct']);
	}

	public getAccounts(): TAccount[] {
		return this.accounts;
	}

	public getAcctOstForDate(acct: string, date: string): number {
		const account = this.accounts.find((item: TAccount) => item.Acct === acct);
		if (!account) return 0.00;
		const periodAmount = opEntriesModule.getOpEntriesForAccount(acct)
			.filter((op: TOpEntry) => op.OpDate <= date)
			.reduce(
				(acc: number, item: TOpEntry) =>
					acc + (item.AcctCr === acct ? -item.Amount : 0) + (item.AcctDB === acct ? item.Amount : 0),
				0);
		return account.Ost + periodAmount;
	}

	public accountExists(acct: string): boolean {
		return Boolean(this.accounts.find((acc: TAccount) => acc.Acct === acct));
	}

	@Action
	public createAccount(account: TAccount): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.CREATE_ACCOUNT(account);
			});
	}

	@Action
	public updateAccount(account: TAccount): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.UPDATE_ACCOUNT(account);
			});
	}

	@Action
	public deleteAccount(account: TAccount): Promise<void> {
		return opEntriesModule.deleteOpEntriesForAccount(account.Acct)
			.then(() => {
				this.DELETE_ACCOUNT(account);
			})
	}
}

export default new AccountsModule({ store, name: "accountsStore" });

