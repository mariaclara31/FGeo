import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  TeamOutlined
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import { LanguageSelector } from "components/app";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  Link,
  withRouter,
} from "react-router-dom";
import * as Pages from "pages";

// store
import { connect } from "react-redux";
import { mapDispatchToProps } from "store/actions/auth";

import UserMenu from "./components/UserMenu";

import "./style.less";

const { Header, Sider, Content } = Layout;

const SideMenu: React.FC<any> = ({ collapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [pathKey, setPathKey] = useState(["/home"]);

  useEffect(() => {
    setPathKey([location.pathname]);
  }, [location]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        {collapsed ? "" : <div className="text">{t("panel")}</div>}
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={pathKey}>
        <Menu.Item key="/find" icon={<HomeOutlined />}>
          <Link to="/find">{t("pages.find.title")}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const Dashboard: React.FC<any> = () => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const lastCollapsed = localStorage.getItem("lastCollapsed");
    if (lastCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("lastCollapsed", JSON.stringify(!collapsed));
  };

  return (
    <BrowserRouter>
      <Layout id="layout">
        <SideMenu collapsed={collapsed} />
        <Layout className="site-layout">
          <Header
            className="header site-layout-background"
            style={{ padding: 0 }}
          >
            <div className="left">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </div>
            <div className="right">
              <UserMenu />
            </div>
          </Header>
          <Switch>
            <Route path="/find" component={Pages.Find} />
            <Redirect path="/" to={"find"} />
          </Switch>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default connect((state: any) => {
  return {
    auth: state.app.auth,
  };
}, mapDispatchToProps)(Dashboard);
