export const getInitialAuth = () => {
	try {
		const auth = localStorage.getItem("auth");
		if(auth) {
			return JSON.parse(auth);
		} else {
			throw "no auth";
		}
	} catch(err) {
		return false;
	}
}