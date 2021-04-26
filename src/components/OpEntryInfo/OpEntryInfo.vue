<template lang="pug">
	ListLayout

		template(#header)

			ListHeader(
				title="Список проводок",
				:cols="panelCols"
				:actionButtons="false"
			)

		template(#default)

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
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import { formatMoney, moneyUnits } from '@/helpers/money';
import dbo from '@/blogic/Dbo/dbo';
import THeaderCol from '@/components/Template/ListHeader/types/ListHeaderTypes';
import ListLayout from '@/components/Template/ListLayout/ListLayout.vue';
import ListHeader from '@/components/Template/ListHeader/ListHeader.vue';
@Component({
	components: { ListHeader, ListLayout },
})
export default class OpEntryInfo extends Vue {
	@Prop({ type: String, default: 'Список проводок' }) title!: string;
	@Prop({ type: Object }) opEntry!: TOpEntry|null;

	lastDate = dbo.opDatesMgr.getLastDate();
	moneyUnits = moneyUnits;
	formatMoney = formatMoney;

	panelCols: THeaderCol[] = [
		{ title: 'Счет дебета и кредита', cols: 6 },
		{ title: 'Остаток', cols: 6, textRight: true },
	];

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
