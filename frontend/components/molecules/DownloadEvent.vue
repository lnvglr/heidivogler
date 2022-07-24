<template>
	<FontAwesomeIcon
		:icon="['fas', 'calendar-plus']"
		class="duration-75 text-stone-600 hover:text-primary-500 cursor-pointer text-2xl -mb-5"
		@click="downloadEvent"
	/>
</template>

<script lang="ts">
import { Event, EventAttributes } from "~/types";

export default defineComponent({
  props: {
    event: {
      type: Object as () => Event,
      required: true,
    },
  },
  methods: {
    makeTextFile(text) {
      const data = new Blob([text], { type: "text/ics" });
      let textFile = null;
      textFile = window.URL.createObjectURL(data);
      return textFile;
    },
    toDateArray(raw: Date): number[] {
      const ISO = raw.toISOString();
      const date = ISO.split("T")[0]
        .split("-")
        .map((e) => parseInt(e));
      const time = ISO.split("T")[1]
        .split(":")
        .splice(0, 2)
        .map((e) => parseInt(e));
      return [...date, ...time];
    },
    async downloadEvent() {
      try {
        const ics = await import("ics");
        const slugify = (await import("slugify")).default;
        const event = {
          start: this.toDateArray(this.start),
          end: this.toDateArray(this.end),

          startInputType: "utc",
          startOutputType: "local",
          endInputType: "utc",
          endOutputType: "local",

          title: this.event.attributes.title,
          description: this.event.attributes.description,
          // location: this.location,
          busyStatus: "BUSY",
        } as EventAttributes;

        const fontName =
          slugify([this.event.attributes.title, event.start.join("-")].join("-"), {
            lower: true,
            strict: true,
          }) + ".ics";
        ics.createEvent(event, (error, value) => {
          if (error) return console.log(error);
          const elem = window.document.createElement("a");
          elem.href = this.makeTextFile(value);
          elem.download = fontName;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
        });
      } catch (er) {
        console.warn(er);
      }
    },
  },
  computed: {
    start(): Date {
      return new Date(this.event.attributes.start);
    },
    end(): Date | null {
      return this.event.attributes.end ? new Date(this.event.attributes.end) : null;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
