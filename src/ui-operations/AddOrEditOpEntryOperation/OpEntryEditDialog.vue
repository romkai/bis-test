<template lang="pug">
	b-modal(
		v-model="show"
		:title="title"
		@close="closeDialog"
		@cancel="closeDialog"
		no-close-on-backdrop
		@ok="submit"
		:ok-disabled="!submitValid"
		ok-title="Сохранить"
	)
		b-form
			b-form-group(
				label="Дата операции"
				label-for="input-date"
			)
				b-form-select(
					id="input-date"
					:disabled="isOpEntryEditing"
					v-model="DATA.OpDate"
					:options="opDates"
				)

			b-form-group(
				label="Дебетовый счет"
				label-for="input-acct-db"
			)
				b-form-select(
					id="input-acct-db"
					v-model="DATA.AcctDB"
					:options="accounts"
				)
			b-form-group(
				label="Кредитовый счет"
				label-for="input-acct-cr"
			)
				b-form-select(
					id="input-acct-cr"
					v-model="DATA.AcctCr"
					:options="accounts"
				)

			b-form-group(
				label="Сумма операции"
				label-for="input-amount"
			)
				b-form-input(
					id="input-amount"
					v-model="DATA.Amount"
					placeholder="Сумма"
					type="number"
					required
				)

</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import {
	TAddOpEntryOperationInput,
	TAddOpEntryOperationResult,
	TEditOpEntryOperationInput,
	TEditOpEntryOperationResult,
	isOpEntryEditing,
} from '@/ui-operations/AddOrEditOpEntryOperation/types/AddOrEditOpEntryTypes';
import { TAccount } from '@/blogic/entities/Account';
import { TOpDate } from '@/blogic/entities/OpDate';
import dbo from '@/blogic/classes/Dbo/Dbo';

@Component
export default class OpEntryDialog extends Vue {
	@Prop() operationInput!: TAddOpEntryOperationInput | TEditOpEntryOperationInput;
	@Prop() finishOperation!: (r: TAddOpEntryOperationResult | TEditOpEntryOperationResult) => void;
	@Prop() cancelOperation!: () => void;

	show = true;

	accounts = dbo.accountsMgr.getAccounts().map((acc: TAccount) => ({ value: acc.Acct, text: acc.Acct }));
	opDates = dbo.opDatesMgr.getOpDates().map((dt: TOpDate) => ({ value: dt.OpDate, text: dt.OpDate }));

	get isOpEntryEditing(): boolean {
		return isOpEntryEditing(this.operationInput);
	}

	DATA: TOpEntry = {
		Id: 0,
		AcctCr: '',
		AcctDB: '',
		OpDate: '',
		Amount: 0.00,
	};

	created(): void {
		if (isOpEntryEditing(this.operationInput)) {
			this.DATA = Object.assign({}, this.operationInput.opEntry);
		}
	}

	get dateValid(): boolean {
		return !!this.DATA.OpDate;
	}

	get acctDbValid(): boolean {
		return !!this.DATA.AcctDB;
	}

	get acctCrValid(): boolean {
		return !!this.DATA.AcctCr && this.DATA.AcctDB !== this.DATA.AcctCr;
	}

	get amountValid(): boolean {
		return !!this.DATA.Amount;
	}

	get submitValid(): boolean {
		return this.dateValid && this.acctDbValid && this.acctCrValid && this.amountValid;
	}

	get title(): string {
		return isOpEntryEditing(this.operationInput) ? 'Редактирование операции' : 'Новая операция';
	}

	submit(): void {
		this.DATA.Amount = Number(this.DATA.Amount); // string -> number
		if (isOpEntryEditing(this.operationInput)) {
			dbo.opEntriesMgr.updateOpEntry(this.DATA)
				.then(() => this.finishOperation({ opEntry: this.DATA }));
		} else {
			dbo.opEntriesMgr.createOpEntry(this.DATA)
				.then(() => this.finishOperation({ opEntry: this.DATA }));
		}
	}

	closeDialog(): void {
		this.cancelOperation();
	}
}

</script>
