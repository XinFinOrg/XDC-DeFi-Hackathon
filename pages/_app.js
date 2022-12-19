import Layout from "../src/components/Layout";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import Web3ModalProvider from "../src/context/Web3ModalProvider";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ModalProvider>
      <Layout>
        <Toaster containerStyle={{ fontSize: "1.2rem" }} />
        <Component {...pageProps} />
      </Layout>
    </Web3ModalProvider>
  );
}

export default MyApp;
