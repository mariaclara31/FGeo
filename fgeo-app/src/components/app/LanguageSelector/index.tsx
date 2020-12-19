import React, { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
//import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./style.less"
import brFlag from "assets/br-flag.png";
import enFlag from "assets/us-flag.png";

const { Option } = Select;

const LanguageSelector: React.FC<any> = ({min}) => {
	const [lang, setLang] = useState("pt");
	const { i18n } = useTranslation();

	useEffect(() => {
		setLang(i18n.language || 'pt');
	}, [])

	const handleChange = useCallback(
		(value) => {
			setLang(value);
			i18n.changeLanguage(value);
			localStorage.setItem('lang', value);
		},
		[lang]
	);

	return (
		<Select
			value={lang}
			size="small"
			onChange={handleChange}
			bordered={!min}
		>
			<Option value="pt">
			<div className={min ? "minLangItem" : "langItem"}>
				<img
					src={brFlag}
				/>
				{min ? "" : "Português"}
				</div>
			</Option>
			<Option value="en"><div className={min ? "minLangItem" : "langItem"}>
				<img
					src={enFlag}
				/>
				{min ? "" : "English"}
				</div></Option>
		</Select>
	);
};

export default LanguageSelector;
