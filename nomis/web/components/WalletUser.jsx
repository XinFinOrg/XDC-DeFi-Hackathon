import React from "react";

import Image from "next/image";

import UserAddress from "./UserAddress";
import UserStats from "./UserStats";

import userpick1 from "../public/userpicks/userpick1.svg";
import userpick2 from "../public/userpicks/userpick2.svg";
import userpick3 from "../public/userpicks/userpick3.svg";

import MintScore from "./MintScore";

export default function WalletUser({
  wallet,
  blockchainSlug,
  blockchain,
  group,
  address,
  fullAddress,
  action,
  apiHost,
}) {
  const [random, setRandom] = React.useState();
  React.useEffect(() => {
    setRandom(Math.random());
  }, []);
  return (
    <>
      <section className="WalletUser">
        <div className="bio">
          <div className="userpick">
            <Image
              src={
                random < 1 / 3
                  ? userpick1
                  : random < 2 / 3
                  ? userpick2
                  : userpick3
              }
            />
          </div>
          <div className="meta">
            <UserAddress address={address} fullAddress={fullAddress} />
            <UserStats wallet={wallet} blockchain={blockchainSlug} group={group} />
          </div>
        </div>
        <MintScore blockchainSlug={blockchainSlug} blockchain={blockchain} action={action} apiHost={apiHost} />
      </section>
    </>
  );
}
