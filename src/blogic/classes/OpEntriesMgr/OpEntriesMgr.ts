import { sortBy } from 'lodash';
import store from '@/store/index';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { IOpEntriesMgr } from '@/blogic/classes/OpEntriesMgr/types/OpEntriesMgrTypes';

class OpEntriesMgr implements IOpEntriesMgr {
	public getOpEntries() {
		return store.getters.opEntries;
	}

	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return store.getters.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}

	public getOpEntriesForDate(dt: string): TOpEntry[] {
		return sortBy(store.getters.opEntries.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
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

