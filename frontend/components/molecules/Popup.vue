<template>
  <Transition name="page" style="--total: 1; --i: 1">
    <div
      v-if="open"
      class="fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-black/60 z-50"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-2xl p-5 m-3 sm:p-12 shadow-2xl w-[720px] max-w-2xl max-h-[90vh] overflow-auto"
      >
        <div class='z-10 relative'><slot name="pretitle"></slot></div>
        <h3
          class="text-2xl md:text-3xl gap-12 -top-8 -mt-8 pt-8 sm:-top-12 sm:-mt-12 sm:pt-12 pb-6 font-bold flex justify-between sticky bg-white"
        >
          {{ title
          }}<button
            class="font-normal text-4xl md:text-6xl h-12 w-12 min-w-[48px] md:h-16 md:w-16 md:min-w-[48px] items-center justify-center -m-3 md:-m-5 text-stone-400 hover:text-primary-500 rounded-xl"
            @click="$emit('close')"
          >
            &times;
          </button>
        </h3>
        <p class="markdown" v-html="content" v-if="content" />
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
