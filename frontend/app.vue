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
  <!-- <CookieControl locale="de" /> -->
</template>
<script lang="ts" setup>
import Header from "~/components/species/Header.vue";
import Footer from "~/components/species/Footer.vue";
import { Strapi } from "~/types";
import "@formkit/themes/genesis";

const app = useNuxtApp();
const strapi: Strapi = {
  ...useStrapi(),
  client: (contentType, data, method = "POST") =>
    useStrapiClient()(contentType, { method, body: data }),
  api: useRuntimeConfig().public.strapi,
};

// only provide once
if (!(app as any).$strapi) app.provide("strapi", strapi);
if (!(app as any).$state) app.provide("state", useAppState());

useSchemaOrg([
  defineLocalBusiness({
    name: "Heidi Vogler",
    telephone: "+49 (0) 1763 - 1763 624",
    priceRange: "€€",
    address: {
      streetAddress: "Gailhöfe 6",
      addressLocality: "Frickingen",
      postalCode: "88699",
      addressCountry: "DE",
    },
    image:
      "https://heidivogler.s3.eu-central-1.amazonaws.com/IMG_4749_de493186a9.jpg",
  }),
  defineWebSite({
    url: useRuntimeConfig().public.siteUrl,
    name: "Heidi Vogler",
  }),
  defineWebPage(),
]);
</script>
<style lang="postcss">
.cookieControl {
  @apply fixed z-50 top-auto bottom-0 right-0 m-5 bg-white shadow-md p-3 px-4 rounded-xl font-medium;
  .cookieControl__Bar {
    h2 {
      @apply text-base font-bold;
    }
    p {
      @apply text-sm leading-tight;
    }
    .cookieControl__BarButtons {
      @apply items-center gap-2 flex;
      button {
        @apply text-sm px-2 p-1 rounded;
        &:nth-child(1) {
          @apply bg-primary-500 hover:bg-primary-600 text-white ;
        }
        &:nth-child(2) {
          @apply bg-neutral-200 hover:bg-neutral-300 text-black;
        }
        &:nth-child(3) {
          @apply text-primary-600 hover:underline;
        }
      }
    }
    .cookieControl__BarContainer {
      @apply flex flex-col gap-3;
    }
  }
}
</style>
