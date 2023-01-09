import React from "react";

import { XummPkce } from "xumm-oauth2-pkce";
import { convertStringToHex } from "xrpl";
import { Score } from "./Card";

export default function MintScoreXrp(props) {
  const [sdk, setSdk] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [buttonLabel, setButtonLabel] = React.useState('Connect Wallet');

  const auth = new XummPkce(props.xummApiKey);

  const signedInHandler = (authorized) => {
    setSdk(authorized.sdk);
    setUser({ jwt: authorized.jwt, me: authorized.me });
    setButtonLabel("Mint Your Score");

    // show logout and mint
  };

  auth.on("error", (error) => {
    console.log("error", error);
  });

  auth.on("retrieved", async () => {
    auth.state().then((state) => {
      if (state) {
        setUser(state.me);
        signedInHandler(state);
        setButtonLabel("Mint Your Score");
      }
    });
  });

  const login = () => {
    return auth
      .authorize()
      .then(signedInHandler)
      .catch((e) => {
        console.log("Auth error", e);
      });
  };

  const logout = () => {
    auth.logout();
    setSdk(null);
    setUser(null);
    setButtonLabel("Connect Wallet");
    console.log('logged out');
  };

  const mint = () => {

    let domain = window.location.origin === "http://localhost:3000" 
        ? "https://test.nomis.cc" 
        : window.location.origin;

    const payload = {
      txjson: {
        TransactionType: "NFTokenMint",
        Account: user.me.account,
        TransferFee: 0,
        NFTokenTaxon: 0,
        Flags: 1,
        Fee: "10",
        URI: convertStringToHex(
          `${domain}/score/ripple/${user.me.account}`
        ),
        Memos: [
          {
            Memo: {
              MemoType: convertStringToHex(domain),
              MemoFormat: convertStringToHex("text/plain"),
              MemoData: convertStringToHex(score * 100 + ""),
            },
          },
        ],
      },
    };

    sdk.payload
      .createAndSubscribe(payload, (payloadEvent) => {
        if (typeof payloadEvent.data.signed !== "undefined") {
          return payloadEvent.data;
        }
      })
      .then(({ created, resolved }) => {
        alert(
          created.pushed
            ? "Now check Xumm, there should be a push notification + sign request in your event list waiting for you ;)"
            : "Now check Xumm, there should be a sign request in your event list waiting for you ;) (This would have been pushed, but it seems you did not grant Xumm the push permission)"
        );

        resolved.then((payloadOutcome) => {
          console.log('payload outcome: ' + payloadOutcome);
        });
      })
      .catch((e) => {
        alert("Mint error", e.message);
      });
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpen = () => {
    login();
    if (user) {
      setIsOpen(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 200);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      logout();
    }, 200);
  };

  if (user) {
    fetch(`${props.apiHost}/api/v1/ripple/wallet/${user.me.account}/score`)
      .then((response) => response.json())
      .then((data) => setScore(data.data ? data.data.score : 0.43));
  }

  return (
    <section className="mintButton">
      <button className="goMint" onClick={handleOpen}>
        {buttonLabel}
      </button>
      {isOpen ? (
        <>
          <div
            className={`overlay${isVisible ? " visible" : ""}`}
            onClick={handleClose}
          ></div>
          <section className={`mint${isVisible ? " visible" : ""}`}>
            <div className="container">
              <div className="heading">
                <h3>Mint My Score</h3>
                <div className="close" onClick={handleClose}>
                  close
                </div>
              </div>
              <div className="wallet">
                <h4>Connected Wallet Address</h4>
                <p className="address">{user.me.account}</p>
              </div>

              <Score wallet={{ score: score, stats: { noData: false } }} />

              {/* <div className="token">
                <h4>My Nomis Token on {props.blockchain}</h4>
                <p>Minted Token: {scoreTokenValue}</p>
              </div> */}

              <div className="action">
                <button type="submit" className="button" onClick={mint}>
                  Mint Score Token
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}