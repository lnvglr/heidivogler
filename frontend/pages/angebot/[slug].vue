<template>
	<div v-if="offer">
    <div class="h-[80vh] min-h-[720px] relative overflow-hidden -mt-36">
			<ScrollParallax speed="0.2">
				<Image
					:media="offer.attributes.hero?.image.data.attributes"
					class="h-full -z-10"
					width="full"
					aspectRatio="16/10"
				/>
			</ScrollParallax>
    </div>
		<div class="py-24">
			<div class="relative bg-white rounded-2xl p-12 md:p-24 max-w-5xl mx-auto -mt-64 z-40 flex flex-col gap-5 items-start">
				<h1 class="text-2xl font-bold text-stone-400">{{ offer.attributes.title }}</h1>
				<h1 class="text-5xl font-bold mb-2">{{ offer.attributes.hero?.copy }}</h1>
				<h1 class="text-3xl font-medium">{{ offer.attributes.hero?.subCopy }}</h1>
			</div>
			<ContentCollection :content="content" :page="offer" />
		</div>
	</div>
</template>

<script lang="ts">
import ContentCollection from '~/components/species/ContentCollection.vue'
import Image from '~/components/molecules/Image.vue'
import Event from "~/components/cells/Event.vue";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";

export default defineComponent({
	components: {
		ScrollParallax,
		ContentCollection,
		Image,
		Event
	},
	data() {
		return {
			offer: null
		}
	},
	mounted() {
		this.$strapi.find('offers', {populate: ['content', 'hero'], filters: { slug: this.$route.params.slug } })
			.then(({data}) => {
				this.offer = data[0]
				this.$state.headerColor = this.offer.attributes.headerColor
			})
	},
	unmounted() {
		this.$state.headerColor = null
	},
	computed: {
		content() {
			return this.offer?.attributes.content
		}
	}
})
</script>

<style scoped>

</style>