<template lang="pug">
	#app
		Navbar
		main
			router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Components
import Navbar from '@/components/layout/Navbar.vue';

@Component({
	components: {
		Navbar,
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
