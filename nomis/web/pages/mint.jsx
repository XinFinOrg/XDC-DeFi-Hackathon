import dynamic from "next/dynamic";

export default function Mint() {
  const Mint = dynamic(() => import("../components/MintScore"), {
    ssr: false,
  });
  return (
    <>
      <Mint />
    </>
  );
}
