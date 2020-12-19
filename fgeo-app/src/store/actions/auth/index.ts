import { setLoadingState, setAppState } from "store/actions/app";
import { handleErrors } from "store/actions/errors";
import { request } from "utils/request";
import { formatName } from "utils/helpers";

export const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetInitialAuthState: () => {
      dispatch(getInitialAuthState());
    },
    onTryToAuth: (body: any) => {
      dispatch(tryToAuth(body));
    },
    onLogout: () => {
      dispatch(logout());
    },
  };
};

export const logout = () => {
  return (dispatch: any) => {
    localStorage.removeItem("authData");
    dispatch(setAppState({ auth: null, routerState: "auth" }));
  };
};

export const getInitialAuthState = () => {
  return (dispatch: any) => {
    try {
      const authData = localStorage.getItem("authData");
      if (authData) {
        const data = JSON.parse(authData);
        dispatch(boot(data));
      } else {
        throw { error: "no auth" };
      }
    } catch (err) {
      dispatch(setAppState({ auth: null, routerState: "auth" }));
    }
  };
};

export const tryToAuth = (body: any) => {
  return (dispatch: any) => {
    dispatch(
      setLoadingState({ appendTo: "loginContent", text: "authenticating" })
    );
    request("/auth/login", { method: "POST", body })
      .then((data) => {
        localStorage.setItem("authData", JSON.stringify(data));
        dispatch(boot(data));
        dispatch(setLoadingState(false));
      })
      .catch((err) => {
        handleErrors({ dispatch, err });
      });
  };
};

export const boot = (data: any) => {
  return (dispatch: any) => {
    // Adiciona a propriedade auth no 'window' para acessar o token de qualquer módulo
    (window as any).authData = data;
    request(`/user`)
      .then((user) => {
        user.formattedName = formatName(user.name);
        dispatch(setAppState({ auth: { data, user }, routerState: "main" }));
        dispatch(setLoadingState(false));
      })
      .catch((err) => {
        dispatch(setAppState({ auth: null, routerState: "auth" }));
        dispatch(setLoadingState(false));
        localStorage.removeItem("authData");
        (window as any).authData = null;
        handleErrors({ dispatch, err });
      });
  };
};
