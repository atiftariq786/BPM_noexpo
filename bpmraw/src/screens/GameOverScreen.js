/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { gameSliceActions } from "../store/redux/gameState";
import Colors from "../styles/variables/colors";

export default function GameOverScreen(props) {
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.bpmGame.navigation);
  const pageRefresh = useSelector((state) => state.bpmGame.pageRefresh);

  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  function mainHandler() {
    dispatch(gameSliceActions.showWarningModal(false));
    props.hideGameOverModal(!props.showGameOverModal);
    setTimeout(() => navigation.navigate("Main"), 500);
    //dispatch(gameSliceActions.updateScoreRecords());
  }
  function hideGameOverModal() {
    props.hideGameOverModal(!props.showGameOverModal);
    navigation.navigate("Missions");
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    dispatch(gameSliceActions.showWarningModal(false));
    //dispatch(gameSliceActions.updateScoreRecords());
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showGameOverModal}
        // onRequestClose={() => {

        //   props.hideGameOverModal(!props.showGameOverModal);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Game Over!</Text>
            <Text style={styles.unlocked}>New Mission Locked</Text>
            <Image
              style={styles.image}
              source={require("../assets/gotImages/gameover.gif")}
            ></Image>

            <Text style={styles.modalText}></Text>
            <Text style={styles.motivationTxt}>
              Play more to improve your brain memory!
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.MainMenuBtn}
                onPress={hideGameOverModal}
              >
                <Text style={styles.textStyle}>Restart Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.restartBtn} onPress={mainHandler}>
                <Text style={styles.textStyle}>Main Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;

const makeStyles = (fontScale) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: 140,
      margin: 2,
      opacity: 0.6,
      backgroundColor: Colors.$Grey,
      resizeMode: "stretch",
    },
    modalView: {
      width: "90%",
      height: "70%",
      margin: 20,
      backgroundColor: Colors.$DarkGrey,
      borderRadius: 20,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      opacity: 0.95,
      padding: 15,
      alignItems: "center",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      marginTop: 8,
      color: Colors.$Red,
      fontSize: deviceWidth < 380 ? 20 / fontScale : 24 / fontScale,
      textAlign: "center",
    },
    unlocked: {
      color: Colors.$CoolWhite,
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
      marginBottom: 20,
    },
    motivationTxt: {
      color: Colors.$CoolWhite,
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
      marginBottom: 20,
    },

    buttonsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    restartBtn: {
      width: 110,
      backgroundColor: Colors.$Grey,
      borderRadius: 4,
      margin: 5,
      paddingVertical: 12,
      textAlign: "center",
      alignSelf: "center",
    },
    MainMenuBtn: {
      width: 110,
      backgroundColor: Colors.$CoolBlue,
      borderRadius: 4,
      margin: 5,
      paddingVertical: 12,
      alignSelf: "center",
    },
    textStyle: {
      color: Colors.$CoolWhite,
      fontWeight: "bold",
      alignSelf: "center",
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
    },
    modalText: {
      marginTop: 10,
      alignSelf: "center",
      color: Colors.$CoolWhite,
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
    },
  });
