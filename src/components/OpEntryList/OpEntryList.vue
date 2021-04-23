<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-button(
			v-if="checkCRUD(crud, 'C')"
			@click="addOpEntry"
			variant="outline-secondary"
		)
			b-icon-plus-circle-fill.mr-2(
				variant="info"
				shift-v="-1"
			)
			span Добавить операцию

		b-row.text-subtitle.text--secondary
			b-col(cols="3") Дата опер.дня
			b-col(cols="4") Счет Дебета / Кредита
			b-col.text-right() Сумма
			b-col(cols="auto")
				.item-btn-slot

		.my-3.text-center(
			v-if="requiredAccountOrOpDate"
		) Не указан родительский элемент

		.my-3.text-center(
			v-else-if="opEntries.length===0"
		) Операции не найдены

		OpEntryItem(
			v-else
			v-for="(opEntry, index) in opEntries"
			:key="index"
			:opEntry="opEntry"
			:active="!!activeOpEntry && opEntry.Id===activeOpEntry.Id"
			:hover="hover"
			:crud="crud"
			@click="activeOpEntry=opEntry"
			@editOpEntry="editOpEntry(opEntry)"
			@deleteOpEntry="deleteOpEntry(opEntry)"
		)

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import nothingToDo from '@/ui-operations/nothingToDo';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import dbo from '@/blogic/classes/Dbo/Dbo';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';
import OpEntryItem from '@/components/OpEntryList/OpEntryItem.vue';
import { PropType } from 'vue';
import { isAccount, TAccount } from '@/blogic/entities/Account';
import { TOpEntryListMode } from '@/components/OpEntryList/types/OpEntryListTypes';
import { TOpDate, isOpDate } from '@/blogic/entities/OpDate';
import checkCRUD from '@/helpers/permissions';

@Component({
	components: {
		OpEntryItem,
	},
})
export default class OpEntryList extends Vue {
	@Prop({ type: String, default: 'Операции по счетам' }) title!: string;
	@Prop({ type: Number, default: TOpEntryListMode.ALL }) mode!: TOpEntryListMode;
	@Prop({ type: Object as PropType<TAccount|TOpDate> }) current!: TAccount|TOpDate;
	@Prop({ type: Boolean, default: false }) hover!: boolean;
	@Prop({ type: String, default: 'CRUD' }) crud!: string;

	activeOpEntry: TOpEntry|null = null;
	checkCRUD = checkCRUD;

	@Watch('activeOpEntry')
	onActiveOpEntryChange(): void {
		this.$emit('setActiveOpEntry', this.activeOpEntry);
	}

	created(): void {
		this.locateFirstOpEntry();
	}

	locateFirstOpEntry(): void {
		if (this.opEntries.length === 0) return;
		this.activeOpEntry = this.opEntries[0];
	}

	get requiredAccountOrOpDate(): boolean {
		return !this.current && this.mode !== TOpEntryListMode.ALL;
	}

	get opEntries(): TOpEntry[] {
		if (this.mode === TOpEntryListMode.ALL) return dbo.opEntriesMgr.getOpEntries();
		if (!this.current) return [];
		if (this.mode === TOpEntryListMode.FOR_ACCOUNT && isAccount(this.current)) {
			return dbo.opEntriesMgr.getOpEntriesForAccount(this.current.Acct);
		}
		if (this.mode === TOpEntryListMode.FOR_DATE && isOpDate(this.current)) {
			return dbo.opEntriesMgr.getOpEntriesForDate(this.current.OpDate);
		}
		return [];
	}

	addOpEntry(): void {
		addOpEntryOperation().then().catch(nothingToDo);
	}

	editOpEntry(opEntry: TOpEntry): void {
		editOpEntryOperation({ opEntry }).then().catch(nothingToDo);
	}

	deleteOpEntry(opEntry: TOpEntry): void {
		deleteOpEntryOperation(opEntry).then(() => {
			if (opEntry.Id === this.activeOpEntry?.Id) {
				this.activeOpEntry = null;
			}
		}).catch(nothingToDo);
	}

}
</script>
