<template lang="pug">
	PageTemplate(
		:title="['Операции по счетам', 'Список проводок']"
	)
		template(#headerLeft)
			b-button(
				@click="addOpEntry"
				variant="outline-secondary"
			)
				b-icon-plus-circle-fill.mr-2(
					variant="info"
					shift-v="-1"
				)
				span Добавить операцию

		template(#mainTopLeft)
			b-row.text-subtitle.text--secondary
				b-col(cols="3") Дата опер.дня
				b-col(cols="4") Счет Дебета / Кредита
				b-col.text-right() Сумма
				b-col(cols="auto")
					.item-btn-slot

		template(#defaultLeft)
			OpEntryItem(
				v-for="(opEntry, index) in operations"
				:key="index"
				:opEntry="opEntry"
				@click="activeOpEntry=opEntry"
				:active="opEntry.Id===activeOpEntry.Id"
				@editOpEntry="editOpEntry(opEntry)"
				@deleteOpEntry="deleteOpEntry(opEntry)"
				hover
				activeItem
			)

		template(#headerRight)

		template(#mainTopRight)
			b-row.text-subtitle.text--secondary
				b-col() Номер счета
				b-col.text-right(cols="auto") Остаток

		template(#defaultRight)
			OpEntryInfo(
				:opEntry="activeOpEntry"
			)
</template>

<script lang="ts">

import { isEqual } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { TOpEntry } from '@/entities/OpEntry';
import OpEntryItem from '@/views/accounts/components/OpEntryItem.vue';
import PageTemplate from '@/components/template/page/PageTemplate.vue';
import OpEntryInfo from '@/views/operations/components/OpEntryInfo.vue';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';

@Component({
	components: {
		OpEntryInfo,
		PageTemplate,
		OpEntryItem,
	},
})
export default class Operations extends Vue {
	activeOpEntry: TOpEntry|null = null;
	isEqual = isEqual;

	created(): void {
		if (this.operations.length) {
			this.activeOpEntry = this.operations[0];
		}
	}

	get operations(): TOpEntry[] {
		return this.$store.getters.operations;
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
