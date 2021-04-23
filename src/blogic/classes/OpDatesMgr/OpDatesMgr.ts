import store from '@/store/index';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TOpDate } from '@/blogic/entities/OpDate';
import { IOpDatesMgr } from '@/blogic/classes/OpDatesMgr/types/OpDatesMgrTypes';

class OpDatesMgr implements IOpDatesMgr {
	public getOpDates(): TOpDate[] {
		return store.getters.opDates;
	}

	public getLastDate(): string {
		if (store.getters.opDates.length === 0) return '';
		return store.getters.opDates[0].OpDate;
	}

	public createOpDate(opDate: TOpDate): Promise<void> {
		return store.dispatch('createOpDate', opDate);
	}

	public updateOpDate(opDate: TOpDate): Promise<void> {
		return store.dispatch('updateOpDate', opDate);
	}

	public deleteOpDate(opDate: TOpEntry): Promise<void> {
		return store.dispatch('deleteOpDate', opDate);
	}

	public opDateExists(dt: string): boolean {
		return Boolean(store.state.opDates.find((opDate: TOpDate) => opDate.OpDate === dt));
	}
}

export default new OpDatesMgr();

