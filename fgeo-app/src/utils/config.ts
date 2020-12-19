// ambientes da aplicação
const apiEnvs: any = {
	dev: {
		url: "http://localhost:3001",
	},
	prod: {
		url: "https://maria.fgeo.app",
	},
};
export default {
	primaryColor: "#244CD5",
	api: apiEnvs.dev,
};
