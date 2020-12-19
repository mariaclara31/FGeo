import config from "utils/config";

export const request = (
	endpoint: string,
	options: any = {},
	noAuth: boolean = false
): Promise<any> =>
	new Promise((resolve, reject) => {
		let authData;
		if (!noAuth) {
			authData = (window as any).authData;
		}
		const defaultHeaders = {
			Accept: "application/json",
			"Content-Type": "application/json",
		};
		const extraHeaders = options.headers ? options.headers : {};
		options.headers = authData
			? {
					Authorization: `Bearer ${authData ? authData.token : ""}`,
					...extraHeaders,
					...defaultHeaders,
			  }
			: { ...extraHeaders, ...defaultHeaders };
		if (options.body && typeof options.body === "object") {
			options.body = JSON.stringify(options.body);
		}
		fetch(config.api.url + endpoint, options)
			.then(async (response) => {
				if (response.ok) {
					resolve(await response.json());
				} else {
					reject(await response.json());
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
