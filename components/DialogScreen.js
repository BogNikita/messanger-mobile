/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchChatEnd, fetchChatNewMessage } from '../store/actions/chat';
import MessageList from './elements/MessageList';

const DialogScreen = () => {
  const {
    isError,
    errorMessage,
    chat: { operatorId, id, messages },
  } = useSelector(state => state.chat);

  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const clickHandler = useCallback(() => {
    dispatch(fetchChatEnd(id));
    Actions.push('main');
  }, []);

  const userName = useRef(messages[0].writtenBy);

  const sendHandler = useCallback(() => {
    const message = {
      content: text,
      imgSrc: '',
      writtenBy: userName.current,
      timestamp: Date.now(),
    };
    dispatch(fetchChatNewMessage(message, id, messages.length));
  }, [text]);

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Text}>Вы общаетесь с опeратором {operatorId}</Text>
        <Button title="Завершить диалог" onPress={clickHandler} />
      </View>
      <MessageList userName={userName.current} />
      <View>
        <TextInput
          onChangeText={setText}
          style={styles.Input}
          placeholder="Введите Ваше сообщение"
        />
        {isError && <Text style={styles.Error}>{errorMessage}</Text>}
        <Button title="отправить сообщение" onPress={sendHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    padding: 10,
  },
  Text: {
    fontSize: 20,
    flex: 1,
  },
  MessageField: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  Input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    padding: 12,
    height: 60,
  },
  Error: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
});

export default DialogScreen;
