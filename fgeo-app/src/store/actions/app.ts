import { SET_APP_STATE, AppStateType } from "store/reducers/app/types";
import { handleErrors } from "store/actions/errors";

export const mapDispatchToProps = (dispatch: any) => {
	return {
		onSetAppState: (payload: any) => {
			dispatch(setAppState(payload));
		},
		onHandleErrors: (err: any) => {
			handleErrors({ dispatch, err });
		},
	};
};

export const setLoadingState = (loading: object | boolean) => ({
	type: SET_APP_STATE,
	payload: {
		loading,
	},
});

export const setAppState = (payload: any) => ({
	type: SET_APP_STATE,
	payload,
});
