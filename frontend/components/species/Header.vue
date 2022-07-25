<template>
  <header
    class="z-50 overflow-hidden absolute w-screen"
    :class="{ open: menuOpen, 'text-primary-300': inverted && !menuOpen, 'text-stone-700': !inverted && !menuOpen, 'text-white': menuOpen}"
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
        :style="{ '--total': routes.length }"
      >
        <li
          v-for="(item, i) in routes"
          :key="item.name"
          :style="{ '--i': offset(i, routes), '--k': i }"
          :class="{
            'order-0 md:order-1': item.icon,
            'order-1': !item.icon,
          }"
        >
          <NuxtLink
            :to="item.path"
            class="duration-1000 whitespace-nowrap py-2 px-3 rounded-md"
            :exactActiveClass="
              inverted ? `${item.icon ? 'text-gold-400' : 'text-white'}` : 'text-gold-500'
            "
            :class="{
              'hover:text-gold-400': inverted,
              'hover:text-gold-600': !inverted,
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
    this.routes = [
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
    ];
  },
  data() {
    return {
      Logo,
      routes: [],
      menuOpen: false,
    };
  },
  methods: {
    offset(i: number, array: number[]) {
      return Math.abs(i - Math.ceil((array.length - 1) / 2));
    },
  },
  watch: {
  },
  computed: {
    inverted() {
      return (
        this.$route.meta.headerInverted &&
        this.$route.path.split("/")[2] !== "the-journey-eine-innere-reise-zu-dir-selbst"
      );
    },
  },
});
</script>

<style lang="scss" scoped>
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
