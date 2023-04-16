<template>
  <Html :lang="$i18n.locale">
    <Head>
      <Title>Heidi Vogler</Title>
    </Head>
    <Body class="antialiased text-neutral-800 bg-stone-100 text-lg">
      <div class="flex flex-col min-h-screen">
        <Header class="w-full" />
        <NuxtLayout>
          <NuxtPage :nuxt-child-key="$route.path" keep-alive />
        </NuxtLayout>
      </div>
      <Footer class="w-full" />
    </Body>
  </Html>
</template>
<script lang="ts" setup>
import Header from "~/components/species/Header.vue";
import Footer from "~/components/species/Footer.vue";
import { Strapi } from "~/types";
import "@formkit/themes/genesis";

const app = useNuxtApp();
const strapi: Strapi = {
  ...useStrapi(),
  client: (
    contentType,
    data,
    method = "POST"
  ) => useStrapiClient()(contentType, { method, body: data }),
  api: useRuntimeConfig().public.strapi,
};

if (!app.$strapi) app.provide("strapi", strapi);
if (!app.$state)
  app.provide("state", reactive({ headerColor: null, map: null }));
</script>
