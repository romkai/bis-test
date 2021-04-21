<template lang="pug">
	b-modal(
		v-model="show"
		:title="operationInput.title"
		@close="closeDialog"
		@cancel="closeDialog"
		no-close-on-backdrop
		@ok="finishOperation(true)"
	)
		p {{ operationInput.text }}

</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { TConfirmOperationInput, TConfirmOperationResult } from './types/ConfirmTypes';

@Component
export default class ConfirmationDialog extends Vue {
	@Prop() operationInput!: TConfirmOperationInput;
	@Prop() finishOperation!: (r: TConfirmOperationResult) => void;
	@Prop() cancelOperation!: () => void;

	show = true;

	closeDialog() {
		this.cancelOperation();
	}
}

</script>
