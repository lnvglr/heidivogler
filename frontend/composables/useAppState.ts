type MapInstance = { remove?: () => void } | null

const map = ref<MapInstance>(null)
const headerColor = ref("default" as string | null)
export default function () {
  return {
		map,
		setMap: (m: MapInstance) => map.value = m,
		headerColor,
		setHeaderColor: (c: string | null) => headerColor.value = c
	}
}