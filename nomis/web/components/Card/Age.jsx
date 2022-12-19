import Image from "next/image";

import * as Emoji from "../../public/emoji/age";

import { cards } from "../../utilities/text";

export default function Age({ wallet }) {
  const age = wallet.stats.walletAge;

  const youngAge = 6;
  const mediumAge = 12;
  const oldAge = 24;

  const emoji =
    age >= youngAge
      ? age >= mediumAge
        ? age >= oldAge
          ? Emoji.Old
          : Emoji.Medium
        : Emoji.Young
      : Emoji.New;

  const title =
    age >= youngAge
      ? age >= mediumAge
        ? age >= oldAge
          ? cards.age.title[3]
          : cards.age.title[2]
        : cards.age.title[1]
      : cards.age.title[0];

  return (
    <div className="card age">
      <Image src={emoji} width="64" height="64" />
      <h5>{title}</h5>
      <p>
        {age > 0
          ? cards.age.text[0]
          : cards.age.title[1].replace("{month}", age)}
      </p>
    </div>
  );
}
