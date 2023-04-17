<template>
	<section class="bg-stone-200 py-24 px-6" v-if="data">
	<div class="flex flex-col sm:flex-row gap-y-6 gap-x-12 max-w-2xl mx-auto sm:items-center">

    <div class="min-w-fit" v-if="data.image.data">
      <Image
        class="rounded-full w-24 h-24 sm:w-48 sm:h-48"
        :media="data.image.data.attributes"
        width="160"
      />
    </div>
		<div class="flex flex-col items-start gap-6">
			<div class="text-xl sm:text-2xl" v-html="useMarkdown(data.text)" />
			<Button :to="'ueber-mich'" :title="$t('learn.more')">{{$t('learn.more')}}</Button>
		</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import Image from "~/components/molecules/Image.vue";
import Button from '~/components/molecules/Button.vue'
import { Strapi4ResponseSingle, StrapiMedia } from "~/types";

const { data } = defineProps<{
	data: {
		text: string;
		image: Strapi4ResponseSingle<StrapiMedia>;
	}
}>();
</script>