<template lang="pug">
	PageTemplate

		template(#left)
			AccountList(
				title="Банковские счета"
				@setActiveAccount="activeAccount=$event"
				hover
			)

		template(#right)
			OpEntryList(
				title="Операции по счету"
				:mode="TOpEntryListMode.FOR_ACCOUNT"
				:current="activeAccount"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TAccount } from '@/blogic/entities/Account';
import PageTemplate from '@/components/PageTemplate/PageTemplate.vue';
import AccountList from '@/components/AccountList/AccountList.vue';
import OpEntryList from '@/components/OpEntryList/OpEntryList.vue';
import { TOpEntryListMode } from '@/components/OpEntryList/types/OpEntryListTypes';

@Component({
	components: {
		OpEntryList,
		AccountList,
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
