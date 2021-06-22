import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThemesRequest } from '../store/actions/themes';
import SelectGroup from './SelectGroup';

const MainScreen = () => {
  const { isError, errorMessage, isSuccess, themes } = useSelector(
    state => state.themes,
  );
  const [pickedThemes, setPickedThemes] = useState('');
  const [pickedSubThemes, setPickedSubThemes] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThemesRequest());
  }, []);

  if (!isSuccess) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const getThemes = arr => {
    if (arr?.length) {
      const title = arr.map((item, i) => ({
        label: item,
        value: i + 1,
      }));
      return title;
    }
  };

  const clickHandler = item => {
    setPickedThemes(item);
    const defaultSubTitle = getThemes(themes[item]);
    setPickedSubThemes(defaultSubTitle[0]);
  };

  const subTitle = pickedThemes
    ? getThemes(themes[pickedThemes])
    : [pickedSubThemes];

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
        <SelectGroup
          data={getThemes(Object.keys(themes))}
          title="Выберите тему обращения"
          pickedData={pickedThemes}
          setPickedData={clickHandler}
        />
        <SelectGroup
          data={subTitle}
          title="Выберите подтему"
          pickedData={pickedSubThemes}
          setPickedData={setPickedSubThemes}
          enabled={!!pickedThemes}
        />
      </View>
      {isError && <Text style={styles.Error}>{errorMessage}</Text>}
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  Error: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export default MainScreen;
