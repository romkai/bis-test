<template lang="pug">
	b-row.item-wrapper.text-body(
		@click="$emit('click')"
		:class="itemClass"
	)
		b-col(cols="5") {{ opDate.OpDate }}
		b-col.text-right()
			span {{ opDate.OpStatus }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					v-if="checkPermissions(permissions, 'U')"
					variant="outline-info"
					@click.stop="$emit('editOpDate')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					v-if="checkPermissions(permissions, 'D')"
					variant="outline-secondary"
					@click.stop="$emit('deleteOpDate')"
					size="sm"
				)
					b-icon(icon="trash")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/Entities/OpDate';
import checkPermissions from '@/helpers/checkPermissions';

@Component
export default class OpDateItem extends Vue {
	@Prop({ type: Object, required: true }) opDate!: TOpDate;
	@Prop({ type: Boolean, required: true }) active!: boolean;
	@Prop({ type: Boolean, default: false }) nonClickable!: boolean;
	@Prop({ type: String, default: 'CRUD' }) permissions!: string;

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
