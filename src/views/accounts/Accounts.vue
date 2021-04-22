<template lang="pug">
	PageTemplate(
		:title="['Банковские счета', 'Список операций по счету']"
	)
		template(#headerLeft)
			b-form-datepicker.mr-2(
				v-model="currentDate"
				style="width: 270px"
				button-variant="info"
			)

			b-button(
				@click="addAccount"
				variant="outline-secondary"
			)
				b-icon-plus-circle-fill.mr-2(
					variant="info"
					shift-v="-1"
				)
				span Добавить счет

		template(#mainTopLeft)
			b-row.text-subtitle.text--secondary
				b-col(cols="5") Номер счета
				b-col.text-right() Остаток
				b-col(cols="auto")
					.item-btn-slot

		template(#defaultLeft)
			AccountItem(
				v-for="account in accounts"
				:key="account.Acct"
				:account="account"
				:currentDate="currentDate"
				@click="activeAccount=account"
				:active="account.Acct===activeAccount.Acct"
				@editAccount="editAccount(account)"
				@deleteAccount="deleteAccount(account)"
			)

		template(#headerRight)
			b-button(
				@click="addOpEntry"
				variant="outline-secondary"
			)
				b-icon-plus-circle-fill.mr-2(
					variant="info"
					shift-v="-1"
				)
				span Добавить операцию

		template(#mainTopRight)
			b-row.text-subtitle.text--secondary
				b-col(cols="3") Дата опер.дня
				b-col(cols="4") Счет Дебета / Кредита
				b-col.text-right() Сумма
				b-col(cols="auto")
					.item-btn-slot

		template(#defaultRight)
			.my-3.text-center(
				v-if="opEntriesForAccount.length===0"
			) Операций не найдено по этому счету

			OpEntryItem(
				v-for="(opEntry, index) in opEntriesForAccount"
				:key="index"
				:opEntry="opEntry"
				@editOpEntry="editOpEntry(opEntry)"
				@deleteOpEntry="deleteOpEntry(opEntry)"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TAccount } from '@/blogic/entities/Account';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import editAccountOperation from '@/ui-operations/AddOrEditAccountOperation/editAccountOperation';
import addAccountOperation from '@/ui-operations/AddOrEditAccountOperation/addAccountOperation';
import addOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/addOpEntryOperation';
import editOpEntryOperation from '@/ui-operations/AddOrEditOpEntryOperation/editOpEntryOperation';
import PageTemplate from '@/components/template/page/PageTemplate.vue';
import AccountItem from '@/views/accounts/components/AccountItem.vue';
import OpEntryItem from '@/views/accounts/components/OpEntryItem.vue';
import deleteOpEntryOperation from '@/ui-operations/DeleteOpEntryOperation/deleteOpEntryOperation';
import deleteAccountOperation from '@/ui-operations/DeleteAccountOperation/deleteAccountOperation';
import nothingToDo from '@/ui-operations/nothingToDo';
import OpEntriesMgr from '@/blogic/classes/OpEntriesMgr/OpEntriesMgr';
import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';

@Component({
	components: {
		OpEntryItem,
		AccountItem,
		PageTemplate,
	}
})
export default class Accounts extends Vue {
	activeAccount: TAccount|null = null;
	currentDate = OpDatesMgr.lastDate;

	created(): void {
		if (this.accounts.length) {
			this.activeAccount = this.accounts[0];
		}
	}

	get accounts(): TAccount[] {
		return AccountsMgr.getAccounts();
	}

	get opEntriesForAccount(): TOpEntry[] {
		if (!this.activeAccount) return [];
		return OpEntriesMgr.getOpEntriesForAccount(this.activeAccount?.Acct);
	}

	addAccount(): void {
		addAccountOperation().then().catch(nothingToDo);
	}

	editAccount(account: TAccount): void {
		editAccountOperation({ account }).then().catch(nothingToDo);
	}

	deleteAccount(account: TAccount): void {
		deleteAccountOperation(account).then().catch(nothingToDo);
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

<style lang="scss">
@import "../../assets/style/utils";


</style>
