<template>
  <div
    class="container group cursor-pointer flex flex-col bg-white rounded-2xl p-5 gap-2 duration-300 hover:-translate-y-1"
    :class="computedSize"
    @click.self="open = true"
  >
    <div class="date flex justify-between">
      <span class="text-primary-500 font-bold leading-none">{{ date }}</span>
    </div>
    <div class="title font-bold leading-none">
      <span>{{ event.attributes.title }}</span>
    </div>
    <div
      class="text-xl"
      v-if="event.attributes.description && computedSize === 'xl'"
    >
      <span>{{ event.attributes.description }}</span>
    </div>
    <div class="date flex gap-6 mt-auto items-end justify-between">
      <div class="flex flex-col gap-2 text-stone-400 font-bold leading-none">
        <span v-if="event.attributes.price && 'xl' === computedSize"
          >Preis: {{ event.attributes.price }} Euro</span
        >
        <span v-if="event.attributes.groupSize && 'xl' === computedSize"
          >Gruppengröße: {{ event.attributes.groupSize }}</span
        >
        <span v-if="location && 'sm' !== computedSize">{{ location }}</span>
        <span>{{ time }} Uhr</span>
      </div>
      <div v-if="futureEvent && !['sm', 'lg'].includes(computedSize)">
        <a :href="signUpEmail"
          ><Button :class="computedSize === 'md' ? 'sm' : 'md'">{{
            $t("register")
          }}</Button></a
        >
      </div>
    </div>
  </div>
  <Popup :title="event.attributes.title" :open="open" @close="open = false">
    <template #pretitle
      ><span class="text-primary-500 font-bold leading-none">{{
        date
      }}</span></template
    >
    <template #default>
      <div class="flex justify-between items-end">
      <div class="flex flex-col gap-2 text-stone-400 font-bold leading-none">
        <span v-if="event.attributes.price"
          >Preis: {{ event.attributes.price }} Euro</span
        >
        <span v-if="event.attributes.groupSize"
          >Gruppengröße: {{ event.attributes.groupSize }}</span
        >
        <span v-if="location">{{ location }}</span>
        <span>{{ time }} Uhr</span>
        <DownloadEvent :event="event" class="mt-10 flex gap-2 font-normal hover:underline"><FontAwesomeIcon :icon="['fas', 'calendar-plus']" /> {{ $t("events:add.to.calendar") }}</DownloadEvent>
      </div>

      <div v-if="futureEvent" class="ml-auto">
        <a :href="signUpEmail"
          ><Button class="md">{{ $t("register") }}</Button></a
        >
      </div></div>
      </template
    >
  </Popup>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import Popup from "~/components/molecules/Popup.vue";
import { Event, EventAttributes } from "~/types";
import DownloadEvent from "~/components/molecules/DownloadEvent.vue";

export default defineComponent({
  components: {
    Popup,
    Button,
    DownloadEvent,
  },
  props: {
    event: {
      type: Object as () => Event,
      required: true,
    },
    size: {
      type: String,
      default: "sm",
      validate: (e: string) => ["sm", "md", "lg", "xl"].includes(e),
    },
  },
  data() {
    return {
      windowWidth: window?.innerWidth || 0,
      open: false,
      email: useRuntimeConfig().public.email.to
    };
  },
  methods: {
    viewport() {
      this.windowWidth = window.innerWidth;
    },
    formatRange(start: string, end: string, short: boolean) {
      if (start === end || !end) return start;
      if (short) {
        const endDate = end.split(" ");
        const startDate = start.split(" ");
        start = startDate.filter((f, i) => f !== endDate[i]).join(" ");
      }
      return [start, end].join(" – ");
    },
    unixDay(date: Date) {
      const day =
        date.getSeconds() * 1000 +
        date.getMinutes() * 60 * 1000 +
        date.getHours() * 60 * 60 * 1000;
      date.toISOString();
      return (date.getTime() - day) / (1000 * 60 * 60 * 24);
    },
  },
  mounted() {
    window.addEventListener("resize", () => this.viewport());
    this.viewport();
  },
  unmounted() {
    window.removeEventListener("resize", () => this.viewport());
  },
  computed: {
    locale() {
      return "de";
    },
    computedSize() {
      if (this.windowWidth < 767) return "md";
      return this.size;
    },
    timeOptions() {
      return {
        hour: "numeric",
        minute: "numeric",
      } as Intl.DateTimeFormatOptions;
    },
    dateOptions() {
      return {
        day: "numeric",
        month: this.size === "sm" ? "short" : "long",
        year: this.size === "sm" ? "2-digit" : "numeric",
      } as Intl.DateTimeFormatOptions;
    },
    start(): Date {
      return new Date(this.event.attributes.start);
    },
    end(): Date | null {
      return this.event.attributes.end
        ? new Date(this.event.attributes.end)
        : null;
    },
    futureEvent(): boolean {
      return (
        this.unixDay(this.start) >= this.unixDay(new Date()) ||
        this.unixDay(this.end) >= this.unixDay(new Date())
      );
    },
    time() {
      return this.formatRange(
        this.start.toLocaleTimeString(this.locale, this.timeOptions),
        this.end?.toLocaleTimeString(this.locale, this.timeOptions)
      );
    },
    date() {
      const daysToGo = this.unixDay(this.start) - this.unixDay(new Date());
      if (daysToGo < 1 && daysToGo > -1) {
        const rtf = new Intl.RelativeTimeFormat(this.locale, {
          numeric: "auto",
        });
        return rtf.format(daysToGo, "day");
      }
      return this.formatRange(
        this.start.toLocaleDateString(this.locale, this.dateOptions),
        this.end?.toLocaleDateString(this.locale, this.dateOptions),
        true
      );
    },
    location() {
      return false;
    },
    signUpEmail() {
      const subject = `Anmeldung ${this.event.attributes.title}, ${this.date}`;
      const body = `Hallo Heidi,\nich würde mich gerne für ${this.event.attributes.title} am ${this.date} anmelden.
      `;
      return `mailto:${this.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: var(--width, 100%);
  min-width: var(--width, 100%);
  height: var(--height, 100%);
  aspect-ratio: var(--aspect-ratio, initial);
  .date {
    font-size: var(--text-date, var(--text-sm));
  }
  .title {
    font-size: var(--text-title, var(--text-xl));
  }
  &.sm {
    --width: 12rem;
    --aspect-ratio: 1/1;
  }
  &.md {
    --width: 18rem;
    --height: 12rem;
  }
  &.lg {
    --width: 18rem;
    --aspect-ratio: 1/1;
    --text-title: var(--text-2xl);
    --text-date: var(--text-lg);
  }
  &.xl {
    --width: 100%;
    --height: 24rem;
    --text-title: var(--text-3xl);
    --text-date: var(--text-xl);
  }
}
</style>
