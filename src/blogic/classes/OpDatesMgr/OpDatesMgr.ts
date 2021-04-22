import store from '@/store/index';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { TOpDate } from '@/blogic/entities/OpDate';
import { orderBy } from 'lodash';

class OpDatesMgr {
	public get opDates(): TOpDate[] {
		return orderBy(store.state.opDates,  ['OpDate'], ['desc']);
	}
	public get lastDate(): string {
		if (this.opDates.length === 0) return '';
		return this.opDates[0].OpDate;
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
	public opDateExists(dt: string) {
		return Boolean(store.state.opDates.find((opDate: TOpDate) => opDate.OpDate === dt));
	}
}

export default new OpDatesMgr();

