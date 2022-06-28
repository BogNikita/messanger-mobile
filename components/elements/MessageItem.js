import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Image, Animated } from 'react-native';
import moment from 'moment';

function MessageItem({ timestamp, content, writtenBy, userName, imgSrc }) {
  console.log('render MessageItem');
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1500,
    }).start();
  }, []);
  return (
    <Animated.View
      style={[
        styles.Message,
        userName === writtenBy ? styles.User : styles.Operator,
        { opacity: value },
      ]}>
      <Text>{content}</Text>
      {imgSrc ? (
        <Image
          style={styles.Img}
          resizeMode={'stretch'}
          source={{ uri: imgSrc }}
        />
      ) : null}
      <Text style={styles.MessageTime}>{moment(timestamp).calendar()}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Message: {
    backgroundColor: '#f3f3f3',
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  Img: {
    height: 100,
    width: 100,
  },
  MessageTime: {
    fontStyle: 'italic',
  },
  Operator: {
    alignSelf: 'flex-start',
  },
  User: {
    alignSelf: 'flex-end',
  },
});

export default React.memo(MessageItem);
