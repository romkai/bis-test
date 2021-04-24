import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import { orderBy } from 'lodash';
import opDatesData from '@/store/json/opdate.json';
import { TOpDate } from '@/blogic/entities/OpDate';
import store from '@/store';
import opEntriesModule from '@/store/modules/opEntriesModule';

@Module
class OpDatesModule extends VuexModule {

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

	get opDates(): TOpDate[] {
		return orderBy(this.opDatesTable,  ['OpDate'], ['desc']);
	}

	@Action
	public createOpDate(opDate: TOpDate): Promise<void> {
		this.CREATE_OP_DATE(opDate);
		return Promise.resolve();
	}

	@Action
	public updateOpDate(opDate: TOpDate): Promise<void> {
		this.UPDATE_OP_DATE(opDate);
		return Promise.resolve();
	}

	@Action
	public deleteOpDate(opDate: TOpDate): Promise<void> {
		this.DELETE_OP_DATE(opDate);
		return opEntriesModule.deleteOpEntriesForDate(opDate.OpDate);
	}
}

export default new OpDatesModule({ store, name: "opDatesStore" });
