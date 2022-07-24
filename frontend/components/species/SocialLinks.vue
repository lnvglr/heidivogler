<template>
  <ul
    class="col-span-2 flex flex-col text-xl font-medium"
    :style="{ '--total': routes.length }"
    v-if="routes.length > 0"
  >
    <li v-for="(item, i) in routes" :key="item.name" :style="{ '--i': i }">
      <hr v-if="item.spacer" class="border-none h-4" />
      <NuxtLink
        :to="item.path"
        target="_blank"
        v-else
        class="duration-75 hover:text-gold-600 whitespace-nowrap rounded-md"
        exactActiveClass="text-gold-500"
      >
        <FontAwesomeIcon :icon="item.icon" class="mr-3" fixed-width />
        <div>{{ cta ? item.cta : item.title }}</div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    links: {
      type: Array,
      default: () => ["instagram", "facebook", "email"],
    },
    cta: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    routes() {
      return [
        {
          name: "instagram",
          path: "https://www.instagram.com/heidivogler/",
          title: "Instagram",
          cta: "Folge mir auf Instagram",
          icon: ["fab", "instagram"],
          spacer: false,
        },
        {
          name: "facebook",
          path: "https://www.facebook.com/heidi.vogler",
          title: "Facebook",
          cta: "Folge mir auf Facebook",
          icon: ["fab", "facebook"],
          spacer: false,
        },
        {
          name: "email",
          path: "mailto:hallo@heidivogler.de",
          title: "Email",
          cta: "Schreib mir eine Email",
          icon: ["fas", "envelope"],
          spacer: false,
        },
      ].filter((e) => this.links.includes(e.name));
    },
  },
});
</script>
