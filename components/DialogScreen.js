/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { usePubNub } from 'pubnub-react';
import { fetchChatEnd, fetchChatNewMessage } from '../store/actions/chat';
import MessageList from './elements/MessageList';

const DialogScreen = () => {
  const {
    isError,
    errorMessage,
    chat: { id, messages, operatorName },
  } = useSelector(state => state.chat);

  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const [text, setText] = useState('');
  const [isTyping, setTyping] = useState(false);

  const timeoutCache = useRef(0);

  const typingSignal = useCallback(s => {
    if (
      s.message.typing === '0' &&
      s.message.id === id &&
      s.message.author === 'operator'
    ) {
      setTyping(false);
    }
    if (
      s.message.typing === '1' &&
      s.message.id === id &&
      s.message.author === 'operator'
    ) {
      setTyping(true);
    }
  }, []);

  useEffect(() => {
    pubnub.addListener({
      signal: typingSignal,
    });
    pubnub.subscribe({ channels: ['typing'] });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [typingSignal, pubnub]);

  const onInputChange = useCallback(
    inputValue => {
      clearInterval(timeoutCache.current);
      if ((inputValue && !isTyping) || (!inputValue && isTyping)) {
        pubnub.signal({
          channel: 'typing',
          message: {
            typing: inputValue ? '1' : '0',
            id,
            author: 'client',
          },
        });
      }
      timeoutCache.current = setTimeout(() => {
        pubnub.signal({
          channel: 'typing',
          message: {
            typing: '0',
            id,
            author: 'client',
          },
        });
      }, 5000);
      setText(inputValue);
      return;
    },
    [id, isTyping],
  );

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
        <Text style={styles.Text}>
          Вы общаетесь с опeратором {operatorName ? operatorName : ''}
        </Text>
        <Button title="Завершить диалог" onPress={clickHandler} />
      </View>
      {isTyping && (
        <Text style={styles.Typing}>Оператор набирает сообщение</Text>
      )}
      <MessageList userName={userName.current} />
      <View>
        <TextInput
          onChangeText={onInputChange}
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
  Typing: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555453',
    padding: 10,
  },
});

export default DialogScreen;
