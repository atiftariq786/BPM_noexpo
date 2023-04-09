/* eslint-disable no-unused-vars */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../styles/variables/colors";

export default function InternetChecker() {
  const showInternetCheckModal = useSelector(
    (state) => state.bpmGame.showInternetCheckModal
  );

  //console.log({ showInternetCheckModal });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!showInternetCheckModal}
      >
        <View style={styles.modalViewContainer}>
          <View>
            <Text style={styles.title}>Connection Error</Text>
          </View>
          <View>
            <Image
              style={styles.image}
              source={require("../assets/Random/nowifi.jpg")}
            ></Image>
          </View>
          <View>
            <Text style={styles.motivationStyle}>No Internet Connection</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "95%",
    height: "95%",
    margin: 20,
    backgroundColor: Colors.$DarkGrey,
    borderRadius: 20,
    borderColor: Colors.$Grey,
    borderWidth: 1,
    opacity: 1.9,
    alignItems: "center",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    // marginTop: 30,
  },
  title: {
    // marginTop: 20,
    color: Colors.$Red,
    fontSize: 30,
    textAlign: "center",
  },
  motivationStyle: {
    // marginTop: 24,
    color: Colors.$CoolWhite,
    fontSize: 18,
    textAlign: "center",
  },
});
