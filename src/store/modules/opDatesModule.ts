import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { orderBy } from 'lodash';
import opDatesData from '@/store/json/opdate.json';
import { TOpDate } from '@/blogic/Entities/OpDate';
import store from '@/store';
import opEntriesModule from '@/store/modules/opEntriesModule';
import IOpDatesMgr from '@/blogic/Dbo/types/IOpDatesMgr';

@Module
class OpDatesModule extends VuexModule implements IOpDatesMgr {

	private opDatesTable: TOpDate[] = opDatesData.OpDate;

	@Mutation
	private CREATE_OP_DATE(opDate: TOpDate): void {
		this.opDatesTable.push(opDate);
	}

	@Mutation
	private UPDATE_OP_DATE(opDate: TOpDate): void {
		const index = this.opDatesTable.findIndex(item => item.OpDate === opDate.OpDate);
		if (index === -1) return;
		this.opDatesTable.splice(index, 1, opDate);
	}

	@Mutation
	private DELETE_OP_DATE(opDate: TOpDate): void {
		const index = this.opDatesTable.findIndex(item => item.OpDate === opDate.OpDate);
		if (index === -1) return;
		this.opDatesTable.splice(index, 1);
	}

	private get opDates(): TOpDate[] {
		return orderBy(this.opDatesTable,  ['OpDate'], ['desc']);
	}

	public getOpDates(): TOpDate[] {
		return this.opDates;
	}

	public getLastDate(): string {
		if (this.opDates.length === 0) return '';
		return this.opDates[0].OpDate;
	}

	public opDateExists(date: string): boolean {
		return Boolean(this.opDates.find((opDate: TOpDate) => opDate.OpDate === date));
	}

	@Action
	public createOpDate(opDate: TOpDate): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.CREATE_OP_DATE(opDate);
			});
	}

	@Action
	public updateOpDate(opDate: TOpDate): Promise<void> {
		return Promise.resolve()
			.then(() => {
				this.UPDATE_OP_DATE(opDate);
			});
	}

	@Action
	public deleteOpDate(opDate: TOpDate): Promise<void> {
		return opEntriesModule.deleteOpEntriesForDate(opDate.OpDate)
			.then(() => {
				this.DELETE_OP_DATE(opDate);
			})

	}
}

export default new OpDatesModule({ store, name: "opDatesStore" });
