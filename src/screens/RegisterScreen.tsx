import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Components
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { toast } from '@backpackapp-io/react-native-toast';

// Image Assets
import RegistrationSVG from '../assets/images/misc/registration.svg'
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import CustomButton from '../components/CustomButton';
import { useTheme } from '@react-navigation/native';

// Web3Auth SDK + Tools
import { WEB3AUTH_CLIENT_ID, WEB3AUTH_PROVIDERURL } from "@env"
import Web3Auth, { OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { ethers } from 'ethers';
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Constants, { AppOwnership } from 'expo-constants';
import { useNhostClient } from '@nhost/react';
global.Buffer = global.Buffer || Buffer;

const scheme = "vate";
const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

// nHost SDK + Tools
// import Layout from '../constants/Layout'
// import { auth } from '../helpers/nhostSdk';
// const deviceWidth = Layout.window.width;



const RegisterScreen: React.FunctionComponent = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  // setup web3auth state
  const [key, setKey] = useState("");
  const [address, setAddress] = useState<string>("");


  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(false)

  // Setup nhost state
  const nhost = useNhostClient();


  // Uses Web3Auth SDK to generate a Wallet Private key from email of PROVIDER passed in
  // Then attempts to generate a wallet address from the private key from sdk
  // needs added randomness for security
  const ProviderRegister = async (Provider: string) => {
    const id = toast.loading('Registering with provider...');

    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);
    try {
      console.log("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId: WEB3AUTH_CLIENT_ID,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: Provider,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });
      const ethersProvider = ethers.getDefaultProvider(WEB3AUTH_PROVIDERURL);
      setUserInfo(info);
      setKey(info.privKey)

      const wallet = new ethers.Wallet(key, ethersProvider);
      setAddress(wallet.address)
      console.log("Logged In", address);
      setCurrentWalletAddress(address)
      toast.success('Success!', {
        width: 300
      });
    } catch (e) {
      setError(true)
      console.log(e);
    }
  };

  // Use Nhost to sign up user for a Wallet Address from email
  const EmailRegister = async (email: string) => {
    const id = toast.loading('Register by email...', {
      width: 300
    });

    setTimeout(() => {
      toast.dismiss(id);
    }, 3000);

    console.log('Email was: ', email)

    if (email.length < 80 && emailRegex.test(email)) {
      console.log(`Wallet Entry ${email} was valid, Use Nhost to create user using magic link + web3auth sdk`);

      // Use Nhost here to Magic Link Provided email
      const result = await nhost.auth.signIn({ email });

      if (result) {
        toast.success('Check your email!', {
          width: 300
        });
      }


      // Create PopUp Toast to show address
      if (currentWalletAddress) {
        toast.success(`Your Wallet Address is ${currentWalletAddress}`, {
          width: 300
        });
      }

      if (result.error) {
        // Throw error toast
        toast.error(result.error.message)
      } else {
        navigation.navigate("Keygen");
      }

      console.log(result);
      setCurrentWalletAddress(address)
      toast.success('Success!', {
        width: 300
      });
    } else {
      // Throw error toast
      toast.error('wtf', {
        width: 300
      })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <RegistrationSVG
            height={`100%`}
            width={`100%`}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />

        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: colors.textLight,
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => ProviderRegister("google")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("apple")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ProviderRegister("facebook")}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.border,
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: colors.textLight, marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={(value: string) => setEmail(value)}
        />

        <CustomButton label={'Register'} onPress={() => EmailRegister(email)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{ color: colors.textLight }}>Already registered? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

