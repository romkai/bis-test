<template lang="pug">
	ListLayout

		template(#panel)

			Panel(
				:title="title",
				:cols="panelCols"
				addText="Добавить операцию"
				@addItem="addOpEntry"
			)

		template(#default)

			.my-3.text-center(
				v-if="requiredError"
			) {{ requiredError }}

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
				:noDateCol="noDateCol"
				@click="click(opEntry)"
				@editOpEntry="editOpEntry(opEntry)"
				@deleteOpEntry="deleteOpEntry(opEntry)"
			)

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import nothingToDo from '@/ui-operations/nothingToDo';
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import dbo from '@/blogic/Dbo/dbo';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';
import OpEntryItem from '@/components/OpEntriesList/OpEntryItem.vue';
import { TAccount } from '@/blogic/Entities/Account';
import { TOpEntryListMode } from '@/components/OpEntriesList/types/OpEntryListTypes';
import { TOpDate } from '@/blogic/Entities/OpDate';
import TPanelCol from '@/components/Template/Panel/types/ListPanelTypes';
import Panel from '@/components/Template/Panel/Panel.vue';
import ListLayout from '@/components/Template/ListLayout/ListLayout.vue';

@Component({
	components: {
		ListLayout,
		Panel,
		OpEntryItem,
	},
})
export default class OpEntriesList extends Vue {
	@Prop({ type: String, default: 'Операции по счетам' }) title!: string;
	@Prop({ type: Object }) currentAccount!: TAccount|null|undefined;
	@Prop({ type: Object }) currentOpDate!: TOpDate|null|undefined;
	@Prop({ type: Boolean, default: false }) noDateCol!: boolean;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;

	activeOpEntry: TOpEntry|null = null;

	panelCols: TPanelCol[] = [
		{ title: 'Дата', cols: 3, hidden: this.noDateCol },
		{ title: 'Счет Дебета / Кредита', cols: 4 },
		{ title: 'Сумма', textRight: true },
	];

	get mode(): TOpEntryListMode {
		if (this.currentAccount !== undefined) return TOpEntryListMode.FOR_ACCOUNT;
		if (this.currentOpDate !== undefined) return TOpEntryListMode.FOR_DATE;
		return TOpEntryListMode.ALL;
	}

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

	get requiredError(): string {
		if (!this.currentOpDate && this.mode === TOpEntryListMode.FOR_DATE) return 'Не выбрана дата';
		if (!this.currentAccount && this.mode === TOpEntryListMode.FOR_ACCOUNT) return 'Не выбран счет';
		return '';
	}

	get opEntries(): TOpEntry[] {
		if (this.mode === TOpEntryListMode.ALL) return dbo.opEntriesMgr.getOpEntries();
		if (this.requiredError) return [];
		if (this.mode === TOpEntryListMode.FOR_ACCOUNT && this.currentAccount) {
			return dbo.opEntriesMgr.getOpEntriesForAccount(this.currentAccount.Acct);
		}
		if (this.mode === TOpEntryListMode.FOR_DATE && this.currentOpDate) {
			return dbo.opEntriesMgr.getOpEntriesForDate(this.currentOpDate.OpDate);
		}
		return [];
	}

	get defaultNewOpEntry(): Partial<TOpEntry> {
		if (this.mode === TOpEntryListMode.FOR_ACCOUNT && this.currentAccount) return {
			AcctDB: this.currentAccount.Acct,
		}
		if (this.mode === TOpEntryListMode.FOR_DATE && this.currentOpDate) return {
			OpDate: this.currentOpDate.OpDate,
		}
		return {};
	}

	addOpEntry(): void {
		addOpEntryOperation({ opEntry: this.defaultNewOpEntry }).then().catch(nothingToDo);
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
