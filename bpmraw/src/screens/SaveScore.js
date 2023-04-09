import {useSelector, useDispatch} from 'react-redux';
//import { useState, useEffect } from 'react';
import {gameSliceActions} from '../store/redux/gameState';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Title from '../components/Title';
import Colors from '../styles/variables/colors';
import BannerAds from '../components/Ads/BannerAds';

export default function SaveScore(props) {
  const dispatch = useDispatch();
  const navigation = useSelector(state => state.bpmGame.navigation);
  const scoreArr = useSelector(state => state.bpmGame.scoreArr);

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const removeValue = () => {
    dispatch(gameSliceActions.clearScoreArr());
  };
  let renderScore = scoreArr.map(currentScore => {
    return (
      <View style={styles.listItem} key={currentScore.id}>
        <View>
          <Text style={styles.username}>{currentScore.username}</Text>
        </View>
        <View>
          <Text style={styles.levelStyle}>
            {currentScore.level}
            {' - '}
            {currentScore.levelDifficulty}
          </Text>
        </View>
        <View>
          <Text style={styles.scoreStyle}>
            {'          '}
            {currentScore.score}
          </Text>
        </View>
        <View>
          <Text style={styles.username}>{currentScore.date}</Text>
        </View>
      </View>
    );
  });
  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <View style={styles.contentTitleContainer}>
        <View>
          <Text style={styles.contentTitleItems}>Username</Text>
        </View>
        <View>
          <Text style={styles.contentTitleItems}>Level</Text>
        </View>
        <View>
          <Text style={styles.contentTitleScore}>Score</Text>
        </View>
        <View>
          <Text style={styles.contentTitleItems}>Date</Text>
        </View>
      </View>
      <ScrollView style={styles.scoreContainer}>{renderScore}</ScrollView>
      <View>
        <Text style={styles.scoreNote}>
          Requirements:
          {'\n'}
          Only average and great memeory user can see score records.
          {'\n'}
          Less than 5 score user should improve brain memory.
          {'\n'}
          {
            <TouchableOpacity onPress={() => navigation.navigate('SuperHeros')}>
              <Text style={styles.playGame}>Play Game</Text>
            </TouchableOpacity>
          }
          {'\n'}
          {'\n'}
          Great Memory : 8-9 {'\n'}
          Average Memory : 5-7 {'\n'}
          Poor Memory : 0-4 {'\n'}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={removeValue}>
          <Text style={styles.deleteAll}>Delete All</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.loadingText}>Back</Text>
                </TouchableOpacity> */}
      </View>
      <View>
        <BannerAds />
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
    titleContainer: {
      marginTop: 40,
    },
    contentTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 20,
      borderBottomWidth: 1,
      borderColor: Colors.$CoolWhite,
    },
    contentTitleItems: {
      color: Colors.$CoolOrange,
      fontSize: deviceWidth < 380 ? 12 : 16,
    },
    contentTitleScore: {
      color: Colors.$CoolOrange,
      fontSize: deviceWidth < 380 ? 12 : 16,
      marginRight: 20,
    },
    scoreContainer: {
      flex: 1,
      margin: 10,
      marginTop: 0,
    },
    username: {
      color: Colors.$Black,
      fontSize: 12,
    },
    scoreNote: {
      color: Colors.$CoolWhite,
      fontSize: 14 / fontScale,
      marginRight: 10,
      marginLeft: 10,
      alignSelf: 'center',
    },
    playGame: {
      color: Colors.$CoolBlue,
      fontSize: 14 / fontScale,
    },
    listItem: {
      borderColor: Colors.$CoolWhite,
      borderWidth: 1,
      borderRadius: 10,
      padding: 6,
      marginVertical: 8,
      backgroundColor: Colors.$Orange,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      elevation: 4,
    },
    levelStyle: {
      color: Colors.$Black,
      fontSize: 12 / fontScale,
      marginLeft: 60,
    },
    scoreStyle: {
      color: Colors.$Black,
      fontSize: 12 / fontScale,
      marginLeft: 0,
    },
    deleteAll: {
      width: deviceWidth < 380 ? 130 : 142,
      height: 42,
      color: Colors.$CoolWhite,
      fontSize: 16 / fontScale,
      marginTop: 10,
      backgroundColor: Colors.$CoolRed,
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    },
    loadingText: {
      width: deviceWidth < 380 ? 80 : 100,
      color: Colors.$Grey,
      fontSize: 16 / fontScale,
      marginTop: 10,
      borderColor: Colors.$Grey,
      borderRadius: 6,
      borderWidth: 1,
      padding: 5,
      textAlign: 'center',
      alignSelf: 'center',
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
