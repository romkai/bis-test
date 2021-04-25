<template lang="pug">
	ListLayout

		template(#panel)

			Panel(
				:title="title",
				:cols="panelCols"
				addText="Добавить счет"
				@addItem="addAccount"
			)
				b-form-datepicker.mr-2(
					v-model="currentDate"
					style="width: 270px"
					button-variant="info"
					:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
				)

		template(#default)

			.my-3.text-center(
				v-if="accounts.length===0"
			) Счета не найдены

			AccountItem(
				v-for="account in accounts"
				:key="account.Acct"
				:account="account"
				:currentDate="currentDate"
				:active="isActive(account)"
				:nonClickable="nonClickable"
				@click="click(account)"
				@editAccount="editAccount(account)"
				@deleteAccount="deleteAccount(account)"
			)

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { TAccount } from '@/blogic/Entities/Account';
import addAccountOperation from '@/ui-operations/AddOrEditAccountOperation/addAccountOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import editAccountOperation from '@/ui-operations/AddOrEditAccountOperation/editAccountOperation';
import deleteAccountOperation from '@/ui-operations/DeleteAccountOperation/deleteAccountOperation';
import AccountItem from '@/components/AccountsList/AccountItem.vue';
import dbo from '@/blogic/Dbo/dbo';
import Panel from '@/components/Template/Panel/Panel.vue';
import TPanelCol from '@/components/Template/Panel/types/ListPanelTypes';
import ListLayout from '@/components/Template/ListLayout/ListLayout.vue';

@Component({
	components: {
		ListLayout,
		Panel,
		AccountItem,
	},
})
export default class AccountsList extends Vue {
	@Prop({ type: String, default: 'Банковские счета' }) title!: string;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;

	activeAccount: TAccount|null = null;
	currentDate = dbo.opDatesMgr.getLastDate();

	panelCols: TPanelCol[] = [
		{ title: 'Наименование', cols: 5 },
		{ title: 'Остаток', textRight: true },
	];

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
