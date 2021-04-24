import { TOpDate } from '@/blogic/Entities/OpDate';

export default interface IOpDatesMgr {
	getOpDates(): TOpDate[];
	getLastDate(): string;
	createOpDate(opDate: TOpDate): Promise<void>;
	updateOpDate(opDate: TOpDate): Promise<void>;
	deleteOpDate(opDate: TOpDate): Promise<void>;
	opDateExists(date: string): boolean;
}
