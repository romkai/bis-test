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
				label="Наименование счета"
				label-for="input-acct"
			)
				b-form-input(
					id="input-acct"
					v-model="DATA.Acct"
					placeholder="Наименование счета"
					:disabled="isAccountEditing"
					required
				)

			b-form-group(
				label="Начальный остаток"
				label-for="input-ost"
			)
				b-form-input(
					id="input-ost"
					v-model="DATA.Ost"
					placeholder="Начальный остаток"
					type="number"
					required
				)

			//b-form-group(
			//	id="input-group-3"
			//)
			//	b-form-checkbox-group(
			//		id="checkboxes-3"
			//	)
			//		b-form-checkbox(
			//			value="me"
			//		) checkbox


</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { TAccount } from '@/entities/Account';
import {
	TAddAccountOperationInput,
	TAddAccountOperationResult,
	TEditAccountOperationInput,
	TEditAccountOperationResult,
	isAccountEditing,
} from '@/ui-operations/AddOrEditAccountOperation/types/AddOrEditAccountTypes';
import MainContext from '@/helpers/MainContext';

@Component
export default class AccountDialog extends Vue {
	@Prop() operationInput!: TAddAccountOperationInput|TEditAccountOperationInput;
	@Prop() finishOperation!: (r: TAddAccountOperationResult|TEditAccountOperationResult) => void;
	@Prop() cancelOperation!: () => void;

	show = true;
	store = MainContext.$store;

	get isAccountEditing(): boolean {
		return isAccountEditing(this.operationInput);
	}

	DATA: TAccount = {
		Acct: '',
		Ost: 0,
	};

	created(): void {
		if (isAccountEditing(this.operationInput)) {
			this.DATA = Object.assign({}, this.operationInput.account);
		}
	}

	get acctNameValid(): boolean {
		return !!this.DATA.Acct &&
			(this.isAccountEditing || !this.store.getters.accountExists(this.DATA.Acct));
	}

	get acctOstValid(): boolean {
		return true;
	}

	get submitValid(): boolean {
		return this.acctNameValid && this.acctOstValid;
	}

	get title(): string {
		return isAccountEditing(this.operationInput) ? 'Редактирование счета' : 'Новый счет';
	}

	submit(): void {
		this.DATA.Ost = Number(this.DATA.Ost); // string -> number
		if (isAccountEditing(this.operationInput)) {
			this.store.dispatch('updateAccount', this.DATA);
			this.finishOperation({ account: this.DATA });
		} else {
			this.store.dispatch('createAccount', this.DATA);
			this.finishOperation({ account: this.DATA });
		}
	}

	closeDialog(): void {
		this.cancelOperation();
	}
}

</script>
