<template lang="pug">
	b-row.item-wrapper.text-body(
		@click="$emit('click')"
		:class="itemClass"
	)
		b-col(cols="5") {{ account.Acct }}
		b-col.text-right()
			span {{ formatMoney(getAcctOstForDate(account.Acct)) }}
			span.text--secondary.ml-1 {{ moneyUnits }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					v-if="checkPermissions(permissions, 'U')"
					variant="outline-info"
					@click.stop="$emit('editAccount')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					v-if="checkPermissions(permissions, 'D')"
					variant="outline-secondary"
					@click.stop="$emit('deleteAccount')"
					size="sm"
				)
					b-icon(icon="trash")

</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatMoney, moneyUnits } from '@/helpers/money';
import { TAccount } from '@/blogic/Entities/Account';
import checkPermissions from '@/helpers/checkPermissions';
import dbo from '@/blogic/Dbo/dbo';

@Component
export default class AccountItem extends Vue {
	@Prop({ type: Object, required: true }) account!: TAccount;
	@Prop({ type: String, required: true }) currentDate!: string;
	@Prop({ type: Boolean, required: true }) active!: boolean;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

	formatMoney = formatMoney;
	moneyUnits = moneyUnits;
	checkPermissions = checkPermissions;

	getAcctOstForDate(acct: string): number {
		return dbo.accountsMgr.getAcctOstForDate(acct, this.currentDate);
	}

	get itemClass(): Record<string, boolean> {
		return {
			'active-item': this.active,
			'block-hover': !this.nonClickable,
			'item-wrapper-active': !this.nonClickable,
		};
	}
}
</script>
