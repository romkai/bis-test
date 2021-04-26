<template lang="pug">
	.page-template__wrapper
		.page-template__column
			slot(name="left")

		.page-template__column
			slot(name="right")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageTemplate extends Vue {}
</script>

<style lang="scss">
@import "src/assets/style/utils";

.page-template {
	&__wrapper {
		@include flex-inline;
		height: calc(100vh - 56px);
	}
	&__column {
		flex: 1 1 50%;
		max-width: 50%;
		@include indent-inside;
		height: 100%;
		overflow: hidden;
	}
}
</style>
