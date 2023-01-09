import Image from "next/image";

import * as Emoji from "../../public/emoji/turnover";

import { cards } from "../../utilities/text";

export default function Turnover({ wallet }) {
  const turnover = wallet.stats.walletTurnover;
  const nativePrice = wallet.stats.balance * wallet.stats.balanceUSD;
  const turnoverUSD = turnover * nativePrice;

  const low = 1000;
  const avg = 10000;
  const high = 100000;

  const coin = wallet.stats.statsDescriptions.Balance.units;

  const emoji =
    turnoverUSD >= low
      ? turnoverUSD >= avg
        ? turnoverUSD >= high
          ? Emoji.High
          : Emoji.Avg
        : Emoji.Low
      : Emoji.Cheap;

  const title =
    turnoverUSD >= low
      ? turnoverUSD >= avg
        ? turnoverUSD >= high
          ? cards.turnover.title[3]
          : cards.turnover.title[2]
        : cards.turnover.title[1]
      : cards.turnover.title[0];

  return (
    <div className="card turnover">
      <Image src={emoji} width="64" height="64" />
      <h5>{title}</h5>
      <p>
        {turnover < low
          ? cards.turnover.text[0]
              .replace("{count}", Math.floor(turnover) + 1)
              .replace("{coin}", coin)
          : cards.turnover.text[1]
              .replace("{count}", Math.floor(turnover))
              .replace("{coin}", coin)}
      </p>
    </div>
  );
}
