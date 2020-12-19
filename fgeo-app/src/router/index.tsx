import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { InitialLoading } from "components/app";
import { getInitialAuth } from "utils/auth";
import Dashboard from "./dashboard";
import * as Pages from "pages";

// store
import { connect } from "react-redux";
import { mapDispatchToProps } from "store/actions/auth";

const Router: React.FC<any> = ({
	routerState,
	auth,
	loading,
	onGetInitialAuthState,
}) => {
	useEffect(() => {
		onGetInitialAuthState();
	}, []);

	if (routerState === null) {
		return <InitialLoading />;
	}

	return (
		<div className="appContainer">
			{loading && <InitialLoading absolute={true} data={loading} />}
			{routerState === "auth" ? (
				<BrowserRouter>
					<Redirect path="/" to={"login"} />
					<Route path="/login" component={Pages.Login} />
				</BrowserRouter>
			) : (
				<Dashboard />
			)}
		</div>
	);
};

export default connect((state: any) => {
	return {
		auth: state.app.auth,
		routerState: state.app.routerState,
		loading: state.app.loading,
	};
}, mapDispatchToProps)(Router);
