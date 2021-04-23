<template lang="pug">
	b-navbar(
		type="dark"
		variant="info"
		fixed="top"
	)
		b-avatar.mr-2(
			variant="light"
			size="1.8rem"
			icon="command"
		)

		b-navbar-brand(href="/") Test Application

		b-navbar-toggle(target="nav-collapse")

		b-collapse(
			id="nav-collapse"
			is-nav
		)
			b-navbar-nav
				b-nav-item(
					v-for="link in links"
					:key="link.id"
					:to="link.to"
					:active="$route.name === link.to"
				) {{ link.text }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
	links = [
		{ id: 1, to: 'accounts', text: 'Счета' },
		{ id: 2, to: 'op-dates', text: 'Операционные дни' },
		{ id: 3, to: 'op-entries', text: 'Операции' },
	]
}
</script>

<style lang="scss">

</style>
