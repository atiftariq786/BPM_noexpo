/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Colors from "../styles/variables/colors";

export default function Title() {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  return (
    <View>
      <Text style={styles.title}>Bulletproof Memory</Text>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    title: {
      color: Colors.$CoolWhite,
      textAlign: "center",
      fontSize: 24 / fontScale,
      // marginTop: deviceWidth < 380 ? 0 : 20,
    },
  });
