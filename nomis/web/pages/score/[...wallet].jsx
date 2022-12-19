import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "lottie-react";

import useSWR from "swr";

import errorAnimation from "../../utilities/error.json";
import loadingAnimation from "../../utilities/loading.json";
import notFoundAnimation from "../../utilities/notFound.json";

import MainLayout from "../../layouts/Main";

import Input from "../../components/global/Input";

import WalletData from "../../components/WalletData";
import WalletUser from "../../components/WalletUser";
import { blockchains } from "../../utilities/blockchains";

export async function getServerSideProps(context) {
  const blockchainSlug = await context.query.wallet[0];
  const fullAddress = await context.query.wallet[1];

  const query = new URLSearchParams(context.query);
  const action = query.get('action');
  const apiHost = process.env.API_HOST !== undefined ? process.env.API_HOST : "https://api.nomis.cc";

  return { props: { blockchainSlug, fullAddress, action, apiHost } };
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Scored({ blockchainSlug, fullAddress, action, apiHost }) {
  const blockchain = blockchains.find((b) => b.slug === blockchainSlug).apiSlug;

  const { data: wallet, error } = useSWR(
    blockchains.find((b) => b.slug === blockchainSlug).group === "eco"
      ? `${apiHost}/api/v1/${blockchain}/wallet/${fullAddress}/eco-score?ecoToken=0`
      : `${apiHost}/api/v1/${blockchain}/wallet/${fullAddress}/score`,
    fetcher
  );

  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 384);
    });
  }, []);

  const address =
    fullAddress.length > 16
      ? fullAddress[0] +
        fullAddress[1] +
        fullAddress[2] +
        " · · · " +
        fullAddress[fullAddress.length - 3] +
        fullAddress[fullAddress.length - 2] +
        fullAddress[fullAddress.length - 1]
      : fullAddress;

  const router = useRouter();

  const tryAgainHandler = () => {
    router.reload();
  };

  if (!wallet)
    return (
      <MainLayout title={`${address}`}>
        <div className="wrapper">
          <Input blockchain={blockchain} fullAddress={fullAddress} />
          <section className="message loading">
            <Lottie animationData={loadingAnimation} loop={true} size="240px" />
            <h2>Please Wait...</h2>
            <p>Our calculations are not that fast. Give us a minute.</p>
          </section>
        </div>
      </MainLayout>
    );

  if (error)
    return (
      <MainLayout title={`${address}`}>
        <div className="wrapper">
          <Input blockchain={blockchain} fullAddress={fullAddress} />
          <section className="message error">
            <Lottie animationData={errorAnimation} loop={true} size="240px" />
            <h2>There is an Error</h2>
            <p>We have an error: {error}.</p>
            <button onClick={tryAgainHandler} className="tryAgain">
              Try Again
            </button>
          </section>
        </div>
      </MainLayout>
    );

  return (
    <MainLayout title={`${address}`}>
      <div className="wrapper">
        <Input blockchain={blockchain} fullAddress={fullAddress} />
        {wallet.succeeded ? (
          <div className="scored">
            <WalletData
              wallet={wallet.data}
              blockchain={blockchain}
              group={blockchains.find((b) => b.slug === blockchainSlug).group}
              fullAddress={fullAddress}
            />
            <WalletUser
              wallet={wallet.data}
              blockchainSlug={blockchainSlug}
              blockchain={blockchain}
              group={blockchains.find((b) => b.slug === blockchainSlug).group}
              address={address}
              fullAddress={fullAddress}
              action={action}
              apiHost={apiHost}
            />
            <div className={`mobile ${isScrolled ? "isScrolled" : ""}`}>
              <WalletUser
                wallet={wallet.data}
                blockchainSlug={blockchainSlug}
                blockchain={blockchain}
                group={blockchains.find((b) => b.slug === blockchainSlug).group}
                address={address}
                fullAddress={fullAddress}
                action={action}
                apiHost={apiHost}
              />
            </div>
          </div>
        ) : (
          <section className="message noSuccess">
            <Lottie
              animationData={notFoundAnimation}
              loop={true}
              size="240px"
            />
            <h2>There is no {address}</h2>
            <div className="paragraph">
              <p>
                We can't find {fullAddress} on {blockchain} blockchain or
                something went wrong.
              </p>
              <p>
                If you think it's wrong please{" "}
                <Link
                  href={`mailto:gm@nomis.cc?subject=Nomis error&body=Error Id: ${wallet.errorId}`}
                >
                  <a>contact us</a>
                </Link>{" "}
                with sending error ID: "{wallet.errorId}".
              </p>
            </div>
            <button onClick={tryAgainHandler} className="tryAgain">
              Try Again
            </button>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
