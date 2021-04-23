<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-button(
			v-if="checkCRUD(crud, 'C')"
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
		) Опер.дни не найдены

		OpDateItem(
			v-else
			v-for="opDate in opDates"
			:key="opDate.OpDate"
			:opDate="opDate"
			@click="activeOpDate=opDate"
			:active="!!activeOpDate && opDate.OpDate===activeOpDate.OpDate"
			@editOpDate="editOpDate(opDate)"
			@deleteOpDate="deleteOpDate(opDate)"
			:hover="hover"
			:crud="crud"
		)

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';
import nothingToDo from '@/ui-operations/nothingToDo';
import { TOpDate } from '@/blogic/entities/OpDate';
import addOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/addOpDateOperation';
import editOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/editOpDateOperation';
import deleteOpDateOperation from '@/ui-operations/DeleteOpDateOperation/deleteOpDateOperation';
import OpDateItem from '@/components/OpDatesList/OpDateItem.vue';
import checkCRUD from '@/helpers/permissions';

@Component({
	components: {
		OpDateItem,
	},
})
export default class OpDatesList extends Vue {
	@Prop({ type: String, default: 'Операционные дни' }) title!: string;
	@Prop({ type: Boolean, default: false }) hover!: boolean;
	@Prop({ type: String, default: 'CRUD' }) crud!: string;

	activeOpDate: TOpDate|null = null;
	checkCRUD = checkCRUD;

	get opDates(): TOpDate[] {
		return OpDatesMgr.getOpDates();
	}

	@Watch('activeOpDate')
	onActiveOpDateChange(): void {
		this.$emit('setActiveOpDate', this.activeOpDate);
	}

	created(): void {
		this.locateFirstAccount();
	}

	locateFirstAccount(): void {
		if (this.opDates.length === 0) return;
		this.activeOpDate = this.opDates[0];
	}

	addOpDate(): void {
		addOpDateOperation().then().catch(nothingToDo);
	}

	editOpDate(opDate: TOpDate): void {
		editOpDateOperation({ opDate }).then().catch(nothingToDo);
	}

	deleteOpDate(opDate: TOpDate): void {
		deleteOpDateOperation(opDate).then(() => {
			if (opDate.OpDate === this.activeOpDate?.OpDate) {
				this.activeOpDate = null;
			}
		}).catch(nothingToDo);
	}
}
</script>
