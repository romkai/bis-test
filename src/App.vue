<template lang="pug">
	#app
		NavBar
		main
			router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import NavBar from '@/components/Layout/NavBar.vue';

@Component({
	components: {
		NavBar,
	}
})
export default class App extends Vue {
}
</script>

<style lang="scss">
main {
	margin-top: 56px;
}
</style>
