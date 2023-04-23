<template>
  <Html :lang="$i18n.locale">
    <Head>
      <Title>Heidi Vogler</Title>
    </Head>
    <Body class="antialiased text-neutral-800 bg-stone-100 text-lg">
      <div class="flex flex-col min-h-screen">
        <Header class="w-full" />
        <NuxtLayout>
          <SeoKit />
          <OgImageStatic />
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
if (!app.$strapi) app.provide("state", useAppState());

useSchemaOrg([
  defineLocalBusiness({
    name: 'Heidi Vogler',
    telephone: '+49 (0) 1763 - 1763 624',
    priceRange: '€€',
    address: {
      streetAddress: 'Gailhöfe 6',
      addressLocality: 'Frickingen',
      postalCode: '88699',
      addressCountry: 'DE',
    },
    image: 'https://heidivogler.s3.eu-central-1.amazonaws.com/IMG_4749_de493186a9.jpg',
  }),
  defineWebSite({
    url: useRuntimeConfig().public.siteUrl,
    name: 'Heidi Vogler'
  }),
  defineWebPage(),
])

</script>
