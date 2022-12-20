/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, ColorSchemeName } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../../constants/Colors";
import { styles } from "../../constants/Styles";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { toast } from "@backpackapp-io/react-native-toast";
import { RootStackParamList } from "../../../types";

// Redux
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../store/login';

// import { useAuthenticationStatus } from "@nhost/react";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? Colors.darkTheme : Colors.defaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  // const dispatch = useDispatch();
  const loggedin = useSelector((state: RootState) => state.login.loggedIn); 
  const loading = useSelector((state: RootState) => state.login.loading); 
  const guest = useSelector((state: RootState) => state.login.guest); 

  React.useEffect(() => {
    // dispatch(setLogin(true));
    if (loggedin && !guest) {
      toast.success("Welcome to the app!", {
        width: 300,
      });
    }
  }, []);

  if (loading) {
    console.log('Loading...')
    return <ActivityIndicator size="large" style={styles.loader} />;
  }


  return (
    <>
      <Stack.Navigator>
        {!loggedin && !guest ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Root"
            component={AppStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  );
}
