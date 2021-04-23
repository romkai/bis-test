<template lang="pug">
	b-modal(
		v-model="show"
		:title="title"
		@close="closeDialog"
		@cancel="closeDialog"
		no-close-on-backdrop
		@ok="submit"
		:ok-disabled="!submitValid"
		ok-title="Сохранить"
	)
		b-form
			b-form-group(
				label="Дата опер.дня"
				label-for="input-date"
			)
				b-form-datepicker.mr-2(
					id="input-date"
					v-model="DATA.OpDate"
					:disabled="isOpDateEditing"
					button-variant="info"
				)

</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import {
	TAddOpDateOperationInput,
	TAddOpDateOperationResult,
	TEditOpDateOperationInput,
	TEditOpDateOperationResult,
	isOpDateEditing,
} from '@/ui-operations/AddOrEditOpDateOperation/types/AddOrEditOpDateTypes';
import dbo from '@/blogic/classes/Dbo/Dbo';

@Component
export default class OpDateDialog extends Vue {
	@Prop() operationInput!: TAddOpDateOperationInput|TEditOpDateOperationInput;
	@Prop() finishOperation!: (r: TAddOpDateOperationResult|TEditOpDateOperationResult) => void;
	@Prop() cancelOperation!: () => void;

	show = true;

	get isOpDateEditing(): boolean {
		return isOpDateEditing(this.operationInput);
	}

	DATA: TOpDate = {
		OpDate: '',
		OpStatus: 'Открыт',
	};

	created(): void {
		if (isOpDateEditing(this.operationInput)) {
			this.DATA = Object.assign({}, this.operationInput.opDate);
		}
	}

	get dateValid(): boolean {
		return !!this.DATA.OpDate && (
			this.isOpDateEditing || !dbo.opDatesMgr.opDateExists(this.DATA.OpDate)
		);
	}

	get submitValid(): boolean {
		return this.dateValid;
	}

	get title(): string {
		return isOpDateEditing(this.operationInput) ? 'Редактирование опер.дня' : 'Новый опер.день';
	}

	submit(): void {
		if (isOpDateEditing(this.operationInput)) {
			dbo.opDatesMgr.updateOpDate(this.DATA)
				.then(() => this.finishOperation({ opDate: this.DATA }));
		} else {
			dbo.opDatesMgr.createOpDate(this.DATA)
				.then(() => this.finishOperation({ opDate: this.DATA }));
		}
	}

	closeDialog(): void {
		this.cancelOperation();
	}
}

</script>
