<template>
	<div v-if="offer">
    <div class="h-[80vh] min-h-[720px] relative">
      <Image
        :media="offer.attributes.hero?.image.data.attributes"
        class="h-full -mt-36 -z-10"
        width="full"
        aspectRatio="16/10"
      />
    </div>
		<div class="py-24">
			<div class="relative bg-white rounded-lg p-12 md:p-24 max-w-5xl mx-auto -mt-48 z-50 flex flex-col gap-5 items-start">
				<h1 class="text-2xl font-bold text-stone-400">{{ offer.attributes.title }}</h1>
				<h1 class="text-5xl font-bold mb-2">{{ offer.attributes.hero?.copy }}</h1>
				<h1 class="text-3xl">{{ offer.attributes.hero?.subCopy }}</h1>
			</div>
			<ContentCollection :content="content" :page="offer" />
		</div>
	</div>
</template>

<script lang="ts">
import ContentCollection from '~/components/species/ContentCollection.vue'
import Image from '~/components/molecules/Image.vue'
import Event from "~/components/cells/Event.vue";

export default defineComponent({
	components: {
		ContentCollection,
		Image,
		Event
	},
	setup() {
    definePageMeta({
      headerInverted: true
    })
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
			})
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