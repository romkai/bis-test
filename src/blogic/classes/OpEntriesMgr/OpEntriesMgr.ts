import { sortBy } from 'lodash';
import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';

class OpEntriesMgr {
	public get opEntries(): TOpEntry[] {
		return sortBy(MainContext.$store.state.opEntries, ['OpDate', 'AcctDB', 'AcctCr', 'Amount']);
	}
	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return this.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}
	public getOpEntriesForDate(dt: string): TOpEntry[] {
		return sortBy(this.opEntries.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
	}
	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('createOpEntry', opEntry);
	}
	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('updateOpEntry', opEntry);
	}
	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('deleteOpEntry', opEntry);
	}
}

export default new OpEntriesMgr();

