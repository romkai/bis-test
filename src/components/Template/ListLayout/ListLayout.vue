<template lang="pug">
	div
		div.my-panel
			slot(name="panel")
		div.my-scroll
			slot(name="default")

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ListLayout extends Vue {
}

</script>

<style lang="scss">
.my-panel {
	height: 110px;
}
.my-scroll {
	overflow: hidden;
	overflow-y: scroll;
	height: calc(100vh - 200px);
}
</style>

