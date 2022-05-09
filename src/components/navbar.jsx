import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={3} className="logo">
          <Link to="/" class="navbar-heading">
            Cloud Crypto
          </Link>
        </Typography.Title>
        {/* <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button> */}

        <Menu
          theme="dark"
          mode="horizontal"
          style={{ background: "black" }}
          display="inline"
          className="menu-items-container"
        >
          <Menu.Item icon={<HomeOutlined />} key="home" className="menu-item">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            icon={<FundOutlined />}
            key="cryptocurrencies"
            className="menu-item"
          >
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />} key="news" className="menu-item">
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
