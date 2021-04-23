<template lang="pug">
	PageTemplate(
		:title="['Банковские счета', 'Операции по счету']"
	)
		template(#left)
			AccountList(
				@setActiveAccount="activeAccount=$event"
			)

		template(#right)
			OpEntryList(
				:mode="mode"
				:currentAccount="activeAccount"
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
	mode = TOpEntryListMode.FOR_ACCOUNT;
}
</script>

<style lang="scss">
@import "../../assets/style/utils";


</style>
