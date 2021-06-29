import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectGroup = ({ title, data, pickedData, setPickedData }) => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>{title}:</Text>
      <Picker
        prompt={title}
        selectedValue={pickedData}
        onValueChange={setPickedData}>
        <Picker.Item
          style={styles.pickerStyle}
          label="Выберете значение..."
          value=""
          enabled={false}
        />
        {data.map(item => (
          <Picker.Item
            key={`${item.value}_${item.label}`}
            label={item.label}
            value={item.label}
          />
        ))}
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

export default React.memo(SelectGroup);
