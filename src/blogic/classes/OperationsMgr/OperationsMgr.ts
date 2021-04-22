import { sortBy } from 'lodash';
import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';

class OperationsMgr {
	public getOperations(): TOpEntry[] {
		return MainContext.$store.getters.operations;
	}
	public getOperationsForAccount(acct: string): TOpEntry[] {
		return MainContext.$store.getters.operations.filter((op: TOpEntry) => op.AcctCr === acct || op.AcctDB === acct);
	}
	public getOperationsForDate(dt: string): TOpEntry[] {
		return sortBy(MainContext.$store.getters.operations.filter((op: TOpEntry) => op.OpDate === dt), ['AcctDB', 'AcctCr', 'Amount']);
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

export default new OperationsMgr();

