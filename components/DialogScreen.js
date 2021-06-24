import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DialogScreen = () => {
  return (
    <View style={styles.Container}>
      <Text>Активный диалог</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DialogScreen;
