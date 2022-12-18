import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as WebBrowser from "expo-web-browser";

// Theme
import { useTheme } from "@react-navigation/native";
import Constants, { AppOwnership } from "expo-constants";

// Components
import { toast } from "@backpackapp-io/react-native-toast";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

// Image Assets
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginSVG from "../assets/images/misc/login.svg";
import AppleSVG from "../assets/images/misc/apple.svg";
import GoogleSVG from "../assets/images/misc/google.svg";
import FacebookSVG from "../assets/images/misc/facebook.svg";
// import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

// WEB3 SDK + Tools
import { WEB3AUTH_CLIENT_ID, WEB3AUTH_PROVIDERURL } from "@env";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as Linking from "expo-linking";
import { Buffer } from "buffer";
import "@ethersproject/shims";
import { ethers } from "ethers";
global.Buffer = global.Buffer || Buffer;
const scheme = Constants?.manifest?.slug;
const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
    Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

// Redux
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setGuest } from '../store/login';

// Nhost
import { useNhostClient } from "@nhost/react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const { colors } = useTheme();
  const nhost = useNhostClient();


  const loggedin = useSelector((state: RootState) => state.login.loggedIn); 
  const dispatch = useDispatch();
  const GuestLogin = () => {
    dispatch(setGuest(true));
    console.log(loggedin)
  }

  // Uses Web3Auth SDK to generate a Wallet Private key from provider
  // Then attempts to generate a wallet address from the private key from sdk
  // Then use nHost to create User Account with wallet address as the password
  // needs added randomness for security
  const Login = async (Provider: string) => {
    const id = toast.loading("Registering with provider...");
    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
    try {
      console.log("Logging in");

      const web3auth = new Web3Auth(WebBrowser, {
        clientId: WEB3AUTH_CLIENT_ID,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
        whiteLabel: {
          name: Constants?.manifest?.name,
          logoLight: "https://web3auth.io/images/logo-light.png",
          logoDark: "https://web3auth.io/images/logo-dark.png",
          defaultLanguage: "en",
          disclaimerHide: true,
          dark: true,
          theme: {
            primary: colors.primary,
          },
        },
      });

      const info = await web3auth
        .login({
          loginProvider: Provider,
          redirectUrl: resolvedRedirectUrl,
          mfaLevel: "none",
          curve: "secp256k1",
        })
        .then((info: any) => {
          console.log("DATA FROM WEB3 AUTH:", info);
          const ethersProvider = ethers.getDefaultProvider(WEB3AUTH_PROVIDERURL);
          // setUserInfo(info);
          // setKey(info.privKey);
          const wallet = new ethers.Wallet(info.privKey, ethersProvider);

          // Create Toast for private key generating wallet address
          if (wallet) toast.success(`Created wallet!: ${wallet?.address}`);

          setAddress(wallet?.address);
          // setEmail(info?.userInfo?.email);
          // setCurrentWalletAddress(wallet?.address);
          // console.log("Logged In", currentWalletAddress);
          // toast.success(`Logged In: ${currentWalletAddress}`);

          if (currentWalletAddress.length > 0 && email.length > 0) {
            try {
              nhost.auth
                .signIn({
                  email: email,
                  password: currentWalletAddress,
                })
                .then((result: any) => console.log(result))
                .then(() =>
                  toast.success("Signed In Successfully!", {
                    width: 300,
                  })
                );
            } catch {
              toast.error("There was an error saving your account!");
            }
          }
        });
      return info;
    } catch (e: any) {
      toast.error(e.toString());
      console.log(e);
    }
  };

  // Use Default Passwordless email sign in
  const DefaultLogin = async (email: string) => {
    try {
      console.log("Address was: ", email);
      if (email.length < 80 && emailRegex.test(email)) {
        console.log(
          `Wallet Entry ${address} was valid, call or create user in DB: `
        );
        toast.success("Logging in with email");

        const web3auth = new Web3Auth(WebBrowser, {
          clientId: WEB3AUTH_CLIENT_ID,
          network: OPENLOGIN_NETWORK.TESTNET, // or other networks
          whiteLabel: {
            name: Constants?.manifest?.name,
            logoLight: "https://web3auth.io/images/logo-light.png",
            logoDark: "https://web3auth.io/images/logo-dark.png",
            defaultLanguage: "en",
            disclaimerHide: true,
            dark: true,
            theme: {
              primary: colors.primary,
            },
          },
        });

        const info = await web3auth
          .login({
            loginProvider: "email_passwordless",
            redirectUrl: resolvedRedirectUrl,
            mfaLevel: "none",
            curve: "secp256k1",
            extraLoginOptions: {
              login_hint: email,
            },
          })
          .then((info: any) => {
            console.log("DATA FROM WEB3 AUTH:", info);
            const ethersProvider =
              ethers.getDefaultProvider(WEB3AUTH_PROVIDERURL);
            // setUserInfo(info);
            // setKey(info.privKey);
            const wallet = new ethers.Wallet(info.privKey, ethersProvider);
            if (wallet) toast.success(`Created wallet!: ${wallet}`);
            // Create Toast for private key generating
            console.log("Logged In", wallet.address);
            toast.success(`Logged In: ${wallet.address}`);
            setAddress(wallet.address);
            // setEmail(email);
            // setCurrentWalletAddress(wallet.address);

            if (currentWalletAddress?.length > 0 && email?.length > 0) {
              try {
                nhost.auth
                  .signUp({ email, password: currentWalletAddress })
                  .then(() =>
                    toast.success(`Account Created Successfully!`, {
                      width: 300,
                    })
                  );
              } catch {
                toast.error("There was an error saving your account!");
              }
            }
          });
        return info;
      } else {
        toast.error("Invalid Email!");
      }
    } catch (e: any) {
      toast.error(e.toString());
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <LoginSVG
              height={300}
              width={300}
              style={{ transform: [{ rotate: "-5deg" }] }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            label={"Email ID"}
            icon={<MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }} />}
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => setEmail(value)} inputType={undefined} fieldButtonLabel={undefined} fieldButtonFunction={undefined} />

          {/* <InputField
          label={error ? 'Error Please Try again' : 'Wallet Address'}
          icon={<Ionicons
            name="wallet"
            size={20}
            color={colors.primary}
            style={{ marginRight: 5 }} />}
          value={address}
          onChangeText={(value: string) => setAddress(value)}
          inputType="wallet"
          keyboardType={undefined} /> */}

          <CustomButton
            label={"Login"}
            onPress={() => { }}
          />

          <Text
            style={{
              textAlign: "center",
              color: colors.text,
              marginBottom: 30,
            }}
          >
            Or, login with ...
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => Login("google")}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Login("apple")}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <AppleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Login("facebook")}
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <FacebookSVG height={24} width={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              New to the app?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Register </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => GuestLogin()}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}> Continue as Guest </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
