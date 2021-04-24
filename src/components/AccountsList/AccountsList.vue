<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-form-datepicker.mr-2(
			v-model="currentDate"
			style="width: 270px"
			button-variant="info"
		)

		b-button(
			v-if="checkPermissions(permissions, 'C')"
			@click="addAccount"
			variant="outline-secondary"
		)
			b-icon-plus-circle-fill.mr-2(
				variant="info"
				shift-v="-1"
			)
			span Добавить счет

		b-row.text-subtitle.text--secondary
			b-col(cols="5") Номер счета
			b-col.text-right() Остаток
			b-col(cols="auto")
				.item-btn-slot

		AccountItem(
			v-for="account in accounts"
			:key="account.Acct"
			:account="account"
			:currentDate="currentDate"
			:active="isActive(account)"
			:nonClickable="nonClickable"
			:permissions="permissions"
			@click="click(account)"
			@editAccount="editAccount(account)"
			@deleteAccount="deleteAccount(account)"
		)

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { TAccount } from '@/blogic/entities/Account';
import addAccountOperation from '@/ui-operations/AddOrEditAccountOperation/addAccountOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import editAccountOperation from '@/ui-operations/AddOrEditAccountOperation/editAccountOperation';
import deleteAccountOperation from '@/ui-operations/DeleteAccountOperation/deleteAccountOperation';
import AccountItem from '@/components/AccountsList/AccountItem.vue';
import dbo from '@/blogic/classes/Dbo/Dbo';
import checkPermissions from '@/helpers/checkPermissions';

@Component({
	components: {
		AccountItem,
	},
})
export default class AccountsList extends Vue {
	@Prop({ type: String, default: 'Банковские счета' }) title!: string;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

	activeAccount: TAccount|null = null;
	currentDate = dbo.opDatesMgr.getLastDate();
	checkPermissions = checkPermissions;

	get accounts(): TAccount[] {
		return dbo.accountsMgr.getAccounts();
	}

	@Watch('activeAccount')
	onActiveAccount(): void {
		this.$emit('onActiveAccount', this.activeAccount);
	}

	created(): void {
		this.locateFirstAccount();
	}

	locateFirstAccount(): void {
		if (this.accounts.length === 0) return;
		this.activeAccount = this.accounts[0];
	}

	isActive(account: TAccount): boolean {
		return !!this.activeAccount && account.Acct === this.activeAccount.Acct;
	}

	click(account: TAccount): void {
		if (this.nonClickable) return;
		this.activeAccount = account;
	}

	addAccount(): void {
		addAccountOperation().then().catch(nothingToDo);
	}

	editAccount(account: TAccount): void {
		editAccountOperation({ account }).then().catch(nothingToDo);
	}

	deleteAccount(account: TAccount): void {
		deleteAccountOperation(account).then(() => {
			if (account.Acct === this.activeAccount?.Acct) {
				this.activeAccount = null;
			}
		}).catch(nothingToDo);
	}

}
</script>
