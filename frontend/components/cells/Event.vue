<template>
  <div class="container flex flex-col bg-white rounded-md p-5 gap-2" :class="size">
    <div class="date flex justify-between">
      <span class="text-primary-500 font-bold leading-none">{{ date }}</span>
      <DownloadEvent :event="event" class="download" />
    </div>
    <div class="title font-bold leading-none">
      <span>{{ event.attributes.title }}</span>
    </div>
    <div class="text-xl" v-if="event.attributes.description && size === 'xl'">
      <span>{{ event.attributes.description }}</span>
    </div>
    <div class="date flex gap-6 mt-auto items-end justify-between">
      <div class="flex flex-col gap-2 text-stone-400 font-bold leading-none">
        <span v-if="event.attributes.price && 'xl' === size">Preis: {{ event.attributes.price }} Euro</span>
        <span v-if="event.attributes.groupSize && 'xl' === size">Gruppengröße: {{ event.attributes.groupSize }}</span>
        <span v-if="location && 'sm' !== size">{{ location }}</span>
        <span>{{ time }}</span>
      </div>
      <div v-if="(start.getTime() > (new Date).getTime() || end?.getTime() > (new Date).getTime()) && !['sm', 'lg'].includes(size)">
        <a href="mailto:hallo@heidivogler.de"><Button :class="size === 'md' ? 'sm' : 'md'"
          >{{$t('register')}}</Button
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "~/components/molecules/Button.vue";
import { Event, EventAttributes } from "~/types";
import DownloadEvent from "~/components/molecules/DownloadEvent.vue";

export default defineComponent({
  components: {
    Button,
    DownloadEvent
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
  methods: {
    formatRange(start: string, end: string, short: boolean) {
      if (start === end || !end) return start;
      if (short) {
        const endDate = end.split(" ");
        const startDate = start.split(" ");
        start = startDate
          .filter((f, i) => f !== endDate[i])
          .join(" ");
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
  computed: {
    locale() {
      return "de";
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
      return this.event.attributes.end ? new Date(this.event.attributes.end) : null;
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
        const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: "auto" });
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
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: var(--width, 100%);
  height: var(--height, 100%);
  aspect-ratio: var(--aspect-ratio, initial);
  .date {
    font-size: var(--text-date, var(--text-sm));
  }
  .title {
    font-size: var(--text-title, var(--text-xl));
  }
  .download {
    opacity: 0;
    pointer-events: none;
  }
  &:hover {
    .download {
      opacity: 1;
      pointer-events: auto;
    }
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
