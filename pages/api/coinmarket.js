import axios from "axios";

export default function handler(req, res) {
  var options = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    params: { slug: "xinfin" },
    headers: { "X-CMC_PRO_API_KEY": "24a5dd85-207f-4d50-8ca2-72ff5803843f" },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json({ message: "SUCCESS", result: response.data });
    })
    .catch(function (error) {
      console.error(error);
      res.status(400).json({ message: "ERROR", result: "ERROR" });
    });
}
