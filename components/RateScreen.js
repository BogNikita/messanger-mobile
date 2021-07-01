import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { fetchChatEnd } from '../store/actions/chat';

const RateScreen = () => {
  const { id } = useSelector(state => state.chat.chat);
  const dispatch = useDispatch();

  const [rate, setRate] = useState(1);

  const closeDialogHandler = () => {
    Actions.push('main');
    dispatch(fetchChatEnd(id, rate));
  };

  const star = Array(5)
    .fill('')
    .map((_, i) => (
      <TouchableOpacity key={i} onPress={() => setRate(i + 1)}>
        <FontAwesomeIcon
          icon={i + 1 > rate ? faEmptyStar : faStar}
          color={'gold'}
          size={50}
        />
      </TouchableOpacity>
    ));

  return (
    <View style={styles.Container}>
      <View style={styles.TextWrapper}>
        <Text style={styles.Text}>
          Диалог завершен {'\n'}Оцените общение со специалистом
        </Text>
      </View>
      <View style={styles.RateWrapper}>{star}</View>
      <View style={styles.Btn}>
        <Button title="Оценить диалог" onPress={closeDialogHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  TextWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  Text: {
    fontSize: 20,
    textAlign: 'center',
  },
  RateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  Btn: {
    flex: 1,
  },
});

export default RateScreen;
