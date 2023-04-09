/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import * as Progress from "react-native-progress";
import Colors from "../styles/variables/colors";

export default function ProgressBar(props) {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  const username = useSelector((state) => state.bpmGame.userName);

  const clickedprofileImage = useSelector(
    (state) => state.bpmGame.profileImageId
  );

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profileImage}
          source={clickedprofileImage}
          alt=""
        ></Image>
        <Text style={styles.userName}>{username}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Text style={styles.score}>Score: {props.score}</Text>
        <Progress.Bar
          style={styles.progressBar}
          progress={props.score / 9}
          width={200}
          color={Colors.$Orange}
          borderWidth={2}
          borderColor={Colors.$CoolWhite}
        ></Progress.Bar>
        <Text style={styles.progressToTarget}>
          Progress to target: {Math.floor((props.score / 9) * 100)}%
        </Text>
      </View>
      <View style={styles.victoryIconContainer}>
        <Image
          style={styles.victoryIcon}
          source={require("../assets/gotImages/victoryIcon.png")}
        ></Image>
      </View>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;
const makeStyles = (fontScale) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      height: deviceWidth < 380 ? 70 : 80,
    },
    profileImage: {
      width: deviceWidth < 380 ? 50 : 60,
      height: deviceWidth < 380 ? 40 : 50,
      padding: 0,
      marginTop: 0,
      marginRight: 5,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      resizeMode: "stretch",
    },
    userName: {
      color: Colors.$Grey,
      alignSelf: "center",
      fontSize: 12 / fontScale,
    },
    progressBarContainer: {
      alignItems: "center",
    },
    victoryIcon: {
      width: deviceWidth < 380 ? 60 : 70,
      height: 80,
      color: Colors.$CoolWhite,
      borderWidth: 1,
      resizeMode: "stretch",
    },
    score: {
      color: Colors.$CoolWhite,
      fontSize: 18 / fontScale,
    },
    progressToTarget: {
      color: Colors.$CoolWhite,
      fontSize: 18 / fontScale,
    },
  });
