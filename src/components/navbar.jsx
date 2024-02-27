import React, { useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/Logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  if (setActiveMenu) {
    document.onclick = function (e) {
      if (e.target.id !== "menu-button") {
        setActiveMenu(false);
      }
    };
  }

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Typography.Title level={2} className="logo" icon={<FundOutlined />}>
          <Link to="/" className="navbar-heading">
            <Avatar src={icon} size="large" className="icon" />
            Cloud Crypto
          </Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          id="menu-button"
          onClick={() => setActiveMenu(true)}
        >
          <MenuOutlined />
        </Button>
        {activeMenu && (
          <Menu
            theme="dark"
            style={{ background: "black", zIndex: 1000 }}
            id="nav-select"
          >
            <Menu.Item
              icon={<HomeOutlined />}
              key="home"
              style={{ background: "black" }}
            >
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              icon={<FundOutlined />}
              key="cryptocurrencies"
              style={{ background: "black" }}
            >
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            {/* <Menu.Item
              icon={<BulbOutlined />}
              key="news"
              style={{ background: "black" }}
            >
              <Link to="/news">News</Link>
            </Menu.Item> */}
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
