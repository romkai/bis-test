<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-button(
			v-if="checkPermissions(permissions, 'C')"
			@click="addOpEntry"
			variant="outline-secondary"
		)
			b-icon-plus-circle-fill.mr-2(
				variant="info"
				shift-v="-1"
			)
			span Добавить операцию

		b-row.text-subtitle.text--secondary
			b-col(
				v-if="!noDateCol"
				cols="3"
			) Дата опер.дня
			b-col(cols="4") Счет Дебета / Кредита
			b-col.text-right Сумма
			b-col(cols="auto")
				.item-btn-slot

		.my-3.text-center(
			v-if="requiredAccountOrOpDate"
		) {{ requiredText }}

		.my-3.text-center(
			v-else-if="opEntries.length===0"
		) Операции не найдены

		OpEntryItem(
			v-else
			v-for="(opEntry, index) in opEntries"
			:key="index"
			:opEntry="opEntry"
			:active="isActive(opEntry)"
			:nonClickable="nonClickable"
			:permissions="permissions"
			:noDateCol="noDateCol"
			@click="click(opEntry)"
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
import OpEntryItem from '@/components/OpEntriesList/OpEntryItem.vue';
import { PropType } from 'vue';
import { isAccount, TAccount } from '@/blogic/entities/Account';
import { TOpEntryListMode } from '@/components/OpEntriesList/types/OpEntryListTypes';
import { TOpDate, isOpDate } from '@/blogic/entities/OpDate';
import checkPermissions from '@/helpers/checkPermissions';

@Component({
	components: {
		OpEntryItem,
	},
})
export default class OpEntriesList extends Vue {
	@Prop({ type: String, default: 'Операции по счетам' }) title!: string;
	@Prop({ type: Number, default: TOpEntryListMode.ALL }) mode!: TOpEntryListMode;
	@Prop({ type: Object as PropType<TAccount|TOpDate> }) current!: TAccount|TOpDate;
	@Prop({ type: Boolean, default: false }) noDateCol!: boolean;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

	activeOpEntry: TOpEntry|null = null;
	checkPermissions = checkPermissions;

	@Watch('activeOpEntry')
	onActiveOpEntry(): void {
		this.$emit('onActiveOpEntry', this.activeOpEntry);
	}

	created(): void {
		this.locateFirstOpEntry();
	}

	locateFirstOpEntry(): void {
		if (this.opEntries.length === 0) return;
		this.activeOpEntry = this.opEntries[0];
	}

	isActive(opEntry: TOpEntry): boolean {
		return !!this.activeOpEntry && opEntry.Id === this.activeOpEntry.Id;
	}

	click(opEntry: TOpEntry): void {
		if (this.nonClickable) return;
		this.activeOpEntry = opEntry;
	}

	get requiredAccountOrOpDate(): boolean {
		return !this.current && this.mode !== TOpEntryListMode.ALL;
	}

	get requiredText(): string {
		if (!this.current && this.mode === TOpEntryListMode.FOR_DATE) return 'Не выбрана дата';
		if (!this.current && this.mode === TOpEntryListMode.FOR_ACCOUNT) return 'Не выбран банковский счет';
		return '';
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
