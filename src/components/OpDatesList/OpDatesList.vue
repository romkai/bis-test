<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-button(
			v-if="checkPermissions(permissions, 'C')"
			@click="addOpDate"
			variant="outline-secondary"
		)
			b-icon-plus-circle-fill.mr-2(
				variant="info"
				shift-v="-1"
			)
			span Добавить Опер.день

		b-row.text-subtitle.text--secondary
			b-col(cols="5") Дата операционного дня
			b-col.text-right() Статус
			b-col(cols="auto")
				.item-btn-slot

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
			:permissions="permissions"
			@click="click(opDate)"
			@editOpDate="editOpDate(opDate)"
			@deleteOpDate="deleteOpDate(opDate)"
		)

</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import addOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/addOpDateOperation';
import editOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/editOpDateOperation';
import deleteOpDateOperation from '@/ui-operations/DeleteOpDateOperation/deleteOpDateOperation';
import checkPermissions from '@/helpers/checkPermissions';
import nothingToDo from '@/ui-operations/nothingToDo';
import dbo from '@/blogic/classes/Dbo/Dbo';
import OpDateItem from '@/components/OpDatesList/OpDateItem.vue';

@Component({
	components: {
		OpDateItem,
	},
})
export default class OpDatesList extends Vue {
	@Prop({ type: String, default: 'Операционные дни' }) title!: string;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

	activeOpDate: TOpDate|null = null;
	checkPermissions = checkPermissions;

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
