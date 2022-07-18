<template>
  <Html>
    <Head>
      <Title>Heidi Vogler</Title>
    </Head>
    <Body class="antialiased text-neutral-800 bg-stone-100 text-lg">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
<script lang="ts">
import { StrapiUser } from "~/types";
import "@formkit/themes/genesis";

export default defineComponent({
  async setup() {
    const app = useNuxtApp();
    const strapi = {
      client: <T>(contentType: string, data?: Partial<T>, method: string = "POST") =>
        useStrapiClient()(contentType, { method, body: data }) as Promise<T>,
      ...useStrapi4(),
      ...useStrapiAuth(),
      ...useStrapiUser(),
      api: useRuntimeConfig().public.strapi,
      user: {} as StrapiUser,
    };
    strapi.user = (await strapi.fetchUser()).value as StrapiUser;
    if (!app.$strapi) app.provide("strapi", reactive(strapi));
    if (!app.$state) app.provide("state", reactive({}));
    definePageMeta({
      pageTransition: {
        name: "page",
      },
      layoutTransition: {
        name: "page",
      },
    });
  },
});
</script>
