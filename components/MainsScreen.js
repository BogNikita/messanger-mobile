import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SelectGroup from './SelectGroup';

const MainScreen = () => {
  const data = [
    { label: 'DataCat', value: 1 },
    { label: 'DataDog', value: 2 },
    { label: 'DataSnake', value: 3 },
    { label: 'DataPlatypus', value: 4 },
    { label: 'DataWhale', value: 5 },
  ];

  const data1 = [
    { label: 'DataCat', value: 1 },
    { label: 'DataDog', value: 2 },
    { label: 'DataSnake', value: 3 },
    { label: 'DataPlatypus', value: 4 },
    { label: 'DataWhale', value: 5 },
  ];

  return (
    <View style={styles.Container}>
      <View style={styles.Wrapper}>
        <View>
          <Text style={styles.Label}>Введите имя</Text>
          <TextInput
            onChangeText={text => console.log(text)}
            style={styles.Input}
            placeholder="Введите Ваше имя"
          />
        </View>
        <SelectGroup data={data} title="Выберите тему обращения" />
        <SelectGroup data={data1} title="Выберите подтему" />
      </View>

      <Button onPress={() => Actions.push('wait')} title="Войти в чат" />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  Wrapper: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Label: {
    fontSize: 20,
    marginTop: 10,
  },
  Input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    padding: 12,
    height: 60,
  },
});

export default MainScreen;
