import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { domainName, demo_private_key } from "./const/yourDetails";



export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY || demo_private_key,
  domain: domainName,
});
