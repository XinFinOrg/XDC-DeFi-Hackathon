import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import OpenAudioIcon from '../../../../assets/icons/open_audio_arrow.svg';
import CloseAudioIcon from '../../../../assets/icons/close_audio_arrow.svg';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
    color: 'rgba(255, 255, 255)',
    textAlign: 'left',
  },
  divider: {
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 1,
    marginTop: 50,
  },
  nameAndArrow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 5,
  },
});

function EditAudioHeader(isActive: boolean, section): JSX.Element {
  return (
    <>
      <View style={styles.divider} />
      <View style={styles.nameAndArrow}>
        {isActive ? <OpenAudioIcon /> : <CloseAudioIcon />}
        <TextInput placeholder="Aaa" style={styles.headerText} />
        <TouchableOpacity>
          <Text style={styles.editButton}>(edit)</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default EditAudioHeader;
