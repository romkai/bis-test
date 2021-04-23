<template lang="pug">
	PageTemplate(
		:title="['Операции по счетам', 'Проводки по счету']"
	)
		template(#left)
			OpEntryList(
				:mode="TOpEntryListMode.ALL"
				@setActiveOpEntry="activeOpEntry=$event"
			)

		template(#right)
			OpEntryInfo(
				v-if="!!activeOpEntry"
				:opEntry="activeOpEntry"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/entities/OpEntry';
import PageTemplate from '@/components/PageTemplate/PageTemplate.vue';
import OpEntryInfo from '@/components/OpEntryInfo/OpEntryInfo.vue';
import OpEntryList from '@/components/OpEntryList/OpEntryList.vue';
import { TOpEntryListMode } from '@/components/OpEntryList/types/OpEntryListTypes';

@Component({
	components: {
		OpEntryList,
		OpEntryInfo,
		PageTemplate,
	},
})
export default class OpEntries extends Vue {
	activeOpEntry: TOpEntry|null = null;
	TOpEntryListMode = TOpEntryListMode;
}
</script>
