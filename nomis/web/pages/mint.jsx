import dynamic from "next/dynamic";

export default function Mint() {
  const Mint = dynamic(() => import("../components/MintScoreEvm"), {
    ssr: false,
  });
  return (
    <>
      <Mint />
    </>
  );
}
