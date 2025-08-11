<template>
  <Transition name="page">
    <div
      v-if="show"
      class="absolute left-0 -top-36 w-full h-[300vh] overflow-hidden pointer-events-none"
    >
      <div
        v-for="(circle, i) in circles"
        :key="i"
        class="absolute rounded-full border border-gold-500 duration-1000"
        :style="{
          width: circle.size + '%',
          paddingBottom: circle.size + '%',
          top: circle.top + '%',
          right: circle.right + '%',
          left: circle.left + '%',
          transform: circle.transform,
        }"
      ></div>
    </div>
  </Transition>
</template>

<script lang="ts">
interface Circle {
  size?: number;
  top?: number;
  left?: number;
  right?: number;
  transform?: string;
}
export default defineComponent({
  mounted() {
    window.addEventListener("mousemove", this.onMouseMove);
    setTimeout(() => (this.show = true), 500);
    this.rafId = requestAnimationFrame(this.animateCircles);
  },
  unmounted() {
    window.removeEventListener("mousemove", this.onMouseMove);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  },
  methods: {
    onMouseMove(e: MouseEvent) {
      this.pointer = {
        x: Math.abs(e.clientX / window.innerWidth) - 0.5,
        y: Math.abs(e.clientY / window.innerHeight) - 0.5,
      };
    },
    randomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    animateCircles() {
      this.rafId = requestAnimationFrame(this.animateCircles);

      const newCircles = this.circles.map((circle, i) => {
        const sizeVariation = () =>
          (Math.sin(Date.now() / this.sizeVariation + i) * (i % 2 ? -5 : 5)) /
            20 +
          1;
        const hoverVariation = (pointer: number) =>
          Math.sin(Date.now() / this.hoverVariation + i) * (i % 2 ? -3 : 3) +
          pointer * (i % 2 ? 50 : -50);
        const transform = `translate(${hoverVariation(
          this.pointer.x
        )}%, ${hoverVariation(this.pointer.y) + window.scrollY / 20}%) scale(${sizeVariation()})`;

        return {
          ...circle,
          transform,
        };
      });
      this.circles = newCircles;
    },
  },
  data() {
    return {
      show: false,
      rafId: null as number | null,
      pointer: {
        x: 0,
        y: 0,
      },
      sizeVariation: this.randomNumber(7000, 10000),
      hoverVariation: this.randomNumber(1000, 2000),
      circles: [
        {
          size: 16,
          top: 0,
          left: -2,
        },
        {
          size: 40,
          top: 30,
          right: -10,
        },
        {
          size: 20,
          top: 70,
          left: 10,
        },
      ] as Circle[],
    };
  },
});
</script>
