const ogImage =
	"https://heidivogler.s3.eu-central-1.amazonaws.com/IMG_4749_de493186a9.jpg";
const description =
	"Hier wirst du deinen Weg finden und kannst im Wald oder mit den Pferden einen Prozess der Heilung beginnen.";

export default {
	head: {
		title: "Heidi Vogler – Reittherapie, Traumabearbeitung, Waldbaden",
		meta: [
			{
				name: "description",
				content: description,
			},
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Heidi Vogler – Reittherapie, Traumabearbeitung, Waldbaden" },
			{ property: "og:description", content: description },
			{ property: "og:image", content: ogImage },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:image", content: ogImage },
		],
		link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
	},
}