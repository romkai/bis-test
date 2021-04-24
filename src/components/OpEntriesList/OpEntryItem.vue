<template lang="pug">
	b-row.item-wrapper.text-body(
		@click="$emit('click')"
		:class="itemClass"
	)
		b-col(
			v-if="!noDateCol"
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
					v-if="checkPermissions(permissions, 'U')"
					variant="outline-info"
					@click.stop="$emit('editOpEntry')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					v-if="checkPermissions(permissions, 'D')"
					variant="outline-secondary"
					@click.stop="$emit('deleteOpEntry')"
					size="sm"
				)
					b-icon(icon="trash")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import { formatMoney, moneyUnits } from '@/helpers/money';
import checkPermissions from '@/helpers/checkPermissions';

@Component
export default class OpEntryItem extends Vue {
	@Prop({ type: Object, required: true }) opEntry!: TOpEntry;
	@Prop({ type: Boolean, default: false }) active!: boolean;
	@Prop({ type: Boolean, default: false }) noDateCol!: boolean;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

	formatMoney = formatMoney;
	moneyUnits = moneyUnits;
	checkPermissions = checkPermissions;

	get itemClass(): Record<string, boolean> {
		return {
			'active-item': this.active,
			'block-hover': !this.nonClickable,
			'item-wrapper-active': !this.nonClickable,
		};
	}
}
</script>
