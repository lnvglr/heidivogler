<template>
	<section class="bg-stone-200 py-24 px-6" v-if="data">
	<div class="flex gap-12 max-w-2xl mx-auto items-center">

    <div class="min-w-fit" v-if="data.image.data">
      <Image
        class="rounded-full w-48 h-48"
        :media="data.image.data.attributes"
        width="160"
      />
    </div>
		<div class="flex flex-col items-start gap-6">
			<p class="text-2xl" v-html="content"/>
			<Button :to="'ueber-mich'">Mehr erfahren</Button>
		</div>
		</div>
	</section>
</template>

<script lang="ts">
import Image from "~/components/molecules/Image.vue";
import Button from '~/components/molecules/Button.vue'

export default defineComponent({
	components: {
		Image,
		Button
	},
	props: {
		data: {
			type: Object,
		}
	},
	computed: {
		content() {
			if (!this.data?.text) return
			return useMarkdown(this.data.text)
		}
	},
})
</script>
<style lang="scss">
blockquote {
	em, i {
		font-style: inherit;
		color: var(--color-success-500)
	}

}
</style>