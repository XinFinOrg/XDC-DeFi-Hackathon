import React from "react";

import * as Chart from "../Chart";

import { cards } from "../../utilities/text";

export default function Pulse({ wallet, blockchain }) {
  const [mostActive, setMostActive] = React.useState();

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const exceptions = "ripple";

  return (
    <div className="card pulse">
      {blockchain != exceptions && !wallet.stats.noData && (
        <Chart.Pulse wallet={wallet} setMostActive={setMostActive} />
      )}
      <h5>
        {blockchain != exceptions
          ? wallet.stats.noData
            ? cards.pulse.title[0]
            : cards.pulse.title[1]
          : "No Pusle Chart"}
      </h5>
      <p>
        {blockchain != exceptions
          ? wallet.stats.noData
            ? cards.pulse.text[0]
            : cards.pulse.text[1].replace("{month}", months[mostActive])
          : "There is no data to show."}
      </p>
    </div>
  );
}
