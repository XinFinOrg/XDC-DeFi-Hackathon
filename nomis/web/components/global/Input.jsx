import React from "react";
import { useRouter } from "next/router";

import { blockchains } from "../../utilities/blockchains";

import { useHotkeys } from "react-hotkeys-hook";

export default function Input({ fullAddress, blockchain }) {
  const initialInput = getBlockchainId("xdc");
  const activeBlockchain = getBlockchainId(blockchain);

  function getBlockchainId(blockchain) {
    for (let i = 0; i < blockchains.length; i++) {
      if (blockchains[i].slug === blockchain) {
        return i;
      }
    }

    return initialInput;
  }

  const [isOpen, setIsOpen] = React.useState(false);
  const [active, setActive] = React.useState(activeBlockchain);
  const [address, setAddress] = React.useState(fullAddress ? fullAddress : "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState(
    blockchains[initialInput].placeholder
  );
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === router.asPath && setIsLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const router = useRouter();

  const [isMac, setIsMac] = React.useState(null);
  React.useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsMac(userAgent.search("Mac") !== -1 ? true : false);
  });

  const handleClick = () => {
    setIsLoading(true);
    router.push(`/score/${blockchains[active].slug}/${address}`);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  const [hide, setHide] = React.useState(false);

  const inputRef = React.useRef();
  if (isMac) {
    useHotkeys("cmd+/", () => {
      inputRef.current.focus();
      setTimeout(() => setPressed(false), 500);
      setPressed(true);
    });
  } else {
    useHotkeys("ctrl+/", () => {
      inputRef.current.focus();
      setTimeout(() => setPressed(false), 500);
      setPressed(true);
    });
  }

  const ref = React.createRef();

  const groups = blockchains
    .map((b) => b.groupLabel)
    .filter((label, id, arr) => !id || label != arr[id - 1]);

  return (
    <div className="Input">
      <ul
        className={`blockchains ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <li
          className={`blockchainActive ${blockchains[active].groupLabel}`}
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
        >
          <img src={blockchains[active].icon} alt={blockchains[active].item} />
          <span>{blockchains[active].item}</span>
        </li>
        {groups.map((label) => (
          <>
            <h5>{label} Score</h5>
            {blockchains.map((blockchain, id) => {
              if (blockchain.groupLabel === label)
                return (
                  <li
                    key={blockchain.item + blockchain.group}
                    className={
                      id === active
                        ? `blockchain ${label} active`
                        : `blockchain ${label}`
                    }
                    onClick={() => {
                      setPlaceholder(blockchains[id].placeholder);
                      setActive(id);
                      setIsOpen(!isOpen);
                      ref.current.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <img src={blockchain.icon} alt={blockchain.item} />
                    <span>{blockchain.item}</span>
                  </li>
                );
            })}
          </>
        ))}
      </ul>
      <div className="field">
        <div className="inputWrapper">
          <input
            ref={inputRef}
            type="text"
            id="fullAddress"
            placeholder={placeholder}
            name="address"
            required
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={handleEnter}
            defaultValue={address}
            autoComplete="true"
            onFocus={() => setHide(!hide)}
            onBlur={() => setHide(!hide)}
          />
          <div className={`loading${isLoading ? " isLoading" : ""}`}>
            Loading
          </div>
          <div className="shortcut">{isMac ? "cmd+/" : "ctrl+/"}</div>
        </div>
        <button onClick={handleClick} className="button callout"></button>
      </div>
    </div>
  );
}
