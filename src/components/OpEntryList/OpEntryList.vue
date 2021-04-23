<template lang="pug">
	div
		b-button(
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
			v-if="mode===TOpEntryListMode.FOR_ACCOUNT && !this.currentAccount"
		) Выберите счет в списке слева

		.my-3.text-center(
			v-else-if="opEntries.length===0"
		) Операций не найдено по этому счету

		OpEntryItem(
			v-else
			v-for="(opEntry, index) in opEntries"
			:key="index"
			:opEntry="opEntry"
			:active="!!activeOpEntry && opEntry.Id===activeOpEntry.Id"
			@click="activeOpEntry=opEntry"
			@editOpEntry="editOpEntry(opEntry)"
			@deleteOpEntry="deleteOpEntry(opEntry)"
			activeItem
			hover
		)

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import nothingToDo from '@/ui-operations/nothingToDo';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import OpEntriesMgr from '@/blogic/classes/OpEntriesMgr/OpEntriesMgr';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';
import OpEntryItem from '@/components/OpEntryList/OpEntryItem.vue';
import { PropType } from 'vue';
import { TAccount } from '@/blogic/entities/Account';
import { TOpEntryListMode } from '@/components/OpEntryList/types/OpEntryListTypes';

@Component({
	components: {
		OpEntryItem,
	},
})
export default class OpEntryList extends Vue {
	@Prop({ type: Number, default: TOpEntryListMode.ALL }) mode!: TOpEntryListMode;
	@Prop({ type: Object as PropType<TAccount> }) currentAccount!: TAccount;

	activeOpEntry: TOpEntry|null = null;
	TOpEntryListMode = TOpEntryListMode;

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

	get opEntries(): TOpEntry[] {
		if (this.mode === TOpEntryListMode.FOR_ACCOUNT) {
			if (!this.currentAccount) return [];
			return OpEntriesMgr.getOpEntriesForAccount(this.currentAccount.Acct);
		}
		return OpEntriesMgr.getOpEntries();
	}

	addOpEntry(): void {
		addOpEntryOperation().then().catch(nothingToDo);
	}

	editOpEntry(opEntry: TOpEntry): void {
		editOpEntryOperation({ opEntry }).then().catch(nothingToDo);
	}

	deleteOpEntry(opEntry: TOpEntry): void {
		deleteOpEntryOperation(opEntry).then().catch(nothingToDo);
	}}
</script>
