import { sortBy } from 'lodash';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { IOpEntriesMgr } from '@/blogic/classes/Dbo/types/OpEntriesMgrTypes';
import opEntriesModule from '@/store/modules/opEntriesModule';

class OpEntriesMgr implements IOpEntriesMgr {
	public getOpEntries() {
		return opEntriesModule.opEntries;
	}

	public getOpEntriesForAccount(acct: string): TOpEntry[] {
		return opEntriesModule.opEntries.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}

	public getOpEntriesForDate(dt: string): TOpEntry[] {
		return sortBy(opEntriesModule.opEntries.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
	}

	public createOpEntry(opEntry: TOpEntry): Promise<void> {
		return opEntriesModule.createOpEntry(opEntry);
	}

	public updateOpEntry(opEntry: TOpEntry): Promise<void> {
		return opEntriesModule.updateOpEntry(opEntry);
	}

	public deleteOpEntry(opEntry: TOpEntry): Promise<void> {
		return opEntriesModule.deleteOpEntry(opEntry);
	}
}

export default new OpEntriesMgr();

