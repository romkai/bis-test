<template lang="pug">
	ListLayout

		template(#panel)

			Panel(
				:title="title",
				:cols="panelCols"
				addText="Добавить опер.день"
				@addItem="addOpDate"
			)

		template(#default)

			.my-3.text-center(
				v-if="opDates.length===0"
			) Операционные дни не найдены

			OpDateItem(
				v-else
				v-for="opDate in opDates"
				:key="opDate.OpDate"
				:opDate="opDate"
				:active="isActive(opDate)"
				:nonClickable="nonClickable"
				@click="click(opDate)"
				@editOpDate="editOpDate(opDate)"
				@deleteOpDate="deleteOpDate(opDate)"
			)

</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/Entities/OpDate';
import addOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/addOpDateOperation';
import editOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/editOpDateOperation';
import deleteOpDateOperation from '@/ui-operations/DeleteOpDateOperation/deleteOpDateOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import dbo from '@/blogic/Dbo/dbo';
import OpDateItem from '@/components/OpDatesList/OpDateItem.vue';
import TPanelCol from '@/components/Template/Panel/types/ListPanelTypes';
import Panel from '@/components/Template/Panel/Panel.vue';
import ListLayout from '@/components/Template/ListLayout/ListLayout.vue';

@Component({
	components: {
		ListLayout,
		Panel,
		OpDateItem,
	},
})
export default class OpDatesList extends Vue {
	@Prop({ type: String, default: 'Операционные дни' }) title!: string;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;

	activeOpDate: TOpDate|null = null;

	panelCols: TPanelCol[] = [
		{ title: 'Дата операционного дня', cols: 5 },
		{ title: 'Статус', textRight: true },
	];

	get opDates(): TOpDate[] {
		return dbo.opDatesMgr.getOpDates();
	}

	@Watch('activeOpDate')
	onActiveOpDate(): void {
		this.$emit('onActiveOpDate', this.activeOpDate);
	}

	created(): void {
		this.locateFirstAccount();
	}

	locateFirstAccount(): void {
		if (this.opDates.length === 0) return;
		this.activeOpDate = this.opDates[0];
	}

	isActive(opDate: TOpDate): boolean {
		return !!this.activeOpDate && opDate.OpDate === this.activeOpDate.OpDate;
	}

	click(opDate: TOpDate): void {
		if (this.nonClickable) return;
		this.activeOpDate = opDate;
	}

	addOpDate(): void {
		addOpDateOperation().then().catch(nothingToDo);
	}

	editOpDate(opDate: TOpDate): void {
		editOpDateOperation({ opDate }).then().catch(nothingToDo);
	}

	deleteOpDate(opDate: TOpDate): void {
		deleteOpDateOperation(opDate).then(() => {
			// сброс activeOpDate
			if (opDate.OpDate === this.activeOpDate?.OpDate) {
				this.activeOpDate = null;
			}
		}).catch(nothingToDo);
	}
}
</script>
