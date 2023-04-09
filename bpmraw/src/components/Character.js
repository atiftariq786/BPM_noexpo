/* eslint-disable no-unused-vars */
import { Image, Pressable } from "react-native";

// the onClick function is defined as a callback so that the clicked elements value
// can be passed to props.clickEvent to check if the image has been clicked or not
export default function Character(props) {
  return (
    <Pressable
      onPress={() => {
        props.clickEvent(props.name);
      }}
    >
      <Image source={props.name} alt="" />
    </Pressable>
  );
}
