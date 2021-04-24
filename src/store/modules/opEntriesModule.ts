import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { orderBy } from 'lodash';
import opEntriesData from '@/store/json/doc.json';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import store from '../index';

@Module
class OpEntriesModule extends VuexModule {

	private opEntriesTable = opEntriesData.Doc as TOpEntry[];

	@Mutation
	private CREATE_OP_ENTRY(opEntry: TOpEntry): void {
		this.opEntriesTable.push(opEntry);
	}

	@Mutation
	private UPDATE_OP_ENTRY(opEntry: TOpEntry): void {
		const index = this.opEntriesTable.findIndex(item => item.Id === opEntry.Id);
		if (index === -1) return;
		this.opEntriesTable.splice(index, 1, opEntry);
	}

	@Mutation
	private DELETE_OP_ENTRY(opEntry: TOpEntry): void {
		const index = this.opEntriesTable.findIndex(item => item.Id === opEntry.Id);
		if (index === -1) return;
		this.opEntriesTable.splice(index, 1);
	}

	@Mutation
	private DELETE_OP_ENTRIES_FOR_DATE(date: string): void {
		this.opEntriesTable = this.opEntriesTable.filter(op => op.OpDate !== date);
	}

	@Mutation
	private DELETE_OP_ENTRIES_FOR_ACCOUNT(acct: string): void {
		this.opEntriesTable = this.opEntriesTable.filter(op => op.AcctDB !== acct && op.AcctCr !== acct);
	}

	public get opEntries(): TOpEntry[] {
		return orderBy(this.opEntriesTable, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']);
	}

	@Action
	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		this.CREATE_OP_ENTRY(opEntry);
		return Promise.resolve();
	}

	@Action
	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		this.UPDATE_OP_ENTRY(opEntry);
		return Promise.resolve();
	}

	@Action
	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		this.DELETE_OP_ENTRY(opEntry);
		return Promise.resolve();
	}

	@Action
	public deleteOpEntriesForDate(date: string): Promise<void> {
		this.DELETE_OP_ENTRIES_FOR_DATE(date);
		return Promise.resolve();
	}

	@Action
	public deleteOpEntriesForAccount(acc: string): Promise<void> {
		this.DELETE_OP_ENTRIES_FOR_ACCOUNT(acc);
		return Promise.resolve();
	}
}

export default new OpEntriesModule({ store, name: "opEntriesStore" });
