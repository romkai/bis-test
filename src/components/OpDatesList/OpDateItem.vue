<template lang="pug">
	b-row.item-wrapper.text-body.item-wrapper-active.block-hover(
		@click="$emit('click')"
		:class="{ 'active-item': active, 'block-hover': hover, 'item-wrapper-active': hover }"
	)
		b-col(cols="5") {{ opDate.OpDate }}
		b-col.text-right()
			span {{ opDate.OpStatus }}
		b-col.text-right(cols="auto")
			.item-btn-slot
				b-button.mr-1(
					v-if="checkCRUD(crud, 'U')"
					variant="outline-info"
					@click.stop="$emit('editOpDate')"
					size="sm"
				)
					b-icon(icon="pencil-square")

				b-button.trash-icon-hover(
					v-if="checkCRUD(crud, 'D')"
					variant="outline-secondary"
					@click.stop="$emit('deleteOpDate')"
					size="sm"
				)
					b-icon(icon="trash")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import checkCRUD from '@/helpers/permissions';

@Component
export default class OpDateItem extends Vue {
	@Prop({ type: Object, required: true }) opDate!: TOpDate;
	@Prop({ type: Boolean, required: true }) active!: boolean;
	@Prop({ type: Boolean, default: false }) hover!: boolean;
	@Prop({ type: String, default: 'CRUD' }) crud!: string;

	checkCRUD = checkCRUD;
}
</script>
