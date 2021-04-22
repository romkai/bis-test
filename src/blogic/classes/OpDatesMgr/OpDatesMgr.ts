import MainContext from '@/helpers/MainContext';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TOpDate } from '@/blogic/entities/OpDate';

class OpDatesMgr {
	public getOpDates(): TOpDate[] {
		return MainContext.$store.getters.operatingDates;
	}
	public get lastDate(): string {
		if (MainContext.$store.getters.operatingDates.length === 0) return '';
		return MainContext.$store.getters.operatingDates[0].OpDate;
	}
	public createOpDate(opDate: TOpDate): Promise<void> {
		return MainContext.$store.dispatch('createOperatingDate', opDate);
	}
	public updateOpDate(opDate: TOpDate): Promise<void> {
		return MainContext.$store.dispatch('updateOperatingDate', opDate);
	}
	public deleteOpDate(opDate: TOpEntry): Promise<void> {
		return MainContext.$store.dispatch('deleteOperatingDate', opDate);
	}
	public opDateExists(dt: string) {
		return Boolean(MainContext.$store.state.operatingDates.find((opDate: TOpDate) => opDate.OpDate === dt));
	}
}

export default new OpDatesMgr();

