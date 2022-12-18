import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  TextInput,
} from "react-native";
import { styles } from "../constants/Styles";
import { useTheme } from "@react-navigation/native";
import CustomSwitch from "../components/CustomSwitch";
import RPC from "../../ethersRPC"; // for using ethers.js
import { toast } from "@backpackapp-io/react-native-toast";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [selectTab, setSelectTab] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const { colors } = useTheme();


  const onSelectSwitch = (value: React.SetStateAction<number>) => {
    setSelectTab(value);
  };

  return (
    <SafeAreaView>
      <CustomSwitch
        selectionMode={1}
        option1="Owned"
        option2="Available"
        onSelectSwitch={onSelectSwitch}
      />
      {selectTab == 1 && <Text>Welcome</Text>}
      {selectTab == 2 && <Text>Get Comfy</Text>}

    </SafeAreaView>
  );
}
