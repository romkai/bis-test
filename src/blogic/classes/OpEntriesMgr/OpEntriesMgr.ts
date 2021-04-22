import { sortBy } from 'lodash';
import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';

class OpEntriesMgr {
	public getOpEntries(): TOpEntry[] {
		return MainContext.$store.getters.opEntries;
	}
	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return MainContext.$store.getters.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}
	public getOpEntriesForDate(dt: string): TOpEntry[] {
		return sortBy(MainContext.$store.getters.opEntries.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
	}
	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('createOperation', opEntry);
	}
	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('updateOperation', opEntry);
	}
	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('deleteOperation', opEntry);
	}
}

export default new OpEntriesMgr();

