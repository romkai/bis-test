<template lang="pug">
	div
		h5.mb-0 {{ title }}

		b-row.text-subtitle.text--secondary
			b-col() Номер счета
			b-col.text-right(cols="auto") Остаток

		.my-3.text-center(v-if="!opEntry") Не выбрана операция

		div(v-else)
			b-row.item-wrapper.text-body
				b-col(cols="6") {{ opEntry.AcctDB }}
				b-col.text-right(cols="6")
					span {{ formatMoney(ostDb) }}
					span.text--secondary.ml-1 {{ moneyUnits }}
			b-row.item-wrapper.text-body
				b-col(cols="6") {{ opEntry.AcctCr }}
				b-col.text-right(cols="6")
					span {{ formatMoney(ostCr) }}
					span.text--secondary.ml-1 {{ moneyUnits }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { formatMoney, moneyUnits } from '@/helpers/money';
import dbo from '@/blogic/classes/Dbo/Dbo';

@Component
export default class OpEntryInfo extends Vue {
	@Prop({ type: String, default: 'Список проводок' }) title!: string;
	@Prop({ required: true }) opEntry!: TOpEntry|null;

	lastDate = dbo.opDatesMgr.getLastDate();

	moneyUnits = moneyUnits;
	formatMoney = formatMoney;

	get ostDb(): number {
		if (!this.opEntry) return 0;
		return dbo.accountsMgr.getAcctOstForDate(this.opEntry.AcctDB, this.lastDate);
	}

	get ostCr(): number {
		if (!this.opEntry) return 0;
		return dbo.accountsMgr.getAcctOstForDate(this.opEntry.AcctCr, this.lastDate);
	}
}
</script>
