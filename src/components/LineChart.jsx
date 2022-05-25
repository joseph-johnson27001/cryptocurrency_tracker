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

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 6) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 6) {
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
        radius: 1.1,
        spanGaps: true,
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
          text: `Value ($)`,
          // text: `${coinName} Price in USD ($)`,
        },
      },
      xAxes: {
        type: "time",
        ticks: {
          beginAtZero: true,
        },
        // title: {
        //   display: true,
        //   text: "Date & Time",
        // },
      },
    },
  };

  return (
    <>
      <Row className="chart-header" style={{ display: "inline-block" }}>
        <Col className="price-container">
          <Title level={5} className="price-change">
            <div>
              Change:{" "}
              <p
                style={{
                  color:
                    Math.sign(coinHistory?.data?.change) === -1
                      ? "#F93154"
                      : "green",
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
              <p style={{ color: "#0071BD", display: "inline" }}>
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
