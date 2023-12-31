import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  ClockCircleOutlined,
  DatabaseOutlined,
  LockOutlined,
  MenuFoldOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Modal, Badge, Flex, message } from "antd";

import Sider from "antd/es/layout/Sider";
import account from "../../../assets/images/account.svg";

import { Content, Header } from "antd/es/layout/layout";
import useAuth from "../../../zustand/auth";

import "./style.scss";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { role, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        className="dashboard-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <h3 className="dashboard-logo">
          {collapsed ? "PTP" : "PTP Solutions"}
        </h3>
        <Menu
          className="menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: (
                <Link to="/dashboard">
                  Dashboard{" "}
                  <span className="dashboard-role-badge">
                    {role?.charAt(0).toUpperCase()}
                  </span>
                </Link>
              ),
            },
            role === "admin"
              ? {
                  key: "/users",
                  icon: <TeamOutlined />,
                  label: (
                    <Link to="/users">
                      Users{" "}
                      {role !== "admin" ? <LockOutlined color="red" /> : null}
                    </Link>
                  ),
                }
              : null,

            {
              key: "/education",
              icon: <ReadOutlined />,
              label: (
                <Link
                  onClick={
                    role === "user"
                      ? () =>
                          message.error(
                            "Only clients can add their credentials"
                          )
                      : undefined
                  }
                  to={role === "user" ? "/dashboard" : "/education"}
                >
                  Education {role === "user" ? <LockOutlined /> : ""}
                </Link>
              ),
            },
            {
              key: "/experiences",
              icon: <ClockCircleOutlined />,
              label: (
                <Link
                  onClick={
                    role === "user"
                      ? () =>
                          message.error(
                            "Only clients can add their credentials"
                          )
                      : undefined
                  }
                  to={role === "user" ? "/dashboard" : "/experiences"}
                >
                  Experience {role === "user" ? <LockOutlined /> : ""}
                </Link>
              ),
            },
            {
              key: "/portfolios",
              icon: <DatabaseOutlined />,
              label: (
                <Link
                  onClick={
                    role === "user"
                      ? () =>
                          message.error(
                            "Only clients can add their credentials"
                          )
                      : undefined
                  }
                  to={role === "user" ? "/dashboard" : "/portfolios"}
                >
                  Portfolios {role === "user" ? <LockOutlined /> : ""}
                </Link>
              ),
            },
            {
              key: "/skills",
              icon: <LockOutlined />,
              label: (
                <Link
                  onClick={
                    role === "user"
                      ? () =>
                          message.error(
                            "Only clients can add their credentials"
                          )
                      : undefined
                  }
                  to={role === "user" ? "/dashboard" : "/skills"}
                >
                  Skills {role === "user" ? <LockOutlined /> : ""}
                </Link>
              ),
            },
            role === "admin"
              ? {
                  key: "/messages",
                  icon: <WhatsAppOutlined />,
                  label: <Link to="/messages">Messages</Link>,
                }
              : null,
            {
              key: "4",
              label: (
                <Button
                  type="primary"
                  danger
                  style={{ width: "100%" }}
                  onClick={() =>
                    Modal.confirm({
                      title: "Do you want to log out ?",
                      onOk: () => logout(navigate),
                    })
                  }
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="dashboard-header"
          style={{
            padding: 0,
          }}
        >
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={<MenuFoldOutlined />}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Flex align="center" gap={10}>
            <Link to="/dashboard" className="notification">
              <Badge className="dashboard-badge" count={0} size="small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                </svg>
              </Badge>
            </Link>
            <Link to="/account" className="notification">
              <Badge className="dashboard-account-badge" count={0} size="small">
                <img src={account} alt="My account" />
              </Badge>
            </Link>
          </Flex>
        </Header>
        <Content
          className="dashboard-main"
          style={{
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      {/* <div
        className={`notification-content ${
          notification ? "notification-open" : "notification-close"
        }`}
      >
        <h3 className="notification-content-title">Upgrade users ({0})</h3>
        <Input
          size="small"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
          placeholder="Searching..."
        />
        <Spin
          style={{
            background: "#fff",
            backdropFilter: "0.8",
          }}
          tip="Loading"
          spinning={isFetching}
        >
          {users.map((user) => (
            <div key={user?._id} className="notification-content-user">
              <p>{user?.firstName.slice(0, 25)}</p>
              <button
                onClick={() =>
                  Modal.confirm({
                    title: "Do you want to upgrade this user ?",
                    onOk: () => upgradeToClient(user?._id),
                  })
                }
                className="upgrade-btn"
                size="small"
              >
                Upgrade
              </button>
            </div>
          ))}
        </Spin>
        <div className="notification-content-footer">
          <div className="notification-content-pagination">
            <button
              className={page === 1 ? `disabled` : ""}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <LeftOutlined />
              Prev
            </button>
            <button
              // disabled={page === lastPage}
              // className={page === lastPage ? `disabled` : ""}
              onClick={() => setPage(page + 1)}
            >
              Next <RightOutlined />
            </button>
          </div>
          <button className="close-btn">
            Close
          </button>
        </div>
      </div> */}
    </Layout>
  );
};

export default AdminLayout;
