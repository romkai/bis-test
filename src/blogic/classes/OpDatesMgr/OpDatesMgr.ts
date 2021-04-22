import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TOpDate } from '@/blogic/entities/OpDate';

class OpDatesMgr {
	public getOpDates(): TOpDate[] {
		return MainContext.$store.getters.opDates;
	}
	public get lastDate(): string {
		if (MainContext.$store.getters.opDates.length === 0) return '';
		return MainContext.$store.getters.opDates[0].OpDate;
	}
	public createOpDate(opDate: TOpDate): Promise<void> {
		return MainContext.$store.dispatch('createOpDate', opDate);
	}
	public updateOpDate(opDate: TOpDate): Promise<void> {
		return MainContext.$store.dispatch('updateOpDate', opDate);
	}
	public deleteOpDate(opDate: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('deleteOpDate', opDate);
	}
	public opDateExists(dt: string) {
		return Boolean(MainContext.$store.state.opDates.find((opDate: TOpDate) => opDate.OpDate === dt));
	}
}

export default new OpDatesMgr();

