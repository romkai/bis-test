import { TOpEntry } from '@/blogic/entities/OpEntry';

export interface IOpEntriesMgr {
	getOpEntries: () => TOpEntry[];
	createOpEntry: (opEntry: TOpEntry) => Promise<void>;
	updateOpEntry: (opEntry: TOpEntry) => Promise<void>;
	deleteOpEntry: (opEntry: TOpEntry) => Promise<void>;
	getOpEntriesForAccount: (acct: string) => TOpEntry[];
	getOpEntriesForDate: (dt: string) => TOpEntry[];
}
