/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
  Image,
  Alert,
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
import { BackHandler } from "react-native";
import Colors from "../styles/variables/colors";

export default function QuiteGame() {
  const dispatch = useDispatch();
  const quiteGameStatus = useSelector((state) => state.bpmGame.quiteGameStatus);
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  function quiteGameHandler() {
    if (quiteGameStatus) {
      BackHandler.exitApp();
    }
    hideModal();
  }
  function hideModal() {
    dispatch(gameSliceActions.quiteGame(false));
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={quiteGameStatus}
        // onRequestClose={() => {
        //   dispatch(gameSliceActions.showWarningModal(false));
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Warning!</Text>
            <Text style={styles.exitGameText}>
              Are you sure you want to leave the game?
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={quiteGameHandler}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noBtn} onPress={hideModal}>
                <Text style={styles.textStyle}>No</Text>
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
      marginTop: 22,
    },
    modalView: {
      width: "90%",
      height: 260,
      margin: 20,
      backgroundColor: Colors.$CoolWhite,
      borderRadius: 20,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      opacity: 1.9,
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
      fontSize: deviceWidth < 380 ? 20 / fontScale : 22 / fontScale,
      textAlign: "center",
    },
    exitGameText: {
      marginTop: 20,
      color: Colors.$Black,
      fontSize: deviceWidth < 380 ? 16 / fontScale : 18 / fontScale,
      textAlign: "center",
    },
    buttonsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: deviceWidth < 380 ? 25 : 40,
    },
    yesBtn: {
      backgroundColor: Colors.$CoolRed,
      borderRadius: 4,
      margin: 10,
      paddingVertical: 5,
      width: 110,
      alignSelf: "center",
    },
    noBtn: {
      backgroundColor: Colors.$CoolBlue,
      borderRadius: 4,
      margin: 10,
      paddingVertical: 5,
      width: 110,
      alignSelf: "center",
    },
    textStyle: {
      color: Colors.$CoolWhite,
      textAlign: "center",
      alignSelf: "center",
      textAlignVertical: "center",
      fontSize: deviceWidth < 380 ? 16 / fontScale : 18 / fontScale,
      padding: 10,
      width: 100,
    },
  });
