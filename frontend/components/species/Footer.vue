<template>
  <footer class="text-stone-500 bg-stone-200 z-10 w-full p-12 py-24">
    <nav class="grid grid-cols-12 gap-6 md:gap-12 max-w-5xl mx-auto w-full">
      <div class="col-span-12 sm:col-span-6 lg:col-span-6 flex flex-col gap-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <NuxtLink to="/" class="" title="home" @click="scrollTop">
            <Icon v-if="Logo" :icon="Logo" class="w-full max-w-[160px]" />
          </NuxtLink>
          <ul>
            <li>Reittherapie</li>
            <li>Traumabearbeitung</li>
            <li>Waldbaden</li>
          </ul>
        </div>
      </div>
      <ul
        class="col-span-6 sm:col-span-3 lg:col-span-3 flex flex-col text-xl font-medium"
        :style="{ '--total': routes.length }"
      >
        <li v-for="(item, i) in routes" :key="item.name" :style="{ '--i': i }">
          <NuxtLink
            :to="item.path"
            v-if="!item.spacer"
            class="duration-75 hover:text-gold-600 whitespace-nowrap rounded-md"
            exactActiveClass="text-gold-500"
          >
            <Icon v-if="item.icon" :icon="item.icon" class="w-36" />
            <template v-else>{{ item.title }}</template>
          </NuxtLink>
          <hr v-else class="border-none h-4" />
        </li>
      </ul>
      <SocialLinks class="col-start-7 sm:col-start-10" />
    </nav>
    <span class="flex justify-center w-full pt-24 text-sm text-center">{{
      `Copyright © ${new Date().getFullYear()} Heidi Vogler. Alle Rechte vorbehalten.`
    }}</span>
  </footer>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import SocialLinks from "~/components/species/SocialLinks.vue";
import Icon from "~/components/molecules/Icon.vue";
import Logo from "~/assets/logo";
export default defineComponent({
  components: {
    Button,
    Icon,
    SocialLinks,
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
        name: "ueber-mich",
        path: "/ueber-mich",
        title: "Über Mich",
      },
      {
        name: "kontakt",
        path: "/kontakt",
        title: "Kontakt",
      },
      {
        spacer: true,
      },
      {
        name: "impressum",
        path: "/impressum",
        title: "Impressum",
      },
      {
        name: "datenschutz",
        path: "/datenschutz",
        title: "Datenschutz",
      },
    ];
    this.contactRoutes = [
      {
        name: "instagram",
        path: "https://www.instagram.com/heidi.vogler.33/",
        title: "Instagram",
        icon: ["fab", "instagram"],
      },
      {
        name: "angebote",
        path: "https://www.facebook.com/heidi.vogler.33",
        title: "Facebook",
        icon: ["fab", "facebook"],
      },
      {
        name: "email",
        path: "mailto:hallo@heidivogler.de",
        title: "Email",
        icon: ["fas", "at"],
      },
    ];
  },
  data() {
    return {
      Logo,
      routes: [],
      contactRoutes: [],
    };
  },
  methods: {
    scrollTop() {
      // scroll to top smooth
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    offset(i: number, array: number[]) {
      return Math.abs(i - Math.ceil((array.length - 1) / 2));
    },
  },
});
</script>

<style scoped></style>
