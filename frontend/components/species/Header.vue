<template>
  <header class="z-10">
    <nav
      class="text-stone-400 flex items-center justify-center px-10 text-lg font-medium h-36 bg-gradient-to-b"
      :class="inverted ? 'text-stone-50' : 'text-stone-700'"
    >
      <transition-group
        name="list"
        tag="ul"
        class="flex flex-row items-center gap-10"
        :style="{ '--total': routes.length }"
      >
        <li
          v-for="(item, i) in routes"
          :key="item.name"
          :style="{ '--i': offset(i, routes) }"
        >
          <NuxtLink
            :to="item.path"
            class="duration-1000 whitespace-nowrap py-2 px-3 rounded-md"
            :exactActiveClass="
              inverted
                ? `${item.icon ? 'text-gold-400' : 'text-white bg-black/20'}`
                : 'text-gold-500'
            "
            :class="
              inverted ? 'hover:text-gold-400' : 'hover:text-gold-600'
            "
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
import Icon from "~/components/molecules/Icon.vue";
import Logo from "~/assets/logo";
export default defineComponent({
  components: {
    Button,
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
    };
  },
  methods: {
    offset(i: number, array: number[]) {
      return Math.abs(i - Math.ceil((array.length - 1) / 2));
    },
  },
  computed: {
    inverted() {
      return this.$route.meta.headerInverted && this.$route.path.split('/')[2] !== 'the-journey-eine-innere-reise-zu-dir-selbst';
    },
  }
});
</script>

<style scoped></style>
