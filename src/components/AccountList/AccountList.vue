<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-form-datepicker.mr-2(
			v-model="currentDate"
			style="width: 270px"
			button-variant="info"
		)

		b-button(
			v-if="checkCRUD(crud, 'C')"
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
			@click="activeAccount=account"
			:active="!!activeAccount && account.Acct===activeAccount.Acct"
			@editAccount="editAccount(account)"
			@deleteAccount="deleteAccount(account)"
			:hover="hover"
			:crud="crud"
		)

</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { TAccount } from '@/blogic/entities/Account';
import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';
import addAccountOperation from '@/ui-operations/AddOrEditAccountOperation/addAccountOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import editAccountOperation from '@/ui-operations/AddOrEditAccountOperation/editAccountOperation';
import deleteAccountOperation from '@/ui-operations/DeleteAccountOperation/deleteAccountOperation';
import AccountItem from '@/components/AccountList/AccountItem.vue';
import checkCRUD from '@/helpers/permissions';

@Component({
	components: {
		AccountItem,
	},
})
export default class AccountList extends Vue {
	@Prop({ type: String, default: 'Банковские счета' }) title!: string;
	@Prop({ type: Boolean, default: false }) hover!: boolean;
	@Prop({ type: String, default: 'CRUD' }) crud!: string;

	activeAccount: TAccount|null = null;
	currentDate = OpDatesMgr.getLastDate();
	checkCRUD = checkCRUD;

	get accounts(): TAccount[] {
		return AccountsMgr.getAccounts();
	}

	@Watch('activeAccount')
	onActiveAccountChange(): void {
		this.$emit('setActiveAccount', this.activeAccount);
	}

	created(): void {
		this.locateFirstAccount();
	}

	locateFirstAccount(): void {
		if (this.accounts.length === 0) return;
		this.activeAccount = this.accounts[0];
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
