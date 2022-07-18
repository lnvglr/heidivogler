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
			<div class="max-w-2xl mx-auto"><h1 class="text-3xl font-bold">{{ offer.attributes.title }}</h1></div>
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