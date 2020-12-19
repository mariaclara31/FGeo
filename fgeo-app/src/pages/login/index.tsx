import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "components/app";
import "./style.less";

// store
import { connect } from "react-redux";
import { mapDispatchToProps } from "store/actions/auth";

const Login: React.FC<any> = ({ onTryToAuth }) => {
	const { t } = useTranslation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onAuth = () => {
		return () => {
			const body = { username, password };

			if (username && password) {
				onTryToAuth(body);
			}
		};
	};

	return (
		<div className="loginWrapper">
			<div id="loginContent" className="leftContent">
				<div className="logo">
					<div className="logoCont">
						<span className="name">fGeo</span>{" "}
					</div>
					<LanguageSelector />
				</div>
				<div className="centerDiv">
					<div className="text">{t("slogan")}</div>
					<div className="subText">{t("loginPage.welcome")}</div>
					<div className="form">
						<div className="input">
							<Input
								type="username"
								placeholder={t("username")}
								prefix={<UserOutlined />}
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
							/>
						</div>
						<div className="input">
							<Input.Password
								placeholder={t("password")}
								prefix={<LockOutlined />}
								onPressEnter={onAuth()}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<div className="keepInput">
							<Checkbox>{t("keepLogged")}</Checkbox>
						</div>
						<div className="buttonGroup">
							<Button type="primary" onClick={onAuth()}>
								{t("login")}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="rightContent"></div>
		</div>
	);
};

export default connect((state: any) => {
	return {
		loading: state.app.loading,
	};
}, mapDispatchToProps)(Login);
