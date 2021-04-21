<template lang="pug">
	.page-template__container
		.page-template__wrapper
			.page-template__column
				.page-template__column-header
					.page-template__header-title
						h5.mb-0 {{ title[0] }}
					.page-template__header-action(v-if="$scopedSlots['headerLeft']")
						slot(name="headerLeft")

				.page-template__column-main
					.page-template__main-top(v-if="$scopedSlots['mainTopLeft']")
						slot(name="mainTopLeft")

					.page-template__content(
						:class="{ 'transition': animatingLeft }"
					)
						.scroll-area(
							ref="scrollAreaLeft"
							@scroll=""
						)
							slot(
								name="defaultLeft"
								:pagedItemsLeft="[]"
							)

				.page-template__column-footer

			.page-template__column
				.page-template__column-header
					.page-template__header-title
						h5.mb-0 {{ title[1] }}
					.page-template__header-action(v-if="$scopedSlots['headerRight']")
						slot(name="headerRight")

				.page-template__column-main
					.page-template__main-top(v-if="$scopedSlots['mainTopRight']")
						slot(name="mainTopRight")

					.page-template__content(
						:class="{ 'transition': animatingRight }"
					)
						.scroll-area(
							ref="scrollAreaRight"
							@scroll=""
						)
							slot(
								name="defaultRight"
								:pagedItemsRight="[]"
							)

				.page-template__column-footer


</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageTemplate extends Vue {
	@Prop({ type: Array, required: true }) title!: [];

	animatingLeft = false;
	animatingRight = false;

	// showTransition() {
	// 	this.animating = true;
	// 	setTimeout(() => {
	// 		this.animating = false;
	// 	}, 100);
	// }
	//
	// @Ref('scrollArea')
	// scrollArea: HTMLElement | undefined = undefined;
	//
	// scrollTop() {
	// 	if (!this.scrollArea) return;
	// 	(this.scrollArea as any).scrollTop = 0;
	// }
	//
	// onScrollLeft = throttle(this.rawOnScroll, 300);
	//
	// rawOnScroll(event: any) {
	// 	this.btnTop = event.target.scrollTop > 100;
	// }

}
</script>

<style lang="scss">
@import "src/assets/style/utils.scss";

.page-template__container {
	height: calc(100vh - 56px);

	.page-template__wrapper {
		@include flex-inline;

		.page-template__column {
			@include flex-column;
			flex: 1 1 50%;
			max-width: 50%;

			.page-template__column-header {
				margin: 0 8px;
				display: flex;

				.page-template__header-title {
					@include indent-inside;
					display: flex;
					align-items: center;
					height: 80px;
				}

				.page-template__header-action {
					@include indent-inside;
					display: flex;
					align-items: center;
					height: 80px;
					margin-left: auto;
				}
			}

			.page-template__column-main {
				@include indent-outside;
				flex: 1 1 auto;
				@include flex-column;
				border: 1px solid $border-color;
				border-radius: 4px 4px 0 0;

				.page-template__main-top {
					@include indent-inside;
					border-bottom: 1px solid $border-color;
					background-color: #f4fbf6;
					padding-top: 8px;
					padding-bottom: 8px;
				}

				.page-template__content {
					@include indent-inside('scroll');
					@include flex-main;
					opacity: 1;
					transition: all 100ms;

					&.transition {
						transition: all 0ms;
						opacity: 0;
					}
				}
			}

			.page-template__column-footer {
				@include indent-outside;
				@include indent-inside;
				min-height: 50px;
				border-left: 1px solid $border-color;
				border-right: 1px solid $border-color;
			}
		}
	}
}
</style>
