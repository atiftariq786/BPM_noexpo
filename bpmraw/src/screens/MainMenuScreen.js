/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect, useCallback} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  BackHandler,
  SafeAreaView,
  Button,
  useWindowDimensions,
} from 'react-native';
import {gameSliceActions} from '../store/redux/gameState';
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Title from '../components/Title';
import RulesModal from '../components/RulesModal';
import QuiteGame from './QuiteGame';
import Colors from '../styles/variables/colors';
import InternetChecker from '../../src/components/InternetChecker';
import NetInfo from '@react-native-community/netinfo';

export default function MainMenuScreen({navigation}) {
  const dispatch = useDispatch();
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const userName = useSelector(state => state.bpmGame.userName);
  //const adsCounter = useSelector(state => state.bpmGame.adsCounter);
  //const showInterstiAd = useSelector(state => state.bpmGame.showInterstiAd);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(gameSliceActions.routing(navigation));
  }, []);
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected? internetChecker Modal", state.isConnected);
      dispatch(gameSliceActions.internetCheck(state.isConnected));
      // setTimeout(
      //   () => dispatch(gameSliceActions.internetCheck(state.isConnected)),
      //   1000
      // );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatch(gameSliceActions.quiteGame(true));
        if (route.name === 'MainMenuScreen' || route.name === 'Main') {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  useEffect(() => {
    getProfileData();
    getUserScoreData();
    getMissionData();
    getUnlockedHardMission();
    let currentDate = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();

    let fullDate = month + 1 + '/' + currentDate + '/' + year;
    let time = hours + ':' + min;
    let dateAndTime = fullDate + '  ' + time;
    //console.log({ dateAndTime });
    dispatch(gameSliceActions.date(dateAndTime));
  }, [pageRefresh]);
  //================Get local storage data Functions ========================
  const getUnlockedHardMission = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@hardMissionUnlocked');
      let data = JSON.parse(jsonValue);
      dispatch(
        gameSliceActions.updateHardMissionUnlocked(data.unlockedHardMisssion),
      );
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getProfileData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@profileData');
      let data = JSON.parse(jsonValue);

      dispatch(gameSliceActions.updateProfileData(data[data.length - 1]));
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getUserScoreData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data');
      //let data = JSON.parse(jsonValue);
      dispatch(gameSliceActions.resetScoreArr(JSON.parse(jsonValue)));
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getMissionData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@missionData');
      let missionData = JSON.parse(jsonValue);
      dispatch(gameSliceActions.updateAllLevel(missionData));
    } catch (e) {
      // error reading value
    }
  };
  //==================Ads Handler Functions =================================
  //console.log({ adsCounter });

  function gameRuleHandler() {
    //dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    // if (adsCounter % 3 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log({error}, 'ad error');
    //   }
    // }
    setShowModal(true);
  }
  function settingHandler() {
    // dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    // if (adsCounter % 3 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log('Ads error setting screen', error);
    //   }
    // }
    navigation.navigate('Setting');
  }
  function recordsHandler() {
    // dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    // if (adsCounter % 3 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log('Ads error record screen', error);
    //   }
    // }
    navigation.navigate('Save');
  }
  function profileHandler() {
    // dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    // if (adsCounter % 3 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log({error}, 'profileHandler');
    //   }
    // }
    navigation.navigate('SuperHeros');
  }
  // Play games btn logic
  let result = (
    <TouchableOpacity onPress={playGameHandler}>
      <Text style={styles.playGames}>Play Games</Text>
    </TouchableOpacity>
  );
  function playGameHandler() {
    if (userName === 'player-1') {
      result = navigation.navigate('SuperHeros');
    } else {
      result = navigation.navigate('Missions');
    }
    // dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    // if (adsCounter % 2 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log({error}, 'playGameHandler');
    //   }
    // }
  }
  //=============================================================================
  return (
    <View style={styles.rootContainer}>
      <View style={styles.loadingImageConatiner}>
        <ImageBackground
          style={styles.loadingImage}
          source={require('../assets/gotImages/loading5.png')}>
          <View style={styles.titleContainer}>
            <Title />
          </View>
        </ImageBackground>

        <TouchableOpacity onPress={gameRuleHandler}>
          <Text style={styles.loadingText}>Game Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={settingHandler}>
          <Text style={styles.loadingText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={recordsHandler}>
          <Text style={styles.loadingText}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={profileHandler}>
          <Text style={styles.loadingText}>Profile</Text>
        </TouchableOpacity>
        {result}
      </View>

      <View>
        <RulesModal showModal={showModal} setShowModal={setShowModal} />
        <InternetChecker />
      </View>

      <View>
        <QuiteGame />
      </View>
      <View style={styles.loadingFooterContainer}>
        <Text style={styles.web}>ATdevstudio</Text>
        <Text style={styles.copyright}>@Copyright 2022</Text>
      </View>
    </View>
  );
}
const deviceWidth = Dimensions.get('window').width;
const makeStyles = fontScale =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.$Black,
    },
    titleContainer: {
      backgroundColor: Colors.$DarkGrey,
      marginTop: 45,
      opacity: 0.7,
      paddingHorizontal: 30,
      paddingVertical: 3,
      borderRadius: 6,
      borderWidth: 1,
      alignSelf: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
    },
    title: {
      marginTop: 0,
    },
    loadingImageConatiner: {
      flex: 1,
      alignItems: 'center',
      margin: 0,
      resizeMode: 'contain',
    },
    loadingImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      resizeMode: 'contain',
    },
    loadingText: {
      width: deviceWidth < 380 ? 130 : 144,
      // height: deviceWidth < 380 ? 35 : 50,
      color: Colors.$CoolWhite,
      fontSize: 16 / fontScale,
      marginTop: 12,
      borderColor: Colors.$Grey,
      borderRadius: 6,
      borderWidth: 1,
      paddingVertical: 8,
      alignSelf: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    playGames: {
      width: deviceWidth < 380 ? 130 : 144,
      // height: deviceWidth < 380 ? 35 : 50,
      color: Colors.$CoolWhite,
      fontSize: 16 / fontScale,
      marginTop: 12,
      borderColor: Colors.$Grey,
      borderRadius: 6,
      paddingVertical: 8,
      borderWidth: 1,
      alignSelf: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
      backgroundColor: Colors.$CoolBlue,
    },
    loadingFooterContainer: {
      alignItems: 'center',
      marginTop: deviceWidth < 380 ? 10 : 40,
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
