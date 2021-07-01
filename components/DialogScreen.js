/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { usePubNub } from 'pubnub-react';
import {
  addNewMessage,
  fetchChatNewMessage,
  fetchChatUpdate,
} from '../store/actions/chat';
import MessageList from './elements/MessageList';
import SendMessage from './elements/SendMessage';

LogBox.ignoreLogs(['Setting a timer']);

const DialogScreen = () => {
  const {
    isError,
    errorMessage,
    chat: { id, messages, operatorName },
  } = useSelector(state => state.chat);

  const dispatch = useDispatch();
  const pubnub = usePubNub();

  const [isTyping, setTyping] = useState(false);

  const timeoutCache = useRef(0);
  const userName = messages[0]?.writtenBy;

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

  const sendMessage = message => {
    pubnub.publish({ channel: `channel_${id}`, message });
    dispatch(fetchChatNewMessage(message, id, messages.length));
  };
  const getNewMessage = useCallback(({ message }) => {
    if (message.writtenBy !== userName) {
      dispatch(addNewMessage(message));
    }
  }, []);

  useEffect(() => {
    pubnub.setUUID(userName);
    const listener = { signal: typingSignal, message: getNewMessage };
    pubnub.addListener(listener);
    pubnub.subscribe({ channels: ['typing', `channel_${id}`] });

    return () => {
      pubnub.unsubscribeAll();
      pubnub.removeListener(listener);
    };
  }, []);

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
    },
    [id, isTyping],
  );

  const clickHandler = () => {
    Actions.push('rate');
  };

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
      <MessageList userName={userName} messages={messages} />
      {isError && <Text style={styles.Error}>{errorMessage}</Text>}
      <SendMessage
        sendMessage={sendMessage}
        onInputChange={onInputChange}
        userName={userName}
      />
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
