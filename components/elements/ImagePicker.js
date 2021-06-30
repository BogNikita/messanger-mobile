import React from 'react';
import { TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ImagePicker = ({ setImgSrc }) => {
  const chooseFile = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const uri = response?.assets[0]?.uri;
        setImgSrc(uri);
      }
    });
  };

  return (
    <TouchableOpacity onPress={chooseFile}>
      <FontAwesomeIcon icon={faFileImage} color={'#89a0fa'} size={32} />
    </TouchableOpacity>
  );
};

export default ImagePicker;
