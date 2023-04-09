/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeProfileData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@profileData", jsonValue);
  } catch (e) {
    //saving error
  }
};
const storeUserScoreData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@data", jsonValue);
  } catch (e) {
    //saving error
  }
};
const storeMissionData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@missionData", jsonValue);
  } catch (e) {
    //saving error
  }
};
const storeHardMissionUnlocked = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("@hardMissionUnlocked", jsonValue);
  } catch (e) {
    //saving error
  }
};
const clearProfileDataLS = async () => {
  try {
    await AsyncStorage.removeItem("@profileData");
    //await AsyncStorage.clear()
  } catch (e) {
    // remove error
  }

  console.log("profile Storage data removed");
};
const clearMissionDataLS = async () => {
  try {
    await AsyncStorage.removeItem("@missionData");
    //await AsyncStorage.clear()
  } catch (e) {
    // remove error
  }

  console.log("profile Storage data removed");
};
const clearUnlockedMissionsLS = async () => {
  try {
    await AsyncStorage.removeItem("@hardMissionUnlocked");
    //await AsyncStorage.clear()
  } catch (e) {
    // remove error
  }

  console.log("Unlocked Mission Storage data removed");
};
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("@data");
    //await AsyncStorage.clear()
  } catch (e) {
    // remove error
  }

  console.log("All Score Records Removed");
};

const gameSlice = createSlice({
  name: "bpmGame",
  initialState: {
    userName: "player-1",
    profileImageId: 57,
    profileArray: [],
    timer: 30,
    score: 0,
    scoreArr: [],
    gameOverModal: false,
    //saveScoreToHistory: false,
    navigation: null,
    date: "",
    id: Math.floor(1 + Math.random()),
    warningModal: false,
    gameOfThroneLevel: true,
    batmanLevel: false,
    blackPantherLevel: false,
    resetMission: false,
    mission: 1,
    pageRefresh: 0,
    victory: false,
    hardMissionUnlocked: false,
    levelDifficultyStatus: "medium",
    soundStatus: null,
    quiteGameStatus: false,
    adsCounter: 1,
    showInterstiAd: {},
    showRewardedAd: {},
    showInternetCheckModal: true,
  },
  reducers: {
    internetCheck: (state, action) => {
      const data = action.payload;
      state.showInternetCheckModal = data;
    },
    showRewardedAds: (state, action) => {
      const data = action.payload;
      state.showRewardedAd = data;
    },
    interstiAdCounterUpdate: (state, action) => {
      const data = action.payload;
      state.adsCounter = data;
    },
    showInterstiAds: (state, action) => {
      const data = action.payload;
      state.showInterstiAd = data;
    },
    quiteGame: (state, action) => {
      const data = action.payload;
      state.quiteGameStatus = data;
    },
    soundStatus: (state, action) => {
      const data = action.payload;
      state.soundStatus = data;
    },
    setMission: (state, action) => {
      const data = action.payload;
      state.mission = data;
    },
    date: (state, action) => {
      const data = action.payload;
      state.date = data;
    },
    username: (state, action) => {
      const user = action.payload;
      state.userName = user;
      console.log("updating username redux", user);
    },
    onClickedprofileImage: (state, action) => {
      const profileID = action.payload;
      state.profileImageId = profileID;
    },
    saveProfileData: (state, action) => {
      state.profileArray.push({
        profileImage: state.profileImageId,
        username: state.userName,
      });

      storeProfileData(state.profileArray);
    },
    updateProfileData: (state, action) => {
      const data = action.payload;

      state.profileImageId = data.profileImage;
      state.userName = data.username;
    },
    score: (state, action) => {
      const data = action.payload;
      state.score = data;
    },
    updateScoreRecords: (state, action) => {
      //const data = action.payload;
      if (state.scoreArr.length > 30) {
        state.scoreArr.pop();
      }
      if (state.score > 1) {
        state.scoreArr.unshift({
          username: state.userName,
          level: state.mission,
          levelDifficulty: state.levelDifficultyStatus,
          score: state.score,
          date: state.date,
          id: state.id,
        });
      }
      storeUserScoreData(state.scoreArr);
    },
    clearScoreArr: (state, action) => {
      state.scoreArr = [];
      clearUserData();
    },
    resetScoreArr: (state, action) => {
      const reset = action.payload;
      state.scoreArr = reset ? reset : [];
      //state.scoreArr = reset || []
    },
    showWarningModal: (state, action) => {
      const modal = action.payload;
      state.warningModal = modal;
    },
    timerReset: (state, action) => {
      const reset = action.payload;
      state.timer = reset;
    },
    setGameOverModal: (state, action) => {
      const data = action.payload;
      state.gameOverModal = data;
      //state.saveScoreToHistory = true;
    },
    routing: (state, action) => {
      state.navigation = action.payload;
    },
    saveBatLevel: (state, action) => {
      const data = action.payload;

      storeMissionData({
        mission1: state.gameOfThroneLevel,
        mission2: data,
        mission3: state.blackPantherLevel,
      });
    },
    saveBlackPantherLevel: (state, action) => {
      const data = action.payload;
      storeMissionData({
        mission1: state.gameOfThroneLevel,
        mission2: state.batmanLevel,
        mission3: data,
      });
    },
    updateAllLevel: (state, action) => {
      const data = action.payload;
      state.gameOfThroneLevel = data.mission1;
      state.batmanLevel = data.mission2;
      state.blackPantherLevel = data.mission3;
    },
    victory: (state, action) => {
      const data = action.payload;
      state.victory = data;
    },
    hardMissionUnlocked: (state, action) => {
      const data = action.payload;
      state.hardMissionUnlocked = data;
      storeHardMissionUnlocked({
        unlockedHardMisssion: data,
      });
    },
    updateHardMissionUnlocked: (state, action) => {
      const data = action.payload;
      state.hardMissionUnlocked = data;
    },
    levelDifficultyStatus: (state, action) => {
      const data = action.payload;
      state.levelDifficultyStatus = data;
    },
    clearProfileData: (state, action) => {
      const data = action.payload;
      clearProfileDataLS();
      state.profileImageId = 57;
      state.userName = "player-1";
    },
    clearMissionData: (state, action) => {
      const data = action.payload;
      clearMissionDataLS();
      state.gameOfThroneLevel = true;
      state.batmanLevel = false;
      state.blackPantherLevel = false;
    },
    clearUnlockedMissions: (state, action) => {
      //const data = action.payload;
      clearUnlockedMissionsLS();
      state.hardMissionUnlocked = false;
      state.levelDifficultyStatus = "medium";
      storeHardMissionUnlocked({
        unlockedHardMisssion: false,
      });
    },
    pageRefresh: (state, action) => {
      const data = action.payload;
      state.pageRefresh = data;
    },
  },
});
export const gameSliceActions = gameSlice.actions;
export default gameSlice;
