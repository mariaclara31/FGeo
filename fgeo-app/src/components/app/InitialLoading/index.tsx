import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import config from "utils/config";
import { useTranslation } from "react-i18next";

import "./style.less";

const InitialLoading: React.FC<any> = ({ absolute = false, data = null }) => {
	const { t } = useTranslation();

	// pos é o rect (getBoundingClientRect) do elemento na tela para exibir o loading dentro do elemento
	const [pos, setPos] = useState<any>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(false);
		if (absolute && typeof data === "object") {
			// remove listeners que foram definidos anteriormente
			const w = window as any;
			if (w.lPos) {
				w.removeEventListener("resize", w.lPos);
				w.lPos = null;
			}
			if (data.appendTo) {
				const el = document.getElementById(data.appendTo);
				if (el) {
					w.lPos = () => {
						setPos(el.getBoundingClientRect());
					};
					w.addEventListener("resize", w.lPos);
					w.lPos();
				}
				setShow(true);
			} else {
				setShow(true);
			}
		} else {
			setShow(true);
		}
	}, [data]);

	return show ? (
		<div
			className={absolute ? "inldAbsWrapper" : "inldWrapper"}
			style={
				pos
					? { width: pos.width, left: pos.left, height: pos.height }
					: {}
			}
		>
			<div className="content">
				<div className="logoName">
					{absolute
						? typeof data === "object" && data.text
							? t(data.text)
							: t("loading")
						: "iCont"}
				</div>
				<LoadingOutlined
					style={{ fontSize: 24, color: config.primaryColor }}
					spin
				/>
			</div>
		</div>
	) : null;
};

export default InitialLoading;
