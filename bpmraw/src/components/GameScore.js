/* eslint-disable no-unused-vars */
import { StyleSheet, View, Text } from "react-native";
import Colors from "../styles/variables/colors";

export default function GameScore(props) {
  return (
    <View>
      <Text style={styles.power}>Super Power : {props.power}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  power: {
    color: Colors.$CoolWhite,
    textAlign: "left",
  },
});
