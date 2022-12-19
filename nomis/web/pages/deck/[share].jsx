import { useRouter } from "next/router";
import React from "react";

export default function Arty({ share }) {
  const link =
    share.share === "arty"
      ? "https://www.figma.com/proto/REhTAwFYA9mjkqYjV6C8HF/Nomis-Deck?node-id=18%3A338&viewport=2850%2C1096%2C0.13&scaling=min-zoom&starting-point-node-id=162%3A1123&show-proto-sidebar=0"
      : share.share === "alex"
      ? "https://www.figma.com/proto/REhTAwFYA9mjkqYjV6C8HF/Nomis-Deck?node-id=18%3A338&viewport=2850%2C1096%2C0.13&scaling=min-zoom&starting-point-node-id=128%3A2720&show-proto-sidebar=0"
      : share.share === "vitalii"
      ? "https://www.figma.com/proto/REhTAwFYA9mjkqYjV6C8HF/Nomis-Deck?node-id=18%3A338&viewport=2850%2C1096%2C0.13&scaling=min-zoom&starting-point-node-id=171%3A708&show-proto-sidebar=0"
      : "";
  const router = useRouter();
  React.useEffect(() => {
    router.push(link);
  }, []);
  return null;
}

export async function getServerSideProps(context) {
  const { share } = context.query;
  console.log(share);
  return {
    props: { share: { share } },
  };
}
