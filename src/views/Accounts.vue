<template lang="pug">
	PageTemplate

		template(#left)
			AccountsList(
				title="Банковские счета"
				@onActiveAccount="activeAccount=$event"
			)

		template(#right)
			OpEntriesList(
				title="Операции по счету"
				:currentAccount="activeAccount"
				nonClickable
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TAccount } from '@/blogic/Entities/Account';
import PageTemplate from '@/components/Template/PageTemplate/PageTemplate.vue';
import AccountsList from '@/components/AccountsList/AccountsList.vue';
import OpEntriesList from '@/components/OpEntriesList/OpEntriesList.vue';

@Component({
	components: {
		OpEntriesList,
		AccountsList,
		PageTemplate,
	}
})
export default class Accounts extends Vue {
	activeAccount: TAccount|null = null;
}
</script>

<style lang="scss">
@import "../assets/style/utils";


</style>
