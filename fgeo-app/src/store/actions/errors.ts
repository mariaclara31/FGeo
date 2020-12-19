import { setLoadingState, setAppState } from "store/actions/app";
import { notification } from "antd";

const errorsList = [
	{
		name: "invalid login",
		message: "Erro ao fazer login",
		description: "Usuário ou senha inválidos",
	},
];

export const handleErrors = (params: any) => {
	const { dispatch, err } = params;

	console.log("err", err);

	let message = "Ocorreu um erro";
	let description = "Ocorreu um erro ao processar sua requisição";
	if (err && err.error) {
		const foundError = errorsList.find((item) => item.name === err.error);
		if (foundError) {
			message = foundError.message;
			description = foundError.description;
		}
	}

	notification.error({
		message,
		description,
	});

	params.dispatch(setLoadingState(false));
};
