import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Camera from './Camera';
import ImagePicker from './ImagePicker';

const SendMessage = ({ onInputChange, userName, sendMessage }) => {
  const [text, setText] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const inputHandler = value => {
    onInputChange(value);
    setText(value);
  };

  const sendHandler = useCallback(() => {
    if (text || imgSrc) {
      const message = {
        content: text,
        imgSrc,
        writtenBy: userName,
        timestamp: Date.now(),
      };
      sendMessage(message);
      setImgSrc('');
      setText('');
    }
  }, [text, imgSrc]);
  return (
    <View style={styles.Form}>
      <TextInput
        onChangeText={inputHandler}
        style={styles.Input}
        placeholder="Введите Ваше сообщение"
        value={text}
      />
      <View style={styles.Icon}>
        <Camera setImgSrc={setImgSrc} />
        <ImagePicker setImgSrc={setImgSrc} />
        <TouchableOpacity onPress={sendHandler}>
          <FontAwesomeIcon icon={faPaperPlane} color={'#89a0fa'} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    padding: 12,
    height: 60,
    flex: 2,
  },
  Form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
});

export default SendMessage;
