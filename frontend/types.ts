import { Strapi4ResponseSingle, Strapi4ResponseMany, Strapi4ResponseData } from '@nuxtjs/strapi/dist/runtime/types'
export { Strapi4ResponseData, Strapi4ResponseSingle, Strapi4ResponseMany } from '@nuxtjs/strapi/dist/runtime/types'
export { EventAttributes } from 'ics/index'
import Mapbox from 'mapbox-gl'
import { PublicRuntimeConfig } from 'nuxt/schema'

export interface Event {
  title: string;
  description: string;
  price: number;
  groupSize: number;
  start: string;
  end: string;
  time: string;
  canRegister: boolean;
  offer: Strapi4ResponseSingle<Offer>
}
export interface ImageProps {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}
export interface StrapiMedia extends ImageProps {
  alternativeText: string
  caption: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  createdAt: string
  updatedAt: string
  formats: {
    [key: string]: ImageProps
  }
}
export interface Offer {
  title: string;
  copy: string;
  subCopy: string;
  slug: string;
  createdAt: string
  updatedAt: string
  rank: number
  headerColor: string
  events: Strapi4ResponseMany<Event>
  hero: Strapi4ResponseSingle<StrapiMedia> & {
    copy: string;
    subCopy: string;
    image?: Strapi4ResponseSingle<StrapiMedia>
  }
  content: (Record<string, any> & { __component: string })[]
}


export interface Strapi extends ReturnType<typeof useStrapi> {
  api: PublicRuntimeConfig['strapi']
  client: <T>(
    contentType: string,
    data?: Partial<T>,
    method?: string
  ) => Promise<T>
}

export interface State {
  headerColor: string | null
  map?: Mapbox.Map
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $state: State,
    $strapi: Strapi
  }
}
