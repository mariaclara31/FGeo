import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// i18n
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import resources from "./i18n";

i18n.use(initReactI18next)
	.init({
		resources,
		lng: localStorage.getItem('lang') || 'pt',
		fallbackLng: "pt",

		interpolation: {
			escapeValue: false,
		},
	});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
