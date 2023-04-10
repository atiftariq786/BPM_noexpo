import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.basicview}>
        <Text style={styles.basicText}>Text for view 11</Text>
      </View>
      <View style={styles.basicview}>
        <Text style={styles.basicText}>Text for view 22</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'flex-start', // center x axis
    justifyContent: 'flex-start', // center y axis
  },
  basicview: {
    backgroundColor: 'green',
    width: '100%',
    marginBottom: 5,
  },
  basicText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    padding: 20,
  },
});

export default App;
