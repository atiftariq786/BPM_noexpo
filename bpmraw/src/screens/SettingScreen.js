/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {gameSliceActions} from '../store/redux/gameState';
import {Audio} from 'expo-av';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Colors from '../styles/variables/colors';

export default function SettingScreen({navigation}) {
  const dispatch = useDispatch();
  const pageRefresh = useSelector(state => state.bpmGame.pageRefresh);
  const soundStatus = useSelector(state => state.bpmGame.soundStatus);

  const [outputTxt, setOutputTxt] = useState('');

  //NOTE: Possibly temporary for testing
  useEffect(() => {
    dispatch(gameSliceActions.routing(navigation));
  }, []);

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);
  //=========================================================================
  async function triggerSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync(
      require('../assets/Sounds/backgroundMusic/backgroundMusic1.mp3'),
    );
    dispatch(gameSliceActions.soundStatus(sound));
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
    console.log('Playing Sound');
    sound.setIsLoopingAsync(true);
    await sound.playAsync();
  }
  function stopSound() {
    soundStatus.unloadAsync();
    dispatch(gameSliceActions.soundStatus(null));
  }
  function resetProfile() {
    setOutputTxt('Username & Profile Data Successfully Reset');
    dispatch(gameSliceActions.clearProfileData());
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
  }
  const resetAllMissions = () => {
    setOutputTxt('All Unlocked Missions Successfully Reset');
    dispatch(gameSliceActions.clearMissionData());
    dispatch(gameSliceActions.clearUnlockedMissions());
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
  };
  const clearAllScore = () => {
    setOutputTxt('All Score Records Successfully Deleted ');
    dispatch(gameSliceActions.clearScoreArr());
    dispatch(gameSliceActions.pageRefresh(pageRefresh + 1));
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.settingTitle}>Game Setting</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.infoTxtStyle}>{outputTxt}</Text>
      </View>
      <View style={styles.loadingImageConatiner}>
        <TouchableOpacity onPress={soundStatus ? stopSound : triggerSound}>
          <Text
            style={
              soundStatus
                ? styles.loadingTextSoundON
                : styles.loadingTextSoundOFF
            }>
            Sound {soundStatus ? 'OFF' : 'ON'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetAllMissions}>
          <Text style={styles.loadingText}>Reset{'\n'} All Missions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetProfile}>
          <Text style={styles.loadingText}>Reset{'\n'} User Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAllScore}>
          <Text style={styles.loadingText}>Delete{'\n'} Score Records</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loadingFooterContainer}>
        <Text style={styles.web}>ATdevstudio</Text>
        <Text style={styles.copyright}>@Copyright 2022</Text>
      </View>
    </View>
  );
}
//'#0D0D0D',
const deviceWidth = Dimensions.get('window').width;
const makeStyles = fontScale =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.$Black,
    },

    settingTitle: {
      color: Colors.$CoolWhite,
      textAlign: 'center',
      fontSize: 22 / fontScale,
      marginTop: 50,
    },
    infoTxtStyle: {
      color: Colors.$CoolRed,
      textAlign: 'center',
      fontSize: 18 / fontScale,
      marginTop: 20,
      width: 280,
      alignSelf: 'center',
    },
    loadingImageConatiner: {
      flex: 1,
      alignItems: 'center',
      margin: 5,
      alignSelf: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      width: deviceWidth < 380 ? 160 : 180,
      height: 66,
      color: Colors.$CoolWhite,
      backgroundColor: Colors.$CoolRed,
      fontSize: 16 / fontScale,
      marginTop: 10,
      borderRadius: 10,
      borderWidth: 2,
      padding: 6,
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    },
    loadingTextSoundON: {
      width: deviceWidth < 380 ? 160 : 180,
      height: 66,
      color: Colors.$CoolWhite,
      backgroundColor: Colors.$CoolGreen,
      fontSize: 16 / fontScale,
      marginTop: 40,
      borderRadius: 10,
      borderWidth: 2,
      padding: 6,
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    },
    loadingTextSoundOFF: {
      width: deviceWidth < 380 ? 160 : 180,
      height: 66,
      color: Colors.$CoolWhite,
      backgroundColor: Colors.$CoolBlue,
      fontSize: 16 / fontScale,
      marginTop: 50,
      borderRadius: 10,
      borderWidth: 2,
      padding: 6,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    loadingFooterContainer: {
      alignItems: 'center',
      marginTop: deviceWidth < 380 ? 10 : 40,
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
