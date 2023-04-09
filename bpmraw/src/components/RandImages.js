/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../styles/variables/colors";

const deviceWidth = Dimensions.get("window").width;

export default function RandImages(props) {
  let images = styles.image;
  let imagesContainer = styles.imagesContainer;

  if (deviceWidth > 440) {
    images = styles.image_Tablet;
    imagesContainer = styles.imagesContainer_Tablet;
  }
  return (
    <View style={imagesContainer}>
      {props.characters.map((a, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.clickEvent(a);
            }}
            key={i}
          >
            <Image source={a} alt="" style={images} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    width: deviceWidth < 380 ? 320 : 400,
    height: deviceWidth < 380 ? 340 : 450,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.$Black,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: deviceWidth < 380 ? 90 : 115,
    height: deviceWidth < 380 ? 100 : 140,
    borderColor: Colors.$CoolWhite,
    borderRadius: 2,
    borderWidth: 1,
    margin: 2,
    resizeMode: "cover",
  },
  imagesContainer_Tablet: {
    width: 720,
    height: 650,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.$Black,
    justifyContent: "center",
    overflow: "hidden",
  },
  image_Tablet: {
    width: 165,
    height: 190,
    borderColor: Colors.$CoolWhite,
    borderRadius: 2,
    borderWidth: 1,
    margin: 10,
    resizeMode: "cover",
  },
});
