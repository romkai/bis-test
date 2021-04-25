<template lang="pug">
	PageTemplate

		template(#left)
			OpEntriesList(
				title="Список операций"
				@onActiveOpEntry="activeOpEntry=$event"
			)

		template(#right)
			OpEntryInfo(
				title="Проводки по операции"
				:opEntry="activeOpEntry"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpEntry } from '@/blogic/Entities/OpEntry';
import PageTemplate from '@/components/Template/PageTemplate/PageTemplate.vue';
import OpEntryInfo from '@/components/OpEntryInfo/OpEntryInfo.vue';
import OpEntriesList from '@/components/OpEntriesList/OpEntriesList.vue';

@Component({
	components: {
		OpEntriesList,
		OpEntryInfo,
		PageTemplate,
	},
})
export default class OpEntries extends Vue {
	activeOpEntry: TOpEntry|null = null;
}
</script>
