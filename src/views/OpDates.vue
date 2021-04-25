<template lang="pug">
	PageTemplate

		template(#left)
			OpDatesList(
				title="Операционные дни"
				@onActiveOpDate="activeOpDate=$event"
			)

		template(#right)
			OpEntriesList(
				:title="operationsTitle"
				:currentOpDate="activeOpDate"
				nonClickable
				noDateCol
			)

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { TOpDate } from '@/blogic/Entities/OpDate';
import PageTemplate from '@/components/Template/PageTemplate/PageTemplate.vue';
import OpDatesList from '@/components/OpDatesList/OpDatesList.vue';
import OpEntriesList from '@/components/OpEntriesList/OpEntriesList.vue';

@Component({
	components: { OpEntriesList, OpDatesList, PageTemplate },
})
export default class OpDates extends Vue {
	activeOpDate: TOpDate|null = null;

	get operationsTitle(): string {
		return `Операции ${this.activeOpDate ? this.activeOpDate.OpDate : ''}`;
	}
}
</script>
