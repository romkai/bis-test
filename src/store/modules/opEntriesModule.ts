import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import IOpEntriesMgr from '@/blogic/Dbo/types/IOpEntriesMgr';
import opEntriesData from '@/store/json/doc.json';
import { orderBy } from 'lodash';
import store from '@/store/index';

@Module
class OpEntriesModule extends VuexModule implements IOpEntriesMgr {

	private opEntriesTable: TOpEntry[] = opEntriesData.Doc.map((op, index) => ({...op, Id: index + 1 }));

	@Mutation
	private CREATE_OP_ENTRY(opEntry: TOpEntry): void {
		const newId = this.opEntriesTable.reduce(
			(max, op) => Math.max(max, op.Id), 0
		) + 1;
		this.opEntriesTable.push({ ...opEntry, Id: newId });
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

	private get opEntries(): TOpEntry[] {
		return orderBy(this.opEntriesTable, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']);
	}

	public getOpEntries(): TOpEntry[] {
		return this.opEntries;
	}

	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return this.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}

	public getOpEntriesForDate(date: string): TOpEntry[] {
		return this.opEntries.filter((op: TOpEntry) => op.OpDate === date);
	}

	@Action
	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.CREATE_OP_ENTRY(opEntry);
			});
	}

	@Action
	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.UPDATE_OP_ENTRY(opEntry);
			});
	}

	@Action
	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.DELETE_OP_ENTRY(opEntry);
			});
	}

	@Action
	public deleteOpEntriesForDate(date: string): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.DELETE_OP_ENTRIES_FOR_DATE(date);
			});
	}

	@Action
	public deleteOpEntriesForAccount(acc: string): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.DELETE_OP_ENTRIES_FOR_ACCOUNT(acc);
			});
	}
}

export default new OpEntriesModule({ store, name: "opEntriesStore" });
