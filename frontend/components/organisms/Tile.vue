<template>
  <div
    class="tile bg-white p-5 md:p-12 rounded-2xl flex flex-col items-start justify-between gap-12 min-w-[160px] min-h-[160px]"
    :class="{
      'cursor-pointer hover:scale-[0.99] hover:bg-stone-50 duration-75':
        !!description,
      [icon]: icon,
    }"
    @click="open = !open && !!description"
    v-bind="$attrs"
  >
    <FontAwesomeIcon
      v-if="icon"
      :icon="['fas', icon]"
      class="text-primary-500 text-4xl leading-none"
    />
    <h3 class="text-xl md:text-2xl font-bold text-stone-500 leading-snug">
      {{ title }}
    </h3>
  </div>
  <Transition name="page" style="--total: 1; --i: 1">
    <div
      v-if="open"
      class="fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-black/60 z-50"
      @click.self="open = !open"
    >
      <div
        class="bg-white rounded-2xl p-5 m-3 sm:p-12 shadow-2xl max-w-2xl max-h-[90vh] overflow-auto"
      >
        <h3
          class="text-2xl md:text-3xl gap-12 -top-8 -mt-8 pt-8 sm:-top-12 sm:-mt-12 sm:pt-12 pb-6 font-bold flex justify-between sticky bg-white"
        >
          {{ title
          }}<button
            class="font-normal text-4xl md:text-6xl h-12 w-12 min-w-[48px] md:h-16 md:w-16 md:min-w-[48px] items-center justify-center -m-3 md:-m-5 text-stone-400 hover:text-primary-500 rounded-xl"
            @click="open = !open"
          >
            &times;
          </button>
        </h3>
        <p class="markdown" v-html="content" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    content() {
      return useMarkdown(this.description);
    },
  },
});
</script>
<style lang="scss">
svg {
  .certificate &,
  .road-barrier & {
    color: var(--color-alert-500);
  }
  .scale-balanced,
  .briefcase &,
  .bolt-lightning &,
  .couch & {
    color: var(--color-gold-400);
  }
  .tree &, .leaf & {
    color: var(--color-success-400);
  }
  .wind &,
  .kite &,
  .circle-nodes &, .spa & {
    color: var(--color-info-300);
  }
  .person-hiking &,
  .person-walking-arrow-right &,
  .people-group &,
  .eye-low-vision &, .chess-knight & {
    color: var(--color-stone-400);
  }
}
</style>
