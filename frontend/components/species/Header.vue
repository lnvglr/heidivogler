<template>
  <header
    class="z-50 overflow-hidden absolute w-screen"
    :class="{
      open: menuOpen,
      'text-white': headerColor === 'light' || menuOpen,
      'text-gold-300': headerColor === 'default' && !menuOpen,
      'text-stone-700': (!headerColor || headerColor === 'dark') && !menuOpen,
      loaded
    }"
    style="backdropfilter: blur(var(--header-blur, 0px))"
  >
    <BurgerIcon
      :active="menuOpen"
      @click="menuOpen = !menuOpen"
      class="absolute cursor-pointer right-12 top-12 z-50 md:hidden"
    />
    <nav
      class="flex items-center justify-center px-10 text-2xl font-medium h-36 bg-gradient-to-b"
    >
      <transition-group
        name="list"
        tag="ul"
        class="flex flex-col md:flex-row items-center gap-x-8 lg:gap-x-12 gap-y-[4vh]"
        :style="{
          '--total': routes.length,
          '--line-width': `${lineWidth}px`,
          '--line-offset': `${lineOffset}px`,
        }"
      >
        <li
          v-for="(item, i) in routes"
          :key="item.name"
          :style="{ '--i': offset(i, routes), '--k': i }"
          :class="{
            'order-0 md:order-1': item.icon,
            'order-1': !item.icon,
            'mx-3': true,
          }"
          :ref="!item.icon && item.path"
        >
          <!-- @mouseover="(e) => setLine(!item.icon && e)"
          @mouseleave="() => setLine(false)" -->
          <NuxtLink
            :to="item.path"
            class="duration-500 whitespace-nowrap py-2 rounded-md"
            :exactActiveClass="
              headerColor === 'light'
                ? 'text-white'
                : headerColor === 'default'
                ? 'text-gold-400'
                : 'text-stone-600'
            "
            :title="item.title || item.name"
            :class="{
              'hover:text-white': headerColor === 'light',
              'hover:text-gold-400': headerColor === 'default',
              'hover:text-stone-600': !headerColor || headerColor === 'dark',
            }"
            @click="menuOpen = false"
          >
            <Icon v-if="item.icon" :icon="item.icon" class="w-36" />
            <template v-else>{{ item.title }}</template>
          </NuxtLink>
        </li>
      </transition-group>
    </nav>
  </header>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import BurgerIcon from "~/components/molecules/BurgerIcon.vue";
import Icon from "~/components/molecules/Icon.vue";
import Logo from "~/assets/logo";
export default defineComponent({
  components: {
    Button,
    BurgerIcon,
    Icon,
  },
  mounted() {
    this.$nextTick(() => {
      this.setLine(false);
      setTimeout(() => {
        this.loaded = true;
      }, 300);
    });
  },
  data() {
    return {
      Logo,
      routes: [
        {
          name: "termine",
          path: "/termine",
          title: "Termine",
        },
        {
          name: "angebote",
          path: "/angebote",
          title: "Angebote",
        },
        {
          name: "home",
          path: "/",
          icon: `${Logo}`,
        },
        {
          name: "ueber-mich",
          path: "/ueber-mich",
          title: "Über Mich",
        },
        {
          name: "kontakt",
          path: "/kontakt",
          title: "Kontakt",
        },
      ],
      menuOpen: false,
      lineWidth: 0,
      lineOffset: 0,
      loaded: false
    };
  },
  methods: {
    offset(i: number, array: number[]) {
      return Math.abs(i - Math.ceil((array.length - 1) / 2));
    },
    setLine(e: MouseEvent | false) {
      console.log(this.$route)
      const target = e ? e.target as HTMLElement : this.$refs[this.$route.path]?.[0];
      console.log(target)
      if (!target) {
        this.lineWidth = 0;
        return
      }
      const rect = target.getBoundingClientRect();
      this.lineWidth = rect.width;
      this.lineOffset = target.offsetLeft + rect.width / 2;
    },
  },
  watch: {
    $route() {
      this.setLine(false);
    },
  },
  computed: {
    headerColor() {
      return this.$route.meta.headerColor;
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  nav:deep(ul) {
    position: relative;
    &:after {
      background-color: currentColor;
      content: "";
      position: absolute;
      bottom: 0;
      left: var(--line-offset, 0);
      width: var(--line-width, 0);
      transform: translateX(-50%);
      height: 2px;
      z-index: 1;
      transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition-property: width, left, opacity;
      opacity: 0;
    }
  }
}

.loaded nav:deep(ul):after {
  opacity: 0.75;
}
@media (max-width: 767px) {
  header {
    nav {
      background-color: #00000000;
      backdrop-filter: blur(0px);
      transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
      align-items: flex-start;
      padding-top: var(--p-6);
      transition-delay: 250ms;
      padding-top: 10px;
      ul {
        li:not(.order-0) {
          display: block;
          opacity: 0;
          transform: scale(0.9);
          transition: 1000ms ease;
          transition-property: opacity, transform;
          transition-delay: 0;
        }
      }
    }
    &.open {
      color: white;
      position: fixed !important;
      nav {
        backdrop-filter: blur(20px);
        background-color: #00000080;
        height: 100vh !important;
        padding-top: calc(25vh - 50px);
        transition-delay: 0ms;
        ul {
          li:not(.order-0) {
            transform: scale(1);
            transition-delay: calc(var(--k) * 150ms + 150ms);
            transition-property: opacity, transform;
            opacity: 1;
            /* height: initial; */
          }
        }
      }
    }
  }
}
</style>
