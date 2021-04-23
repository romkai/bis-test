import { TOpDate } from '@/blogic/entities/OpDate';

export interface IOpDatesMgr {
	getOpDates: () => TOpDate[];
	getLastDate: () => string;
	createOpDate: (opDate: TOpDate) => Promise<void>;
	updateOpDate: (opDate: TOpDate) => Promise<void>;
	deleteOpDate: (opDate: TOpDate) => Promise<void>;
	opDateExists: (dt: string) => boolean;
}
