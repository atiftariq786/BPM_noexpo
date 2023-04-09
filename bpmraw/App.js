/* eslint-disable no-unused-vars */
import {useCallback, useState, useEffect} from 'react';
//import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartGameScreen from './src/screens/StartGameScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';
import MissionListScreen from './src/screens/MissionListScreen';
import SuperHeroesProfile from './src/screens/SuperHeroesProfile';
import SaveScore from './src/screens/SaveScore';
import SettingScreen from './src/screens/SettingScreen';
import {Provider} from 'react-redux';
import store from './store/redux/Store';

//import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
//SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  setTimeout(() => setAppIsReady(true), 3000);

  if (appIsReady) {
    SplashScreen.hideAsync();
  }
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar style="light" /> */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Main'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              style={styles.rootContainer}
              name="startScreen"
              component={StartGameScreen}
            />
            <Stack.Screen name="Main" component={MainMenuScreen} />
            <Stack.Screen name="Save" component={SaveScore} />
            <Stack.Screen name="Missions" component={MissionListScreen} />
            <Stack.Screen name="SuperHeros" component={SuperHeroesProfile} />
            <Stack.Screen name="Setting" component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
//====================
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
