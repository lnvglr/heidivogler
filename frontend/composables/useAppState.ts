import Mapbox from 'mapbox-gl'
const map = ref<Mapbox.Map | null>(null)
const headerColor = ref("default" as string | null)
export default function () {
  return {
		map,
		setMap: (m: Mapbox.Map | null) => map.value = m,
		headerColor,
		setHeaderColor: (c: string | null) => headerColor.value = c
	}
}