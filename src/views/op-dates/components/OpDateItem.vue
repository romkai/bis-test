<template lang="pug">
	b-row.item-wrapper.text-body.item-wrapper-active.block-hover(
		@click="$emit('click')"
		:class="{ 'active-item': active }"
	)
		b-col(cols="5") {{ opDate.OpDate }}
		b-col.text-right()
			span {{ opDate.OpStatus }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					variant="outline-info"
					@click.stop="$emit('editOpDate')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					variant="outline-secondary"
					@click.stop="$emit('deleteOpDate')"
					size="sm"
				)
					b-icon(icon="trash")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';

@Component
export default class OpDateItem extends Vue {
	@Prop({ type: Object, required: true }) opDate!: TOpDate;
	@Prop({ type: Boolean, required: true }) active!: boolean;
}
</script>
