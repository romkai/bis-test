import { TOpEntry } from '@/blogic/Entities/OpEntry';

export default interface IOpEntriesMgr {
	getOpEntries(): TOpEntry[];
	createOpEntry(opEntry: TOpEntry): Promise<void>;
	updateOpEntry(opEntry: TOpEntry): Promise<void>;
	deleteOpEntry(opEntry: TOpEntry): Promise<void>;
	getOpEntriesForAccount(acct: string): TOpEntry[];
	getOpEntriesForDate(date: string): TOpEntry[];
	deleteOpEntriesForDate(date: string): Promise<void>;
	deleteOpEntriesForAccount(acc: string): Promise<void>;
}
