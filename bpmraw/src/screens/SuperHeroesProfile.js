/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Title from '../components/Title';
import profileImages from '../components/profileImages';
import {gameSliceActions} from '../store/redux/gameState';
import Colors from '../styles/variables/colors';

export default function SuperHeroesProfile({navigation}) {
  const userName = useSelector(state => state.bpmGame.userName);
  const profileImageId = useSelector(state => state.bpmGame.profileImageId);
  const adsCounter = useSelector(state => state.bpmGame.adsCounter);

  const [enteredVal, setEnteredVal] = useState(userName);
  const [imageID, setImageId] = useState(30);

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const dispatch = useDispatch();
  //dispatch(gameSliceActions.username(enteredVal));
  //NOTE: Possibly temporary for testing
  useEffect(() => {
    console.log('dispatching username enteredVal', enteredVal);
    dispatch(gameSliceActions.username(enteredVal));
  }, [enteredVal]);

  // saveUserNameHandler();

  // //console.log({ imageID });
  // function saveUserNameHandler() {

  // }

  console.log({enteredVal});

  function enteredValInputHandler(inputVal) {
    setEnteredVal(inputVal);
  }
  //==================================================================
  function profileImageHandler(id, src) {
    dispatch(gameSliceActions.interstiAdCounterUpdate(adsCounter + 1));
    dispatch(gameSliceActions.onClickedprofileImage(id));
    setImageId(id);
  }
  function nextHandler() {
    dispatch(gameSliceActions.pageRefresh(7));
    dispatch(gameSliceActions.saveProfileData());
    //dispatch(gameSliceActions.updateScoreRecords());
    navigation.navigate('Missions');
  }

  //=================================================================

  let proImages = profileImages.map((a, i) => {
    return (
      <TouchableOpacity key={i} onPress={profileImageHandler.bind(i, a)}>
        <Image
          source={a}
          key={i}
          alt=""
          style={
            profileImageId === a
              ? styles.selectedProfileImages
              : styles.profileImages
          }></Image>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <View style={styles.playerNameContainer}>
        <Text style={styles.playerName}>Player Name:</Text>
        <TextInput
          style={styles.playerInput}
          maxLength={15}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={enteredValInputHandler}
          value={enteredVal}></TextInput>
      </View>
      <View>
        <Text style={styles.selectPic}>Select Pic: </Text>
      </View>
      {/* ====================================================================== */}
      <View style={styles.selectProfileImagesContainer}>{proImages}</View>
      {/* ====================================================================== */}
      <View style={styles.nextBtnContainer}>
        <TouchableOpacity onPress={nextHandler}>
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
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
      marginTop: 40,
    },
    playerNameContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    playerName: {
      color: Colors.$CoolWhite,
      marginTop: 22,
      fontSize: 18 / fontScale,
      marginLeft: 15,
    },
    playerInput: {
      width: deviceWidth < 380 ? 180 : 210,
      backgroundColor: Colors.$Black,
      color: Colors.$Grey,
      borderColor: Colors.$Grey,
      borderRadius: 2,
      borderWidth: 1,
      fontSize: 18 / fontScale,
      marginLeft: 10,
      marginTop: 15,
      padding: 5,
      paddingLeft: 15,
      alignSelf: 'flex-start',
    },
    selectPic: {
      color: Colors.$CoolWhite,
      marginTop: 10,
      marginLeft: 15,
      fontSize: 18 / fontScale,
    },
    selectProfileImagesContainer: {
      width: deviceWidth > 440 ? 500 : null,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: Colors.$Black,
      justifyContent: 'center',
      alignContent: 'center',
      marginHorizontal: deviceWidth > 440 ? '15%' : '0%',
      overflow: 'hidden',
    },
    profileImages: {
      width: deviceWidth < 380 ? 90 : 115,
      height: deviceWidth < 380 ? 100 : 140,
      borderColor: Colors.$CoolWhite,
      borderRadius: 2,
      borderWidth: 1,
      margin: 17,
      resizeMode: 'stretch',
    },
    selectedProfileImages: {
      width: deviceWidth < 380 ? 90 : 115,
      height: deviceWidth < 380 ? 100 : 140,
      borderColor: Colors.$Yellow,
      borderRadius: 2,
      borderWidth: 1,
      margin: 17,
      resizeMode: 'stretch',
    },
    nextBtnContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      marginTop: deviceWidth < 380 ? 0 : 25,
    },
    nextBtn: {
      color: Colors.$CoolWhite,
      width: deviceWidth < 380 ? 80 : 122,
      height: 42,
      fontSize: 22 / fontScale,
      backgroundColor: Colors.$Grey,
      borderRadius: 10,
      borderWidth: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      resizeMode: 'cover',
      marginRight: 15,
    },
  });
