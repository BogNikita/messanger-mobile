import React, { useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueueRequest } from '../store/actions/queue';

const WaitScreen = () => {
  const { queueLength, isSuccess } = useSelector(state => state.queue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQueueRequest());
  }, []);

  if (!isSuccess) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const queueText =
    queueLength > 0
      ? `Ваш номер в очереди ${queueLength}`
      : 'Вы следующий в очереди';

  return (
    <View style={styles.Container}>
      <View style={styles.TextWrapper}>
        <Text style={styles.Text}>{queueText}</Text>
        <Text style={styles.Text}>Вам скоро ответят</Text>
        <View style={styles.ImgWrapper}>
          <Image
            style={styles.Img}
            resizeMode={'stretch'}
            source={require('../assets/pingui.png')}
          />
        </View>
      </View>
      <Button title="Напомнить когда придет очередь" />
      <Button onPress={() => Actions.pop()} title="back" />
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
  Text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ImgWrapper: {
    height: 300,
    marginTop: 50,
  },
  Img: {
    flex: 1,
    width: 'auto',
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

export default WaitScreen;
