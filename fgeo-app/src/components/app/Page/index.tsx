import React from "react";
import { Breadcrumb } from "antd";
import "./style.less";
import { LanguageSelector } from "components/app";

const Page: React.FC<any> = ({ data, children }) => {
	return (
		<div className="page">
			<div className="pageHeader">
				<Breadcrumb>
					{data.breadcrumb.map((i, index) => (
						<Breadcrumb.Item key={index}>{i.r}</Breadcrumb.Item>
					))}
				</Breadcrumb>
				<div className="title">{data.title} <LanguageSelector /></div>

				{data.extra ? data.extra : null}
			</div>
			{children}
		</div>
	);
};

export default Page;
