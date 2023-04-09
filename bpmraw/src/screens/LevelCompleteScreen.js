/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {gameSliceActions} from '../store/redux/gameState';
import Colors from '../styles/variables/colors';

export default function LevelCompleteScreen(props) {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);
  const dispatch = useDispatch();
  const navigation = useSelector(state => state.bpmGame.navigation);

  const mission = useSelector(state => state.bpmGame.mission);
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const hardMissionUnlocked = useSelector(
    state => state.bpmGame.hardMissionUnlocked,
  );
  const levelDifficultyStatus = useSelector(
    state => state.bpmGame.levelDifficultyStatus,
  );

  function nextLevelHandler() {
    if (mission === 1) {
      if (!hardMissionUnlocked && levelDifficultyStatus === 'medium') {
        dispatch(gameSliceActions.timerReset(25)); //20
        navigation.navigate('startScreen');
      }
      if (hardMissionUnlocked && levelDifficultyStatus === 'medium') {
        dispatch(gameSliceActions.timerReset(25)); //20
        navigation.navigate('startScreen');
      }
      if (hardMissionUnlocked && levelDifficultyStatus === 'hard') {
        dispatch(gameSliceActions.timerReset(20));
        navigation.navigate('startScreen');
      }
      dispatch(gameSliceActions.saveBatLevel(true));
    }
    if (mission === 2) {
      if (!hardMissionUnlocked && levelDifficultyStatus === 'medium') {
        dispatch(gameSliceActions.timerReset(20)); //20
        navigation.navigate('startScreen');
      }

      if (hardMissionUnlocked && levelDifficultyStatus === 'medium') {
        dispatch(gameSliceActions.timerReset(20)); //20
        navigation.navigate('startScreen');
      }
      if (hardMissionUnlocked && levelDifficultyStatus === 'hard') {
        dispatch(gameSliceActions.timerReset(15));
        navigation.navigate('startScreen');
      }
      dispatch(gameSliceActions.saveBlackPantherLevel(true));
    }
    dispatch(gameSliceActions.updateScoreRecords());
    dispatch(gameSliceActions.setMission(mission + 1));
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    props.hideLevelCompleteModal(!props.showLevelCompleteModal);
  }
  let missionName = '';
  if (mission === 1) {
    missionName = 'Batman in Action';
  }
  if (mission === 2) {
    missionName = 'The Black Panther';
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showLevelCompleteModal}
        // onRequestClose={() => {
        //   props.hideLevelCompleteModal(!props.showLevelCompleteModal);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Congratulation!</Text>
            <Text style={styles.unlocked}>New Mission Unlocked</Text>
            <Image
              style={styles.image}
              source={require('../assets/gotImages/winner.gif')}></Image>

            <Text style={styles.modalText}>
              You successfully unlocked{'\n'}
              {missionName} {'\n'}
            </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={nextLevelHandler}>
              <Text style={styles.textStyle}>Next Level</Text>
            </TouchableOpacity>
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
    },
    image: {
      width: '100%',
      height: 140,
      borderColor: Colors.$colorWhite,
      borderRadius: 2,
      borderWidth: 1,
      // margin: 2,
      marginTop: 16,
      resizeMode: 'stretch',
    },
    modalView: {
      width: '90%',
      height: '75%',
      margin: 20,
      backgroundColor: Colors.$DarkGrey,
      borderRadius: 20,
      borderColor: Colors.$Grey,
      borderWidth: 1,
      opacity: 0.95,
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
    title: {
      marginTop: 8,
      color: Colors.$Yellow,
      fontSize: deviceWidth < 380 ? 18 / fontScale : 22 / fontScale,
      textAlign: 'center',
    },
    unlocked: {
      color: Colors.$CoolWhite,
      fontSize: 14 / fontScale,
      marginTop: 10,
    },
    buttonClose: {
      backgroundColor: Colors.$Yellow,
      borderRadius: 4,
    },
    textStyle: {
      color: Colors.$Black,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: deviceWidth < 380 ? 14 / fontScale : 18 / fontScale,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    modalText: {
      marginTop: 10,
      textAlign: 'center',
      color: Colors.$CoolWhite,
      fontSize: deviceWidth < 380 ? 16 / fontScale : 18 / fontScale,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
  });
