import type { FC } from "react";
import {
  DownOutlined,
  LogoutOutlined,
  PictureOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  _?: never;
}

export const AdminLayout: FC<AdminLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = localStorage.getItem("auth_email")?.trim() || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
    navigate("/login", { replace: true });
  };

  const selectedMenuKey = location.pathname.startsWith("/admin/users")
    ? "users"
    : location.pathname.startsWith("/admin/photos")
      ? "photos"
    : location.pathname.startsWith("/admin/settings")
      ? "settings"
      : "dashboard";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(`/admin/${key}`);
  };

  const userDropdownItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className={styles["admin-layout"]}>
      <Layout.Sider className={styles["admin-layout__sider"]} width={240}>
        <div className={styles["admin-layout__brand"]}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Admin Panel
          </Typography.Title>
        </div>
        <Menu
          className={styles["admin-layout__menu"]}
          items={[
            { key: "dashboard", icon: <UserOutlined />, label: "Dashboard" },
            { key: "users", icon: <TeamOutlined />, label: "Users" },
            { key: "photos", icon: <PictureOutlined />, label: "Photos" },
            { key: "settings", icon: <SettingOutlined />, label: "Settings" },
          ]}
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={[selectedMenuKey]}
        />
      </Layout.Sider>

      <Layout className={styles["admin-layout__main"]}>
        <Layout.Header className={styles["admin-layout__header"]}>
          <Typography.Text strong>Admin Area</Typography.Text>
          <div>
            <ThemeToggle />
            <Dropdown menu={{ items: userDropdownItems }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Typography.Text className={styles["admin-layout__user-name"]}>
                  {userEmail}
                </Typography.Text>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </Layout.Header>
        <Layout.Content className={styles["admin-layout__content"]}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
