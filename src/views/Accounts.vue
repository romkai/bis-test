<template lang="pug">
	PageTemplate

		template(#left)
			AccountsList(
				title="Банковские счета"
				permissions="CRUD"
				@onActiveAccount="activeAccount=$event"
			)

		template(#right)
			OpEntriesList(
				title="Операции по счету"
				:mode="TOpEntryListMode.FOR_ACCOUNT"
				:current="activeAccount"
				permissions="CRUD"
				nonClickable
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TAccount } from '@/blogic/entities/Account';
import PageTemplate from '@/components/PageTemplate/PageTemplate.vue';
import AccountsList from '@/components/AccountsList/AccountsList.vue';
import OpEntriesList from '@/components/OpEntriesList/OpEntriesList.vue';
import { TOpEntryListMode } from '@/components/OpEntriesList/types/OpEntryListTypes';

@Component({
	components: {
		OpEntriesList,
		AccountsList,
		PageTemplate,
	}
})
export default class Accounts extends Vue {
	activeAccount: TAccount|null = null;
	TOpEntryListMode = TOpEntryListMode
}
</script>

<style lang="scss">
@import "../assets/style/utils";


</style>
