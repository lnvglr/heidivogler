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
import { StrapiUser } from "~/types";
import "@formkit/themes/genesis";

const app = useNuxtApp();
const strapi = {
  client: <T>(
    contentType: string,
    data?: Partial<T>,
    method: string = "POST"
  ) => useStrapiClient()(contentType, { method, body: data }) as Promise<T>,
  ...useStrapi(),
  ...useStrapiAuth(),
  ...useStrapiUser(),
  api: useRuntimeConfig().public.strapi,
  user: {} as StrapiUser,
};
strapi.user = (await strapi.fetchUser()).value as StrapiUser;
if (!app.$strapi) app.provide("strapi", reactive(strapi));
if (!app.$state)
  app.provide("state", reactive({ headerColor: null, map: null }));
</script>
