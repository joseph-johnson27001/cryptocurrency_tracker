import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Col className="global-crypto-info-container">
        <Row gutter={16} className="global-crypto-container">
          <Col>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
              span={12}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
              span={12}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
              span={12}
            />
          </Col>
          <Col>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
              span={12}
            />
          </Col>
          <Col>
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
              span={12}
            />
          </Col>
        </Row>
      </Col>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Crypto's
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      {/* <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified /> */}
    </>
  );
};

export default Homepage;
