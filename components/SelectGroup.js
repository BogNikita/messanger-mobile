import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from 'react-native-woodpicker';

const SelectGroup = ({ title, data }) => {
  const [pickedData, setPickedData] = useState('');

  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>{title}:</Text>
      <Picker
        item={pickedData}
        items={data}
        onItemChange={setPickedData}
        title="Тема обращения"
        style={styles.pickerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginVertical: 20,
  },
  pickerStyle: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    height: 60,
  },
  Label: {
    fontSize: 20,
  },
});

export default SelectGroup;
