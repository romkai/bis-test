import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import accountsData from '@/store/json/acct.json';
import { TAccount } from '@/blogic/entities/Account';
import { orderBy } from 'lodash';
import store from '@/store';
import opEntriesModule from '@/store/modules/opEntriesModule';

@Module
class AccountsModule extends VuexModule {

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

	public get accounts() {
		return orderBy(this.accountsTable,  ['Acct']);
	}

	@Action
	public createAccount(account: TAccount): Promise<void> {
		this.CREATE_ACCOUNT(account);
		return Promise.resolve();
	}

	@Action
	public updateAccount(account: TAccount): Promise<void> {
		this.UPDATE_ACCOUNT(account);
		return Promise.resolve();
	}

	@Action
	public deleteAccount(account: TAccount): Promise<void> {
		this.DELETE_ACCOUNT(account);
		return opEntriesModule.deleteOpEntriesForAccount(account.Acct);
	}
}

export default new AccountsModule({ store, name: "accountsStore" });

