<template lang="pug">
	PageTemplate

		template(#left)
			OpDatesList(
				title="Операционные дни"
				permissions="CRUD"
				@onActiveOpDate="activeOpDate=$event"
			)

		template(#right)
			OpEntriesList(
				title="Операции"
				:mode="TOpEntryListMode.FOR_DATE"
				:current="activeOpDate"
				permissions="CRUD"
				nonClickable
				noDateCol
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/entities/OpDate';
import PageTemplate from '@/components/PageTemplate/PageTemplate.vue';
import OpDatesList from '@/components/OpDatesList/OpDatesList.vue';
import { TOpEntryListMode } from '@/components/OpEntriesList/types/OpEntryListTypes';
import OpEntriesList from '@/components/OpEntriesList/OpEntriesList.vue';

@Component({
	components: { OpEntriesList, OpDatesList, PageTemplate },
})
export default class OpDates extends Vue {
	activeOpDate: TOpDate|null = null;
	TOpEntryListMode = TOpEntryListMode;
}
</script>
