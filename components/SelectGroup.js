import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { Picker } from 'react-native-woodpicker';
import { Picker } from '@react-native-picker/picker';

const SelectGroup = ({
  title,
  data,
  pickedData,
  setPickedData,
  enabled = true,
}) => {
  const pickerItem = data.map(({ label, value }) => (
    <Picker.Item
      style={styles.pickerStyle}
      key={`${value}_${label}`}
      label={label}
      value={label}
    />
  ));

  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>{title}:</Text>
      <Picker
        prompt={title}
        selectedValue={pickedData}
        onValueChange={setPickedData}
        enabled={enabled}>
        {pickerItem}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginVertical: 20,
  },
  pickerStyle: {
    backgroundColor: '#f3f3f3',
    color: '#000',
    borderRadius: 5,
  },
  Label: {
    fontSize: 20,
  },
});

export default SelectGroup;
