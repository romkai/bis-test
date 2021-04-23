import { TOpDate } from '@/blogic/entities/OpDate';
import { TOpEntry } from '@/blogic/entities/OpEntry';

export interface IOpDatesMgr {
	getOpDates: () => TOpDate[];
	getLastDate: () => string;
	createOpDate: (opDate: TOpDate) => Promise<void>;
	updateOpDate: (opDate: TOpDate) => Promise<void>;
	deleteOpDate: (opDate: TOpEntry) => Promise<void>;
	opDateExists: (dt: string) => boolean;
}
