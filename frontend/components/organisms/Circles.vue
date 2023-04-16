<template>
  <Transition name="page">
    <div
      v-if="show"
      class="absolute left-0 -top-36 w-full h-[200vh] overflow-hidden pointer-events-none"
    >
      <div
        v-for="(circle, i) in circles"
        :key="i"
        class="absolute rounded-full border border-gold-500"
        :style="{
          width: circle.size + '%',
          paddingBottom: circle.size + '%',
          top: circle.top + '%',
          right: circle.right + '%',
          left: circle.left + '%',
          transform: circle.hoverTransform,
          transition: circle.hoverTransition,
        }"
      ></div>
    </div>
  </Transition>
</template>

<script lang="ts">
interface Circle {
  index: number;
  baseSize: number;
  baseTop: number;
  baseLeft: number;
  baseRight?: number;
  size?: number;
  top?: number;
  left?: number;
  right?: number;
  hoverTransform?: string;
  hoverTransition?: string;
}
export default defineComponent({
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
    setInterval(this.updateCircles, 10);
    setTimeout(() => {
      this.show = true;
    }, 500);
  },
  methods: {
    onMouseMove(e: MouseEvent) {
      this.pointer = {
        x: Math.abs(e.clientX / window.innerWidth),
        y: Math.abs(e.clientY / window.innerHeight),
      };
    },
    updateCircles() {
      const newCircles = this.circles.map((circle, i) => {
        const sizeVariation = Math.sin(Date.now() / 2000 + circle.index);
        const hoverVariation = () => Math.sin(Date.now() / 1000 + circle.index) * (i % 2 ? -1 : 1);
        const size = circle.baseSize + sizeVariation;
        const transform = `translateX(${hoverVariation() + (this.pointer.x - 0.5) * 10}%) translateY(${hoverVariation() + (this.pointer.x - 0.5) * 10}%) scale(${1 + hoverVariation() / 20})`;
        const transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
        return {
          ...circle,
          size,
          hoverTransform: transform,
          hoverTransition: transition,
        };
      });
      this.circles = newCircles;
    },
  },
  data() {
    return {
      show: false,
      pointer: {
        x: 0,
        y: 0,
      },
      circles: [
        {
          index: 0,
          baseSize: 16,
          top: 0,
          left: -2,
        },
        {
          index: 1,
          baseSize: 40,
          top: 30,
          right: -10,
        },
        {
          index: 2,
          baseSize: 20,
          top: 70,
          left: 10,
        },
      ] as Circle[],
    };
  },
});
</script>
