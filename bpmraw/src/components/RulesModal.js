/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Colors from "../styles/variables/colors";

export default function RulesModal(props) {
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModal}
        // onRequestClose={() => {
        //   props.setShowModal(!props.showModal);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Game Rules</Text>
            <View>
              <Text style={styles.modalText}>
                {"\u25CF Click on an image to earn points."}
                {"\n"}
                {"\u25CF Memorize which image you clicked"}
                {"\n"}
                {
                  "\u25CF Do not click on the same image twice otherwise Game Over."
                }
                {"\n"}
                {"\u25CF The max score is 9."}
                {"\n"}
                {"\u25CF Medium level difficulties time(30sec/25sec/20sec)."}
                {"\n"}
                {"\u25CF Hard level difficulties time(25sec/20sec/15sec)."}
                {"\n"}
                {"\u25CF Complete the levels and unlock new missions."}
                {"\n"}
              </Text>
              <Text style={styles.improveMemory}>
                {"How to improve Memory?"}
                {"\n"}
                {
                  "\u25CF To imporve memeory you should play more and keep score more than 7."
                }
                {"\n"}
                {
                  "\u25CF Only average and great memeory user can see score records."
                }
                {"\n"}
                {"\u25CF Less than 5 score user should improve brain memory."}
                {"\n"}
                {"\n"}
                Great Memory Score : 8-9 {"\n"}
                Average Memory Score : 5-7 {"\n"}
                Poor Memory Score : 0-4 {"\n"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => props.setShowModal(!props.showModal)}
            >
              <Text style={styles.textStyle}>Continue</Text>
            </TouchableOpacity>
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
      alignContent: "center",
    },
    modalView: {
      width: "90%",
      height: "90%",
      margin: 10,
      backgroundColor: Colors.$DarkGrey,
      borderRadius: 20,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      opacity: 0.98,
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
      marginTop: 0,
      color: Colors.$Yellow,
      fontSize: 22 / fontScale,
    },
    buttonClose: {
      backgroundColor: Colors.$Grey,
      borderRadius: 4,
    },
    textStyle: {
      color: Colors.$CoolWhite,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16 / fontScale,
      width: deviceWidth < 380 ? 100 : 144,
      paddingVertical: 8,
      alignSelf: "center",
      textAlignVertical: "center",
    },
    modalText: {
      marginTop: 10,
      color: Colors.$CoolWhite,
      textAlign: "justify",
      fontSize: 14 / fontScale,
    },
    improveMemory: {
      marginTop: 0,
      color: Colors.$CoolOrange,
      textAlign: "justify",
      fontSize: 14 / fontScale,
    },
  });
