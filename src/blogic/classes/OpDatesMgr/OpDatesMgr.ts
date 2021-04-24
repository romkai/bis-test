import { TOpDate } from '@/blogic/entities/OpDate';
import { IOpDatesMgr } from '@/blogic/classes/Dbo/types/OpDatesMgrTypes';
import opDatesModule from '@/store/modules/opDatesModule';

class OpDatesMgr implements IOpDatesMgr {
	public getOpDates(): TOpDate[] {
		return opDatesModule.opDates;
	}

	public getLastDate(): string {
		if (opDatesModule.opDates.length === 0) return '';
		return opDatesModule.opDates[0].OpDate;
	}

	public createOpDate(opDate: TOpDate): Promise<void> {
		return opDatesModule.createOpDate(opDate);
	}

	public updateOpDate(opDate: TOpDate): Promise<void> {
		return opDatesModule.updateOpDate(opDate);
	}

	public deleteOpDate(opDate: TOpDate): Promise<void> {
		return opDatesModule.deleteOpDate(opDate);
	}

	public opDateExists(dt: string): boolean {
		return Boolean(opDatesModule.opDates.find((opDate: TOpDate) => opDate.OpDate === dt));
	}
}

export default new OpDatesMgr();

