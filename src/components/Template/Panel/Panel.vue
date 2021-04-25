<template lang="pug">
	div
		b-row.my-3
			b-col()
				h5.mb-0 {{ title }}

			b-col()
				slot

			b-col.text-right()
				b-button(
					v-if="addText"
					@click="$emit('addItem')"
					variant="outline-secondary"
				)
					b-icon-plus-circle-fill.mr-2(
						variant="info"
						shift-v="-1"
					)
					span {{ addText }}

		b-row.text-subtitle.text--secondary
			b-col(
				v-for="(col, index) in cols.filter(c => !c.hidden)"
				:key="index"
				:cols="col.cols"
				:class="{ 'text-right': col.textRight }"
			) {{ col.title }}
			b-col(
				v-if="actionButtons"
				cols="auto"
			)
				.item-btn-slot Действия

</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import TPanelCol from '@/components/Template/Panel/types/ListPanelTypes';

@Component
export default class Panel extends Vue {
	@Prop({ type: String, default: 'Заголовок' }) title!: string;
	@Prop({ type: Array, default: () => [] }) cols!: TPanelCol[];
	@Prop({ type: String }) addText!: string;
	@Prop({ type: Boolean, default: true }) actionButtons!: boolean;
}
</script>
