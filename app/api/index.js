import axios from "axios";

const CMP_AUTH_KEY = process.env.CM_API;

export const fetchPrice = () => {
  try {
    axios
      .get(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=XDC&CMC_PRO_API_KEY=${CMP_AUTH_KEY}`
      )
      .then((data) => {
        console.log("Current price fetched");
        const price = data.data.XDC.quote.USD.price;
        console.log(price);
        return price;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
