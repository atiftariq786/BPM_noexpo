/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { gameSliceActions } from "../store/redux/gameState";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Colors from "../styles/variables/colors";
export default function Footer({ setShowModal }) {
  const dispatch = useDispatch();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  function warningHandler() {
    dispatch(gameSliceActions.showWarningModal(true));
  }
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity onPress={warningHandler}>
        <Text style={styles.footer}>Exit Game</Text>
      </TouchableOpacity>
      <View style={styles.loadingFooterContainer}>
        <Text style={styles.web}>ATdevstudio</Text>
        <Text style={styles.copyright}>@Copyright 2022</Text>
      </View>

      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={styles.footer}>Game Rules</Text>
      </TouchableOpacity>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    rootContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      margin: 10,
    },
    footer: {
      color: Colors.$CoolWhite,
      fontSize: 20 / fontScale,
    },
    loadingFooterContainer: {
      alignItems: "center",
      paddingBottom: 10,
    },
    copyright: {
      color: Colors.$Grey,
      fontSize: 10 / fontScale,
    },
    web: {
      color: Colors.$Grey,
      fontSize: 18 / fontScale,
    },
  });
