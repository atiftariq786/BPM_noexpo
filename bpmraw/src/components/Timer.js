/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { gameSliceActions } from "../store/redux/gameState";
import Colors from "../styles/variables/colors";

const deviceWidth = Dimensions.get("window").width;

export default function Timer(props) {
  const dispatch = useDispatch();
  const gameTime = useSelector((state) => state.bpmGame.timer);
  const [time, setTime] = useState(gameTime);

  let timerTablet = null;
  let newColorTablet = null;

  if (deviceWidth > 440) {
    timerTablet = styles.timer_tablet;
  } else {
    timerTablet = styles.timer;
  }
  if (deviceWidth > 440) {
    newColorTablet = styles.newColorTablet;
  } else {
    newColorTablet = styles.newColor;
  }
  useEffect(() => {
    //console.log('set time')
    setTime(gameTime);
  }, [gameTime]);

  //const timerRef = useRef(gameTime);
  //========================================================================
  useEffect(() => {
    //console.log('useEffect', gameTime, timerRef, time)
    const timerId = setInterval(() => {
      //console.log('setinterval')

      if (gameTime === 0) {
        dispatch(gameSliceActions.setGameOverModal(true));
        // dispatch(gameSliceActions.timerReset())
      }
      if (time < 0) {
        //console.log('timerRef.current < 0')
        clearInterval(timerId);
      } else {
        dispatch(gameSliceActions.timerReset(time));
        setTime(time - 1);
        //setTime(timerRef.current)
      }
    }, 500);
    return () => {
      clearInterval(timerId);
    };
  }, [time]);

  return (
    <View>
      <Text style={gameTime < 10 ? newColorTablet : timerTablet}>
        {" "}
        {gameTime}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timer: {
    color: Colors.$Yellow,
    fontSize: deviceWidth < 380 ? 24 : 30,
  },
  newColor: {
    color: Colors.$Red,
    fontSize: deviceWidth < 380 ? 24 : 30,
  },
  timer_tablet: {
    color: Colors.$Yellow,
    fontSize: 60,
  },
  newColorTablet: {
    color: Colors.$Red,
    fontSize: 60,
  },
});
