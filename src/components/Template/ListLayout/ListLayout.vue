<template lang="pug">
	.list-layout__wrapper
		.list-layout__header
			slot(name="header")

		.list-layout__main
			.scroll-area
				slot(name="default")

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ListLayout extends Vue {
}

</script>

<style lang="scss">
@import "src/assets/style/utils";

.list-layout {
	&__wrapper {
		@include flex-column;
	}
	&__header {
		height: 90px;
	}
	&__main {
		@include indent-inside('scroll');
		@include flex-main;
	}
}



//.my-panel {
//	height: 110px;
//}
//.my-scroll {
//	overflow: hidden;
//	overflow-y: scroll;
//	height: calc(100vh - 200px);
//}
</style>

