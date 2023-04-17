<template>
  <div
    class="relative duration-500 ease-in-out"
    ref="container"
    :style="`height: ${containerHeight}`"
  >
    <transition-group
      :name="transitionName"
      @before-enter="adjustHeight"
      @before-leave="adjustHeight"
    >
      <slot />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
const { transitionName = 'fade' } = defineProps<{
  transitionName: string;
}>();
const container = ref(null as HTMLElement | null)
const containerHeight = ref<string | null>(null);

const adjustHeight = () => {
  setTimeout(() => {
    if (!container.value?.children) return;
    let children = [];
    for (let item of container.value?.children) {
      if (!item.classList.contains(`${transitionName}-leave-active`))
        children.push(item);
    }
    const height = [...children].reduce((acc, curr) => acc + curr.clientHeight, 0);
    containerHeight.value = `${height}px`;
  }, 0);
};

onMounted(() => {
  adjustHeight();
  window.addEventListener('resize', adjustHeight);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustHeight);
})
</script>