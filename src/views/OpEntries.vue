<template lang="pug">
	PageTemplate

		template(#left)
			OpEntryList(
				@setActiveOpEntry="activeOpEntry=$event"
				hover
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

@Component({
	components: {
		OpEntryList,
		OpEntryInfo,
		PageTemplate,
	},
})
export default class OpEntries extends Vue {
	activeOpEntry: TOpEntry|null = null;
}
</script>
