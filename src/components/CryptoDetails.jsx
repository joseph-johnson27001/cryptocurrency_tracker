import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { uuid } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(uuid);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ uuid, timePeriod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.supply.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  // BELLOW: FIX FOR TERRA USD CHART TO NOT RETURN NULL AS NO TOTAL SUPPLY LISTED
  if (genericStats[3].value === "$ null") {
    genericStats[3].value = genericStats[4].value;
  }

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        {/* <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p> */}
      </Col>
      <Select
        defaultValue="24h"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="coin-desc-link">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Stats
            </Title>
            An Overview of {cryptoDetails.name}'s Valuation Statistics
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title.toString()}>
              <Col className="coin-stats-name">
                <Text className="coin-stats-icon">{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        {/* GENERIC STATS AREA */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Generic {cryptoDetails.name} Information
            </Title>
            Generic {cryptoDetails.name} Statistics
          </Col>
          {genericStats.map(({ icon, title, value, index }) => (
            <Col className="coin-stats" key={title.toString()}>
              <Col className="coin-stats-name">
                <Text className="coin-stats-icon">{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      {/* <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Col>
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}?
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Col>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link, i) => (
            <div key={i}>
              <Row className="coin-link">
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            </div>
          ))}
        </Col>
      </Col> */}
    </Col>
  );
};

export default CryptoDetails;
