import React from "react";
import { Card } from "react-native-paper";
import { Text } from "./Themed";
import { useTheme } from "@react-navigation/native";

const FavorCard = (item, navigation) => {
  const { colors } = useTheme();

  console.log("datas", item.item[3]);
  return (
    <Card
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        width: "80%",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          padding: 10,
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        "{item.item[1]}"
      </Text>
      <Text
        style={{
          fontSize: 10,
          padding: 2,
        }}
      >
        - {item.item[3].toString()}
      </Text>
    </Card>
  );
};

export default FavorCard;
