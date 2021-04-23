<template lang="pug">
	PageTemplate

		template(#left)
			OpDatesList(
				title="Операционные дни"
				@setActiveOpDate="activeOpDate=$event"
				hover
			)

		template(#right)
			OpEntryList(
				title="Операции в опер.день"
				:mode="TOpEntryListMode.FOR_DATE"
				:current="activeOpDate"
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import PageTemplate from '@/components/PageTemplate/PageTemplate.vue';
import OpDatesList from '@/components/OpDatesList/OpDatesList.vue';
import { TOpEntryListMode } from '@/components/OpEntryList/types/OpEntryListTypes';
import OpEntryList from '@/components/OpEntryList/OpEntryList.vue';

@Component({
	components: { OpEntryList, OpDatesList, PageTemplate },
})
export default class OpDates extends Vue {
	activeOpDate: TOpDate|null = null;
	TOpEntryListMode = TOpEntryListMode;
}
</script>
