<template>
	<div v-if="offer">
    <div class="h-[60vh] md:h-[80vh] md:min-h-[720px] relative overflow-hidden -mt-36">
			<ScrollParallax speed="0.2">
				<Image
					:media="offer.attributes.hero?.image.data.attributes"
					class="h-full -z-10 translate-y-0 lg:-translate-y-[20%]"
					width="full"
					aspectRatio="16/12"
				/>
			</ScrollParallax>
    </div>
		<div class="pt-24">
			<div class="relative bg-white md:rounded-2xl px-5 py-10 md:px-12 lg:px-24 md:py-24 max-w-5xl md:mx-12 lg:mx-auto -mt-64 z-40 flex flex-col gap-5 items-start">
				<h1 class="text-xl md:text-2xl font-bold text-stone-400">{{ offer.attributes.title }}</h1>
				<h2 class="text-3xl md:text-5xl font-bold">{{ offer.attributes.hero?.copy }}</h2>
				<h3 class="text-xl md:text-3xl font-medium mt-2" v-if="offer.attributes.hero?.subCopy">{{ offer.attributes.hero?.subCopy }}</h3>
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