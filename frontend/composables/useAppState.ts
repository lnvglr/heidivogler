import Mapbox from 'mapbox-gl'
const map = ref(null as Mapbox.Map | null)
const headerColor = ref("default" as string | null)
export default function () {
  return {
		map,
		setMap: (m: Mapbox.Map) => map.value = m,
		headerColor,
		setHeaderColor: (c: string | null) => headerColor.value = c
	}
}