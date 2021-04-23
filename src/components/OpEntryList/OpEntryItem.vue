<template lang="pug">
	b-row.item-wrapper.text-body(
		@click="$emit('click')"
		:class="{ 'active-item': active, 'block-hover': hover, 'item-wrapper-active': hover }"
	)
		b-col(
			v-if="!hideDate"
			cols="3"
		) {{ opEntry.OpDate }}
		b-col(cols="4")
			div {{ opEntry.AcctDB }}
			div {{ opEntry.AcctCr }}
		b-col.text-right()
			span {{ formatMoney(opEntry.Amount) }}
			span.text--secondary.ml-1 {{ moneyUnits }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					v-if="checkCRUD(crud, 'U')"
					variant="outline-info"
					@click.stop="$emit('editOpEntry')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					v-if="checkCRUD(crud, 'D')"
					variant="outline-secondary"
					@click.stop="$emit('deleteOpEntry')"
					size="sm"
				)
					b-icon(icon="trash")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import { formatMoney, moneyUnits } from '@/helpers/money';
import checkCRUD from '@/helpers/permissions';

@Component
export default class OpEntryItem extends Vue {
	@Prop({ type: Object, required: true }) opEntry!: TOpEntry;
	@Prop({ type: Boolean, default: false }) active!: boolean;
	@Prop({ type: Boolean, default: false }) hideDate!: boolean;
	@Prop({ type: Boolean, default: false }) hover!: boolean;
	@Prop({ type: String, default: 'CRUD' }) crud!: string;

	formatMoney = formatMoney;
	moneyUnits = moneyUnits;
	checkCRUD = checkCRUD;
}
</script>
