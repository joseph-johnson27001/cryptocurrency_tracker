import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale,
} from "chart.js";
import Moment from "moment";

import "chartjs-adapter-moment";

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  Filler,
  LineElement,
  Tooltip
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(Moment.unix(coinHistory?.data?.history[i].timestamp));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD $",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: `${coinName} Price in USD ($)`,
        },
      },
      xAxes: {
        type: "time",
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            <div>
              Change:{" "}
              <p
                style={{
                  color:
                    coinHistory?.data?.change[0] === "-"
                      ? "#F93154"
                      : "#00B74A",
                  display: "inline",
                }}
              >
                {coinHistory?.data?.change}%
              </p>
            </div>
          </Title>
          <Title level={5} className="current-price">
            <div>
              Current {coinName} Price:{" "}
              <p style={{ color: "#0071bd", display: "inline" }}>
                ${currentPrice}
              </p>
            </div>
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
