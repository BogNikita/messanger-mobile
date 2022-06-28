import React, { useRef, useState } from 'react';
import {
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  Modal,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { RNCamera } from 'react-native-camera';

const Camera = ({ setImgSrc }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const cameraEl = useRef(null);

  const takePicture = async () => {
    if (cameraEl && modalVisible) {
      const options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      try {
        const data = await cameraEl.current.takePictureAsync(options);
        setImgSrc(data.uri);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setModalVisible(false);
      }
    }
  };
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <RNCamera
            ref={cameraEl}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            activeOpacity={0.5}
            style={styles.btnAlignment}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              <Text style={{ fontSize: 15 }}> SNAP </Text>
            </TouchableOpacity>
          </RNCamera>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon color={'#89a0fa'} icon={faCamera} size={32} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  btn: {
    marginRight: 10,
  },
});

export default Camera;
