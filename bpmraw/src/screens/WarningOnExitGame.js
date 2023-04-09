/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
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

export default function WarningOnExitGame() {
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.bpmGame.navigation);
  const showWarning = useSelector((state) => state.bpmGame.warningModal);
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  function exitGameHandler() {
    hideModal();
    dispatch(gameSliceActions.updateScoreRecords());
    navigation.navigate("Main");
  }
  function hideModal() {
    dispatch(gameSliceActions.showWarningModal(false));
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showWarning}
        // onRequestClose={() => {
        //   dispatch(gameSliceActions.showWarningModal(false));
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Warning!</Text>
            <Text style={styles.warningText}>
              Are you sure you want to leave while mission in progress!
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.exitBtn}
                onPress={exitGameHandler}
              >
                <Text style={styles.textStyle}>Exit Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueBtn} onPress={hideModal}>
                <Text style={styles.textStyle}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
      height: 220,
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
      fontSize: deviceWidth < 380 ? 16 / fontScale : 20 / fontScale,
      textAlign: "center",
    },
    warningText: {
      marginTop: 20,
      color: Colors.$Black,
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
      textAlign: "center",
    },
    buttonsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: deviceWidth < 380 ? 20 : 25,
    },
    exitBtn: {
      backgroundColor: Colors.$CoolRed,
      borderRadius: 4,
      margin: 10,
      paddingVertical: 6,
      width: 110,
      alignSelf: "center",
    },
    continueBtn: {
      backgroundColor: Colors.$CoolBlue,
      borderRadius: 4,
      margin: 10,
      paddingVertical: 6,
      width: 110,
      alignSelf: "center",
    },
    textStyle: {
      color: Colors.$CoolWhite,
      textAlign: "center",
      alignSelf: "center",
      textAlignVertical: "center",
      fontWeight: "bold",
      fontSize: deviceWidth < 380 ? 16 / fontScale : 18 / fontScale,
      padding: 10,
    },
  });
