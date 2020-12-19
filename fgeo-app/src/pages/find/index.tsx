import React, { useState, useCallback, useEffect } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Page, Content, LanguageSelector } from "components/app";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

// store
import { connect } from "react-redux";
import { mapDispatchToProps } from "store/actions/auth";

import "./style.less";

// uso de CSS-in-JS
const containerStyle = {
	width: "100%",
	height: "500px",
};

const center = {
	lat: -13.1631371,
	lng: -51.6487507,
};

const FindPage: React.FC<any> = ({ onTryToAuth }) => {
	const { t } = useTranslation();

	const [map, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	const recenter = () => {
		if (map) {
			map.setCenter(center);
			map.setZoom(5);
		}
	};

	return (
		<Page
			data={{
				title: t("pages.find.title"),
				breadcrumb: [{ r: "Dashboard" }, { r: t("pages.find.title") }],
				extra: (
					<div>
						{t("pages.find.description")}
						<br />
						<Button type="primary" onClick={recenter}>
							Recentralizar mapa
						</Button>
					</div>
				),
			}}
		>
			<Content>
				<LoadScript googleMapsApiKey="AIzaSyDF6UxW9rNI_FgPdzCK7By1O4U-NoPxkBk">
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={5}
						onLoad={onLoad}
						onUnmount={onUnmount}
					>
						{/* Child components, such as markers, info windows, etc. */}
						<></>
					</GoogleMap>
				</LoadScript>
			</Content>
		</Page>
	);
};

export default connect((state: any) => {
	return {
		loading: state.app.loading,
	};
}, mapDispatchToProps)(FindPage);
