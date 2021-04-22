import { orderBy, sortBy } from 'lodash';
import store from '@/store/index';
import { TOpEntry } from '@/blogic/entities/OpEntry';

class OpEntriesMgr {
	public get opEntries(): TOpEntry[] {
		return orderBy(store.state.opEntries, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']);
	}
	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return this.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}
	public getOpEntriesForDate(dt: string): TOpEntry[] {
		return sortBy(this.opEntries.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
	}
	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		return store.dispatch('createOpEntry', opEntry);
	}
	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		return store.dispatch('updateOpEntry', opEntry);
	}
	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		return store.dispatch('deleteOpEntry', opEntry);
	}
}

export default new OpEntriesMgr();

