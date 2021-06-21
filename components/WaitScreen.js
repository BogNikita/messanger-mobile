import React from 'react';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const WaitScreen = () => {
  return (
    <View>
      <Button onPress={() => Actions.pop()} title="back" />
    </View>
  );
};

export default WaitScreen;
