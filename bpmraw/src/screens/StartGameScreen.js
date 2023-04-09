/* eslint-disable no-unused-vars */
import {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {gameSliceActions} from '../store/redux/gameState';
//import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';

import RandImages from '../components/RandImages';
import gotImages from '../components/gotImages.js';
import blackPantherImages from '../components/blackPantherImages';
import batmanImages from '../components/batmanImages';
//import GameScore from "../components/GameScore";
import Title from '../components/Title';
import MissionTitle from '../components/MissionTitle';
import Footer from '../components/Footer.js';
import RulesModal from '../components/RulesModal';
import LevelCompleteScreen from '../screens/LevelCompleteScreen';
import GameOverScreen from '../screens/GameOverScreen';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import WarningOnExitGame from './WarningOnExitGame';
import VictoryScreen from './VictoryScreen';
import Colors from '../styles/variables/colors';

export default function StartGameScreen({navigation}) {
  const dispatch = useDispatch();
  const reduxGameOverModal = useSelector(state => state.bpmGame.gameOverModal);
  const gameOfThroneLevel = useSelector(
    state => state.bpmGame.gameOfThroneLevel,
  );
  const batmanLevel = useSelector(state => state.bpmGame.batmanLevel);
  //const blackPantherLevel = useSelector((state) => state.bpmGame.blackPantherLevel)
  const victory = useSelector(state => state.bpmGame.victory);
  const mission = useSelector(state => state.bpmGame.mission);
  //const showRewardedAd = useSelector((state) => state.bpmGame.showRewardedAd);
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const hardMissionUnlocked = useSelector(
    state => state.bpmGame.hardMissionUnlocked,
  );
  const levelDifficultyStatus = useSelector(
    state => state.bpmGame.levelDifficultyStatus,
  );

  const [tscore, setTscore] = useState(0);
  const [allCharacters, setAllCharacters] = useState(shuffleArray());
  const [wasClicked, setWasClicked] = useState([]);
  const [shake, setShake] = useState(false);
  const [power, setPower] = useState(1);
  const [gameRules, setGameRulesModal] = useState(false);
  const [showLevelCompleteModal, setShowLevelCompleteModal] = useState(false);
  const [gameMessage, setGameMessage] = useState('Click an image to start!');
  const [gameMessageColor, setGameMessageColor] = useState({color: 'grey'});

  useEffect(() => {
    setAllCharacters(shuffleArray());
  }, [mission]);
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'StartGameScreen' || route.name === 'startScreen') {
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

  let missionImage = null;
  if (mission === 1) {
    missionImage = require('../assets/gotImages/mission-got.png');
  }

  if (mission === 2) {
    missionImage = require('../assets/batmanImages/bat-11.jpg');
  }
  if (mission === 3) {
    missionImage = require('../assets/BlackPantherImages/bp-mission2.png');
  }

  useEffect(() => {
    dispatch(gameSliceActions.score(tscore));
  }, [tscore]);

  if (showLevelCompleteModal) {
    levelCompleteHandler();
    //dispatch(gameSliceActions.updateScoreRecords());
  }
  if (victory) {
    victoryHandler();
  }

  function levelCompleteHandler() {
    dispatch(gameSliceActions.setGameOverModal(false));
    dispatch(gameSliceActions.victory(false));
  }
  function victoryHandler() {
    dispatch(gameSliceActions.setGameOverModal(false));
    // dispatch(gameSliceActions.updateScoreRecords());
  }

  function hideLevelCompleteHandler() {
    setWasClicked([]);
    setTscore(0);
    setGameMessage('Click an image to start!');
    setGameMessageColor({color: 'grey'});
    setAllCharacters(shuffleArray()), setShake(true);
    setShowLevelCompleteModal(false);
  }
  function hideGameOverModalHandler() {
    dispatch(gameSliceActions.setGameOverModal(false));
    setTscore(0);
    setGameMessage('Click an image to start!');
    setGameMessageColor({color: 'grey'});
  }

  function shuffleArray() {
    let newArr = [];
    if (mission === 1 && levelDifficultyStatus === 'medium') {
      newArr = gotImages.gotImages1.slice();
    }
    if (mission === 1 && levelDifficultyStatus === 'hard') {
      newArr = gotImages.gotImages2.slice();
    }
    //---------
    if (mission === 2 && levelDifficultyStatus === 'medium') {
      newArr = batmanImages.batmanImages1.slice();
    }
    if (mission === 2 && levelDifficultyStatus === 'hard') {
      newArr = batmanImages.batmanImages2.slice();
    }
    //----------
    if (mission === 3 && levelDifficultyStatus === 'medium') {
      newArr = blackPantherImages.blackPantherImages1.slice();
    }
    if (mission === 3 && levelDifficultyStatus === 'hard') {
      newArr = blackPantherImages.blackPantherImages2.slice();
    }

    const shuffleArr = [];
    while (newArr.length > 0) {
      shuffleArr.push(
        newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0],
      );
    }
    return shuffleArr;
  }
  //============================================
  function checkClicked(clickedElem) {
    const prevState = wasClicked.slice();
    const shuffled = shuffleArray();
    let score = tscore;

    if (!wasClicked.includes(clickedElem)) {
      score++;
      if (score === 9) {
        if ((gameOfThroneLevel && mission === 2) || mission === 1) {
          //dispatch(gameSliceActions.updateScoreRecords()),
          setShowLevelCompleteModal(true);
          dispatch(gameSliceActions.setGameOverModal(false));
          dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
        }
        if (gameOfThroneLevel && batmanLevel && mission === 3) {
          setShowLevelCompleteModal(false);

          //dispatch(gameSliceActions.updateScoreRecords()),
          dispatch(gameSliceActions.victory(true));
          dispatch(gameSliceActions.setGameOverModal(false));
          dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
        }
      }
      if (score === 0) {
        setGameMessage('Click an image to start!');
        setWasClicked([]);
      }
      prevState.push(clickedElem);
      setTscore(score);
      setAllCharacters(shuffled);
      setWasClicked(prevState);
      setShake(false);
      setGameMessageColor({color: 'grey'}), setGameMessage('Correct');
    } else {
      score = 0;
      return (
        setGameMessageColor({color: 'red'}),
        //dispatch(gameSliceActions.updateScoreRecords()),
        setGameMessage('Incorrect Guess'),
        // setTimeout(() => setShowGameOverModal(true),500),
        setTimeout(
          () => dispatch(gameSliceActions.setGameOverModal(true)),
          500,
        ),
        setTscore(score),
        setAllCharacters(shuffled),
        setWasClicked([]),
        setShake(true)
      );
    }
  }

  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.missionImageConatiner}>
          <View style={styles.bgImageWrapper}>
            <ImageBackground style={styles.missionImage} source={missionImage}>
              <View style={styles.title}>
                <Title score={tscore} />
              </View>
              <View style={styles.missionTitle}>
                <MissionTitle />
                <Timer />
              </View>
            </ImageBackground>
          </View>

          <View>
            <VictoryScreen />
          </View>
          <View>
            <WarningOnExitGame />
          </View>
          <View>
            <RulesModal
              showModal={gameRules}
              setShowModal={setGameRulesModal}
            />
          </View>
          <View>
            <LevelCompleteScreen
              showLevelCompleteModal={showLevelCompleteModal}
              hideLevelCompleteModal={hideLevelCompleteHandler}
            />
          </View>
          <View>
            <GameOverScreen
              showGameOverModal={reduxGameOverModal}
              hideGameOverModal={hideGameOverModalHandler}
            />
          </View>
        </View>

        {/*====================================================*/}

        <View style={styles.messageContainer}>
          <Text style={[styles.messageStyle, gameMessageColor]}>
            {gameMessage}
          </Text>
          <ProgressBar score={tscore} />
        </View>

        {/*====================================================*/}
        <View style={styles.imagesContainer}>
          <RandImages
            shake={shake}
            characters={allCharacters}
            clickEvent={checkClicked.bind(this)}
          />
        </View>

        <View style={styles.footer}>
          <Footer setShowModal={setGameRulesModal} navigation={navigation} />
        </View>
      </View>
    </>
  );
}
//==============
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.$Black,
  },
  missionImageConatiner: {
    flex: 1,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  missionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    alignItems: 'center',
    marginTop: 30,
  },
  missionTitle: {
    alignItems: 'center',
    marginTop: 10,
  },
  scoreCard: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 240,
  },
  messageContainer: {
    backgroundColor: Colors.$Black,
    paddingTop: 5,
  },
  messageStyle: {
    color: Colors.$CoolWhite,
    textAlign: 'center',
    fontSize: deviceWidth < 380 ? 14 : 18,
  },
  imagesContainer: {
    flex: 2,
    backgroundColor: Colors.$Black,
    alignItems: 'center',
    paddingBottom: 30,
  },
  footer: {
    padding: 5,
  },
});
