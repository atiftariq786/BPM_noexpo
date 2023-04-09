/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  // eslint-disable-next-line no-unused-vars
  TouchableOpacity,
  // eslint-disable-next-line no-unused-vars
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
import Title from '../components/Title';
import {gameSliceActions} from '../store/redux/gameState';
import Colors from '../styles/variables/colors';
//import InterstitialAds from "../components/Ads/InterstitialAds";

export default function MissionListScreen({navigation}) {
  const dispatch = useDispatch();
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);
  //const showInterstiAd = useSelector((state) => state.bpmGame.showInterstiAd);
  //const adsCounter = useSelector((state) => state.bpmGame.adsCounter);
  const blackPantherLevel = useSelector(
    state => state.bpmGame.blackPantherLevel,
  );
  const batmanLevel = useSelector(state => state.bpmGame.batmanLevel);
  const gameOfThroneLevel = useSelector(
    state => state.bpmGame.gameOfThroneLevel,
  );
  const mission = useSelector(state => state.bpmGame.mission);
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const hardMissionUnlocked = useSelector(
    state => state.bpmGame.hardMissionUnlocked,
  );
  const levelDifficultyStatus = useSelector(
    state => state.bpmGame.levelDifficultyStatus,
  );

  const [levelTimerSet, setLevelTimerSet] = useState();
  // eslint-disable-next-line no-unused-vars
  const [imageBorderColor, setImageBorderColor] = useState({
    flex: 1,
    width: '100%',
    borderColor: 'yellow',
    borderRadius: 2,
    borderWidth: 1.5,
    resizeMode: 'stretch',
  });
  // eslint-disable-next-line no-unused-vars
  const [hardMissionStyle, setHardMissionStyle] = useState({
    backgroundColor: 'black',
    borderRadius: 4,
    margin: 3,
    fontSize: 10 / fontScale,
    width: deviceWidth < 380 ? 120 : 122,
    height: 32,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'red',
    borderWidth: 1,
  });

  let isMissionOneLocked = 'Locked';
  let isMissionTwoLocked = 'Locked';
  let isMissionThreeLocked = 'Locked';
  //============

  levelDifficultyStatus === 'hard' && (gameOfThroneLevel || mission === 1)
    ? (isMissionOneLocked = 'unlocked')
    : null;
  levelDifficultyStatus === 'medium' && (gameOfThroneLevel || mission === 1)
    ? (isMissionOneLocked = '')
    : null;
  //==============
  batmanLevel
    ? (isMissionTwoLocked = 'unlocked')
    : (isMissionTwoLocked = 'Locked');
  blackPantherLevel
    ? (isMissionThreeLocked = 'unlocked')
    : (isMissionThreeLocked = 'Locked');

  function hardMissionHanlder(data) {
    if (data === 'medium') {
      dispatch(gameSliceActions.levelDifficultyStatus('medium'));
    }
    if (data === 'hard') {
      dispatch(gameSliceActions.levelDifficultyStatus('hard'));
    }
  }

  useEffect(() => {
    if (!hardMissionUnlocked) {
      dispatch(gameSliceActions.levelDifficultyStatus('medium'));
    }
    if (levelDifficultyStatus === 'hard' && mission === 1) {
      dispatch(gameSliceActions.levelDifficultyStatus('hard'));
      dispatch(gameSliceActions.timerReset(25));
    }
  }, []);

  function startMission(level) {
    // if (adsCounter % 3 === 0) {
    //   try {
    //     showInterstiAd.show();
    //   } catch (error) {
    //     console.log({ error });
    //   }
    // }
    dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    setLevelTimerSet(level);
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    console.log(
      {level},
      {mission},
      {gameOfThroneLevel},
      {batmanLevel},
      {blackPantherLevel},
      'Redux state mission page',
    );

    //Medium Level================================================
    if (
      levelDifficultyStatus === 'medium' &&
      gameOfThroneLevel &&
      level === 1
    ) {
      dispatch(gameSliceActions.timerReset(30));
      dispatch(gameSliceActions.setMission(1));
    }
    if (levelDifficultyStatus === 'medium' && batmanLevel && level === 2) {
      dispatch(gameSliceActions.timerReset(25));
      dispatch(gameSliceActions.setMission(2));
    }
    if (
      levelDifficultyStatus === 'medium' &&
      blackPantherLevel &&
      level === 3
    ) {
      dispatch(gameSliceActions.timerReset(20));
      dispatch(gameSliceActions.setMission(3));
    }
    //Hard Level===================================================
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      gameOfThroneLevel &&
      level === 1
    ) {
      dispatch(gameSliceActions.timerReset(25));
      dispatch(gameSliceActions.setMission(1));
    }
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      batmanLevel &&
      level === 2
    ) {
      dispatch(gameSliceActions.timerReset(20));
      dispatch(gameSliceActions.setMission(2));
    }
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      blackPantherLevel &&
      level === 3
    ) {
      dispatch(gameSliceActions.timerReset(15));
      dispatch(gameSliceActions.setMission(3));
    }
  }
  //Run Mission============================================================================================
  function runSlectedMission() {
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    //Medium Level =======================
    if (
      levelDifficultyStatus === 'medium' &&
      (levelTimerSet === 1 || mission === 1)
    ) {
      dispatch(gameSliceActions.timerReset(30));
      navigation.navigate('startScreen');
    }
    if (
      levelDifficultyStatus === 'medium' &&
      (levelTimerSet === 2 || mission === 2)
    ) {
      dispatch(gameSliceActions.timerReset(25));
      navigation.navigate('startScreen');
    }
    if (
      levelDifficultyStatus === 'medium' &&
      (levelTimerSet === 3 || mission === 3)
    ) {
      dispatch(gameSliceActions.timerReset(20));
      navigation.navigate('startScreen');
    }
    //Hard Level =======================
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      (levelTimerSet === 1 || mission === 1)
    ) {
      dispatch(gameSliceActions.timerReset(25));
      navigation.navigate('startScreen');
    }
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      (levelTimerSet === 2 || mission === 2)
    ) {
      dispatch(gameSliceActions.timerReset(20));
      navigation.navigate('startScreen');
    }
    if (
      hardMissionUnlocked &&
      levelDifficultyStatus === 'hard' &&
      (levelTimerSet === 3 || mission === 3)
    ) {
      dispatch(gameSliceActions.timerReset(15));
      navigation.navigate('startScreen');
    }
  }
  let hardMissions = null;
  if (hardMissionUnlocked) {
    hardMissions = (
      <TouchableOpacity
        style={
          hardMissionUnlocked && levelDifficultyStatus === 'hard'
            ? hardMissionStyle
            : styles.difficultyHardBtn
        }
        onPress={() => hardMissionHanlder('hard')}>
        <Text style={styles.textStyle}>Difficulty Hard</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <View style={styles.difficultyLevelContainer}>
        <TouchableOpacity
          style={
            levelDifficultyStatus === 'medium'
              ? hardMissionStyle
              : styles.difficultyMediumBtn
          }
          onPress={() => hardMissionHanlder('medium')}>
          <Text style={styles.textStyle}>Difficulty Medium</Text>
        </TouchableOpacity>
        {hardMissions}
      </View>
      <View style={styles.missionContainer}>
        <View style={styles.mission1_Container}>
          <TouchableOpacity
            style={styles.mission_Image}
            onPress={() => startMission(1)}>
            <ImageBackground
              source={require('../assets/missionImages/m1.png')}
              alt=""
              style={
                gameOfThroneLevel && mission === 1
                  ? imageBorderColor
                  : styles.missionImagesBox_1
              }>
              <Text
                style={
                  gameOfThroneLevel || mission === 1
                    ? styles.mission_unlocked
                    : styles.mission_locked
                }>
                {isMissionOneLocked}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.mission_DescriptionBox}>
            <Text
              style={
                gameOfThroneLevel && mission === 1
                  ? styles.mission_title
                  : styles.mission_title1
              }>
              Mission-1: Avengers in Way
            </Text>
            <Text style={styles.mission_text}>
              {'Target:'}
              {'\n'}
              {'You have 30sec for medium level and 25sec for hard level. '}
              {'Do not click on the same image twice otherwise Game Over.'}
            </Text>
          </View>
        </View>
        <View style={styles.mission2_Container}>
          <View style={styles.mission_DescriptionBox}>
            <Text
              style={
                batmanLevel && mission === 2
                  ? styles.mission_title
                  : styles.mission_title2
              }>
              Mission-2: Batman in Action
            </Text>
            <Text style={styles.mission_text}>
              {'Target:'}
              {'\n'}
              {'You have 25sec for medium level and 20sec for hard level. '}
              {'Do not click on the same image twice otherwise Game Over.'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.mission_Image}
            onPress={() => startMission(2)}>
            <ImageBackground
              source={require('../assets/missionImages/m2_a.png')}
              alt=""
              style={
                batmanLevel && mission === 2
                  ? imageBorderColor
                  : styles.missionImagesBox_2
              }>
              <Text
                style={
                  batmanLevel || mission === 2
                    ? styles.mission_unlocked
                    : styles.mission_locked
                }>
                {isMissionTwoLocked}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.mission3_Container}>
          <TouchableOpacity
            style={styles.mission_Image}
            onPress={() => startMission(3)}>
            <ImageBackground
              source={require('../assets/missionImages/m3_a.png')}
              alt=""
              style={
                blackPantherLevel && mission === 3
                  ? imageBorderColor
                  : styles.missionImagesBox_3
              }>
              <Text
                style={
                  blackPantherLevel || mission === 3
                    ? styles.mission_unlocked
                    : styles.mission_locked
                }>
                {isMissionThreeLocked}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.mission_DescriptionBox}>
            <Text
              style={
                blackPantherLevel && mission === 3
                  ? styles.mission_title
                  : styles.mission_title3
              }>
              Mission-3: The Black Panther
            </Text>
            <Text style={styles.mission_text}>
              {'Target:'}
              {'\n'}
              {'You have 20sec for medium level and 15sec for hard level. '}
              {'Do not click on the same image twice otherwise Game Over.'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.selectMissionBtnContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SuperHeros')}>
                        <Text style={styles.backBtn}>Back</Text>
                    </TouchableOpacity> */}
        <TouchableOpacity onPress={runSlectedMission}>
          <Text style={styles.nextBtn}>Start</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView>{/* <InterstitialAds /> */}</SafeAreaView>
    </View>
  );
}
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const makeStyles = fontScale =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.$Black,
    },
    titleContainer: {
      marginTop: 40,
    },
    missionContainer: {
      // flex: 4,
      marginTop: deviceWidth > 440 ? 100 : 10,
      marginBottom: 0,
      width: deviceWidth > 440 ? '80%' : '100%',
      alignItems: 'center',
      marginHorizontal: deviceWidth > 440 ? '10%' : '0%',
    },
    mission1_Container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 15,
    },
    mission2_Container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 15,
    },
    mission3_Container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 15,
    },
    missionImagesBox_1: {
      flex: 1,
      width: '100%',
      borderColor: Colors.$Grey,
      borderRadius: 2,
      borderWidth: 1,
      resizeMode: 'cover',
    },
    missionImagesBox_2: {
      flex: 1,
      width: '100%',
      borderColor: Colors.$Grey,
      borderRadius: 2,
      borderWidth: 1,
      resizeMode: 'stretch',
    },
    missionImagesBox_3: {
      flex: 1,
      width: '100%',
      borderColor: Colors.$Grey,
      borderRadius: 2,
      borderWidth: 1,
      resizeMode: 'stretch',
    },
    mission_Image: {
      width: deviceWidth > 440 ? '22%' : '32%',
      height: deviceWidth < 380 ? 120 : 150,
      resizeMode: 'cover',
    },
    mission_DescriptionBox: {
      width: '60%',
      height: deviceWidth < 380 ? 120 : 150,
      marginLeft: 10,
    },
    mission_locked: {
      color: Colors.$Grey,
      fontSize: 14 / fontScale,
      // padding: 3,
      alignSelf: 'center',
      marginTop: deviceWidth < 380 ? 90 : 110,
    },
    mission_unlocked: {
      color: Colors.$Yellow,
      fontSize: 14 / fontScale,
      // padding: 3,
      alignSelf: 'center',
      marginTop: deviceWidth < 380 ? 90 : 110,
    },
    mission_title: {
      color: Colors.$Yellow,
      fontSize: 12 / fontScale,
      padding: 3,
    },
    mission_title1: {
      color: Colors.$Grey,
      fontSize: 12 / fontScale,
      padding: 3,
    },
    mission_title2: {
      color: Colors.$Grey,
      fontSize: 12 / fontScale,
      padding: 3,
    },
    mission_title3: {
      color: Colors.$Grey,
      fontSize: 12 / fontScale,
      padding: 3,
    },
    mission_text: {
      marginTop: 5,
      color: Colors.$CoolWhite,
      textAlign: 'justify',
      fontSize: 12 / fontScale,
      padding: 5,
    },
    selectMissionBtnContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
    difficultyLevelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: deviceWidth < 380 ? 1 : 30,
    },
    difficultyHardBtn: {
      backgroundColor: Colors.$Black,
      borderRadius: 4,
      margin: 3,
      width: deviceWidth < 380 ? 120 : 122,
      height: 32,
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
      borderColor: Colors.$Grey,
      borderWidth: 0.7,
    },
    difficultyMediumBtn: {
      backgroundColor: Colors.$Black,
      borderRadius: 4,
      margin: 3,
      width: deviceWidth < 380 ? 120 : 122,
      height: 32,
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
      borderColor: Colors.$Grey,
      borderWidth: 0.7,
    },
    textStyle: {
      width: deviceWidth < 380 ? 110 : 122,
      height: 32,
      fontSize: 12 / fontScale,
      color: Colors.$CoolWhite,
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    },
    nextBtn: {
      color: Colors.$DarkGrey,
      width: deviceWidth < 380 ? 80 : 122,
      height: 42,
      fontSize: 20 / fontScale,
      backgroundColor: Colors.$CoolWhite,
      borderRadius: 10,
      borderWidth: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      resizeMode: 'cover',
      marginRight: 24,
    },
    // backBtn: {
    //     color: $colorBlack,
    //     fontSize: 18,
    //     width: 70,
    //     backgroundColor: $colorGrey,
    //     borderColor: $colorGrey,
    //     borderRadius: 6,
    //     borderWidth: 1,
    //     textAlign: 'center',
    //     resizeMode: 'cover',
    //     padding: 3,
    //     alignSelf: 'flex-end',
    //     marginLeft: 10,
    // },
    footerContainer: {
      alignItems: 'center',
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
