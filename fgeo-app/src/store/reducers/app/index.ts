import { AppStateType, AppActionTypes, SET_APP_STATE } from "./types";

const initialState: AppStateType = {
  loading: false,
  auth: null,
  routerState: null,
  clients: null
};

export const appReducer = (state = initialState, action: AppActionTypes) => {
  switch (action.type) {
    case SET_APP_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};