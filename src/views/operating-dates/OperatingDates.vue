<template lang="pug">
	PageTemplate(
		:title="['Операционные дни', 'Список операций за день']"
	)
		template(#headerLeft)
			b-button(
				@click="addOpDate"
				variant="outline-secondary"
			)
				b-icon-plus-circle-fill.mr-2(
					variant="info"
					shift-v="-1"
				)
				span Добавить Опер.день

		template(#mainTopLeft)
			b-row.text-subtitle.text--secondary
				b-col(cols="5") Дата операционного дня
				b-col.text-right() Статус
				b-col(cols="auto")
					.item-btn-slot

		template(#defaultLeft)
			OpDateItem(
				v-for="opDate in opDates"
				:key="opDate.OpDate"
				:opDate="opDate"
				@click="activeOpDate=opDate"
				:active="opDate.OpDate===activeOpDate.OpDate"
				@editOpDate="editOpDate(opDate)"
				@deleteOpDate="deleteOpDate(opDate)"
			)

		template(#headerRight)
			b-button(
				@click="addOpEntry"
				variant="outline-secondary"
			)
				b-icon-plus-circle-fill.mr-2(
					variant="info"
					shift-v="-1"
				)
				span Добавить операцию

		template(#mainTopRight)
			b-row.text-subtitle.text--secondary
				b-col(cols="4") Счет Дебета / Кредита
				b-col.text-right() Сумма
				b-col(cols="auto")
					.item-btn-slot

		template(#defaultRight)
			.my-3.text-center(
				v-if="operationsForDate.length===0"
			) Операций не найдено за этот день

			OpEntryItem(
				v-for="(opEntry, index) in operationsForDate"
				:key="index"
				:opEntry="opEntry"
				@editOpEntry="editOpEntry(opEntry)"
				@deleteOpEntry="deleteOpEntry(opEntry)"
				:hideDate="true"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import PageTemplate from '@/components/template/page/PageTemplate.vue';
import OpDateItem from '@/views/operating-dates/components/OpDateItem.vue';
import OpEntryItem from '@/views/accounts/components/OpEntryItem.vue';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';
import deleteOpDateOperation from '@/ui-operations/DeleteOpDateOperation/deleteOpDateOperation';
import editOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/editOpDateOperation';
import addOpDateOperation from '@/ui-operations/AddOrEditOpDateOperation/addOpDateOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import Operations from '@/blogic/classes/OperationsMgr/OperationsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';

@Component({
	components: { OpEntryItem, OpDateItem, PageTemplate },
})
export default class OperatingDates extends Vue {
	activeOpDate: TOpDate|null = null;

	created(): void {
		if (this.opDates.length) {
			this.activeOpDate = this.opDates[0];
		}
	}

	get opDates(): TOpDate[] {
		return OpDatesMgr.getOpDates();
	}

	get operationsForDate(): TOpEntry[] {
		if (!this.activeOpDate) return [];
		return Operations.getOperationsForDate(this.activeOpDate.OpDate);
	}

	addOpDate(): void {
		addOpDateOperation().then().catch(nothingToDo);
	}

	editOpDate(opDate: TOpDate): void {
		editOpDateOperation({ opDate }).then().catch(nothingToDo);
	}

	deleteOpDate(opDate: TOpDate): void {
		deleteOpDateOperation(opDate).then().catch(nothingToDo);
	}

	addOpEntry(): void {
		addOpEntryOperation().then().catch(nothingToDo);
	}

	editOpEntry(opEntry: TOpEntry): void {
		editOpEntryOperation({ opEntry }).then().catch(nothingToDo);
	}

	deleteOpEntry(opEntry: TOpEntry): void {
		deleteOpEntryOperation(opEntry).then().catch(nothingToDo);
	}
}
</script>
