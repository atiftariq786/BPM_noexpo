/* eslint-disable react-native/no-unused-styles */
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
  useWindowDimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {gameSliceActions} from '../store/redux/gameState';
import Colors from '../styles/variables/colors';

export default function VictoryScreen() {
  const dispatch = useDispatch();
  const navigation = useSelector(state => state.bpmGame.navigation);
  const victory = useSelector(state => state.bpmGame.victory);
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const hardMissionUnlocked = useSelector(
    state => state.bpmGame.hardMissionUnlocked,
  );
  const levelDifficultyStatus = useSelector(
    state => state.bpmGame.levelDifficultyStatus,
  );
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  function goToMissionHandler() {
    hideModal();
    dispatch(gameSliceActions.hardMissionUnlocked(true));
    dispatch(gameSliceActions.updateScoreRecords());
    dispatch(gameSliceActions.levelDifficultyStatus('hard'));
    dispatch(gameSliceActions.setMission(1));
    dispatch(gameSliceActions.timerReset(25));
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    navigation.navigate('Missions');
  }
  function exitMainMenu() {
    hideModal();
    dispatch(gameSliceActions.hardMissionUnlocked(true));
    dispatch(gameSliceActions.timerReset(25));
    dispatch(gameSliceActions.updateScoreRecords());
    dispatch(gameSliceActions.levelDifficultyStatus('hard'));
    dispatch(gameSliceActions.setMission(1));
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    navigation.navigate('Main');
  }
  function hideModal() {
    dispatch(gameSliceActions.victory(false));
  }
  let victoryImage = require('../assets/gotImages/winner2.gif');
  let motivationTxt = '';
  let victoryText = 'Hard Level Missions Unlocked!';

  if (hardMissionUnlocked && levelDifficultyStatus === 'hard') {
    victoryText = '';
    motivationTxt = 'Play more and improve your memory!';
    victoryImage = require('../assets/gotImages/winner3.gif');
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={victory}
        // onRequestClose={() => {
        //   dispatch(gameSliceActions.showWarningModal(false));
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Victory!</Text>
            <Text style={styles.exitGame}>
              Congratulations!{'\n'}
              {victoryText}
            </Text>
            <Image style={styles.image} source={victoryImage}></Image>
            <Text style={styles.motivationStyle}>{motivationTxt}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.MainMenuBtn}
                onPress={exitMainMenu}>
                <Text style={styles.textStyle}>Main Menu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.goToMissionBtn}
                onPress={goToMissionHandler}>
                <Text style={styles.textStyle}>Go to Missions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const deviceWidth = Dimensions.get('window').width;

const makeStyles = fontScale =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width: '90%',
      height: '75%',
      margin: 20,
      backgroundColor: Colors.$White,
      borderRadius: 20,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      opacity: 1.9,
      padding: 15,
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    image: {
      width: '60%',
      height: 140,
      borderColor: Colors.$CoolWhite,
      borderRadius: 2,
      borderWidth: 1,
      margin: 2,
      resizeMode: 'stretch',
    },
    title: {
      marginTop: 8,
      color: Colors.$Green,
      fontSize: deviceWidth < 380 ? 28 / fontScale : 32 / fontScale,
      textAlign: 'center',
    },
    exitGame: {
      marginTop: 20,
      color: Colors.$Orange,
      fontSize: deviceWidth < 380 ? 18 / fontScale : 20 / fontScale,
      textAlign: 'center',
    },
    motivationStyle: {
      marginTop: 20,
      color: Colors.$Black,
      fontSize: deviceWidth < 380 ? 16 / fontScale : 18 / fontScale,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginTop: 50,
    },
    goToMissionBtn: {
      backgroundColor: Colors.$Green,
      borderRadius: 4,
      margin: 5,
      paddingVertical: 12,
      width: 120,
      alignSelf: 'center',
    },
    MainMenuBtn: {
      backgroundColor: Colors.$CoolBlue,
      borderRadius: 4,
      margin: 5,
      paddingVertical: 12,
      width: 120,
      alignSelf: 'center',
    },
    textStyle: {
      color: Colors.$CoolWhite,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: deviceWidth < 380 ? 14 / fontScale : 16 / fontScale,
    },
  });
