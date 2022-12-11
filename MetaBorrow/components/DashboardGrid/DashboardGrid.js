import React from "react";
import { Card, Statistic } from "semantic-ui-react";

const DASHBOARD_BOXES = [
  {
    title: "Total Users",
    className: "purple",
    value:"234"
  },
  {
    title: "Total Rented Nfts",
    className: "green",
    value:"5"
  },
  {
    title: "Total Nfts ",
    value:"10"
  },
  {
    title: "Total Balance",
    value:"2.345"
  },
];

function DashboardGrid() {
  return (
    <div className="dashboardGrid">
      <div className="dashboardGrid-boxes">
        {DASHBOARD_BOXES.map((box, i) => (
          <Card className="dashboardGrid-boxes-item " centered raised>
            <Statistic
              className={box.className ? box.className : ""}
              as="h4"
              label={box.title}
              value={box.value}
            />
          </Card>
        ))}
      </div>
      <div>
        {/** We'll add the chat here later */}
      </div>
    </div>
  );
}

export default DashboardGrid;
