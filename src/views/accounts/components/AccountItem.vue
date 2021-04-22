<template lang="pug">
	b-row.item-wrapper.text-body.item-wrapper-active.block-hover(
		@click="$emit('click')"
		:class="{ 'active-item': active }"
	)
		b-col(cols="5") {{ account.Acct }}
		b-col.text-right()
			span {{ formatMoney(acctOstForDate(account.Acct, currentDate)) }}
			span.text--secondary.ml-1 {{ moneyUnits }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					variant="outline-info"
					@click.stop="$emit('editAccount')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					variant="outline-secondary"
					@click.stop="$emit('deleteAccount')"
					size="sm"
				)
					b-icon(icon="trash")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatMoney, moneyUnits } from '@/helpers/money';
import { TAccount } from '@/blogic/entities/Account';
import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';

@Component
export default class AccountItem extends Vue {
	@Prop({ type: Object, required: true }) account!: TAccount;
	@Prop({ type: String, required: true }) currentDate!: string;
	@Prop({ type: Boolean, required: true }) active!: boolean;

	formatMoney = formatMoney;
	moneyUnits = moneyUnits;
	acctOstForDate = AccountsMgr.acctOstForDate;
}
</script>
