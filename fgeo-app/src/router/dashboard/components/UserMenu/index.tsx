import React, { useState, useEffect } from "react";
import { Button, Input, Dropdown, Checkbox, Avatar, Menu, Modal } from "antd";
import {
	UserOutlined,
	DownOutlined,
	LogoutOutlined,
	LockOutlined,
	MailOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "components/app";
import config from "utils/config";
import "./style.less";

// stor=
import { connect } from "react-redux";
import { mapDispatchToProps } from "store/actions/auth";

const UserMenu: React.FC<any> = ({ auth, onLogout }) => {
	const { t } = useTranslation();
	return (
		<Dropdown
			overlay={
				<div className="user-overlay">
					<div className="avatar-div">
						<div>
							<Avatar
								style={{ backgroundColor: config.primaryColor }}
								icon={<UserOutlined />}
							/>
						</div>
						<div className="right">
							{auth && auth.user ? auth.user.name : "..."}
							<div className="subtitle">
								{auth && auth.user ? auth.user.username : "..."}
							</div>
						</div>
					</div>
					<div className="menu-div">
						<Menu openKeys={[]} selectedKeys={[]}>
							<Menu.Item
								icon={<LogoutOutlined />}
								onClick={() => {
									Modal.confirm({
										icon: <ExclamationCircleOutlined />,
										content: t("logoutBody"),
										okText: t("question.yes"),
										cancelText: t("question.no"),
										onOk() {
											onLogout();
										},
										onCancel() {},
									});
								}}
							>
								Sair
							</Menu.Item>
						</Menu>
					</div>
				</div>
			}
		>
			<div className="header-item">
				<Avatar
					style={{ backgroundColor: config.primaryColor }}
					size={22}
					icon={<UserOutlined />}
				/>{" "}
				<span style={{ marginLeft: 4 }}>
					{auth && auth.user ? auth.user.formattedName : "..."}
				</span>
			</div>
		</Dropdown>
	);
};

export default connect((state: any) => {
	return {
		auth: state.app.auth,
	};
}, mapDispatchToProps)(UserMenu);
