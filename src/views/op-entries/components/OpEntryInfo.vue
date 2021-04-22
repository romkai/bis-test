<template lang="pug">
	div
		b-row.item-wrapper.text-body
			b-col(cols="6") {{ opEntry.AcctDB }}
			b-col.text-right(cols="6")
				span {{ formatMoney(acctOstForDate(opEntry.AcctDB, lastDate)) }}
				span.text--secondary.ml-1 {{ moneyUnits }}
		b-row.item-wrapper.text-body
			b-col(cols="6") {{ opEntry.AcctCr }}
			b-col.text-right(cols="6")
				span {{ formatMoney(acctOstForDate(opEntry.AcctCr, lastDate)) }}
				span.text--secondary.ml-1 {{ moneyUnits }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { formatMoney, moneyUnits } from '@/helpers/money';
import AccountsMgr from '@/blogic/classes/AccountsMgr/AccountsMgr';
import OpDatesMgr from '@/blogic/classes/OpDatesMgr/OpDatesMgr';

@Component
export default class OpEntryInfo extends Vue {
	@Prop({ type: Object, required: true }) opEntry!: TOpEntry;

	moneyUnits = moneyUnits;
	formatMoney = formatMoney;
	acctOstForDate = AccountsMgr.acctOstForDate;
	lastDate = OpDatesMgr.lastDate;
}
</script>
