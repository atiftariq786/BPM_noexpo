/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../styles/variables/colors";

export default function MissionTitle(props) {
  const mission = useSelector((state) => state.bpmGame.mission);
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  let missionTitle = "";
  if (mission === 1) {
    missionTitle = "Mission-1 Avengers in way";
  }
  if (mission === 2) {
    missionTitle = "Mission-2 Batman in Action";
  }
  if (mission === 3) {
    missionTitle = "Mission-3 The Black Panther";
  }
  return (
    <View>
      <Text style={styles.title}>{missionTitle}</Text>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    title: {
      color: Colors.$Yellow,
      textAlign: "center",
      fontSize: deviceWidth > 440 ? 24 / fontScale : 14 / fontScale,
    },
  });
