const name = process.env.CLOUDINARY_NAME

export default {
	cloudinary: {
		baseURL: `https://res.cloudinary.com/${name}/image/fetch/`
	},
	screens: {
		xlarge: 2000,
		large: 1000,
		medium: 750,
		small: 500,
		thumbnail: 200,
	},

	// providers: {
	// 	aws: {
// 		provider: 'aws',
	// 		credentials: {
	// 			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	// 			secretAccessKey: process.env.AWS_ACCESS_SECRET
	// 		},
	// 		region: process.env.AWS_REGION,
	// 		bucket: process.env.AWS_BUCKET,
	// 	}
	// }
	// strapi: {}
	// domains: [apiBase, 'localhost:1337', 'heidivogler.de', 'www.heidivogler.de', 'localhost:3000', 'https://heidivogler.s3.eu-central-1.amazonaws.com', 'heidivogler.s3.eu-central-1.amazonaws.com'],

}
