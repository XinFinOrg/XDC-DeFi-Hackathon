import * as Chart from "../Chart";

import { cards } from "../../utilities/text";

export default function Score({ wallet }) {
  const score = Math.round(wallet.score * 10000) / 100;
  const noData = wallet.stats.noData;
  return (
    <div className="card score">
      <Chart.Score score={wallet.score * 100} />
      <h5>{cards.score.title[0]}</h5>
      <p>
        {noData
          ? cards.score.text[0]
          : cards.score.text[1].replace("{score}", score)}
      </p>
    </div>
  );
}
