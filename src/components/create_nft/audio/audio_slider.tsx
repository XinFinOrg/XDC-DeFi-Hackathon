import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { Audio, AVPlaybackSource, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';

// TODO fazer interface para o resource
function AudioSlider({ resource }): JSX.Element {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound>();
  const [statusObject, setStatusObject] = useState<AVPlaybackStatus>();
  const audioDir =
    FileSystem.documentDirectory + Constants.manifest.extra.localAudioDirectory;

  const loadContent = async () => {
    try {
      const source = { uri: resource };
      const initialStatus = {
        shouldPlay: false,
        rate: 1.0,
        volume: 1.0,
      };

      const { sound, status } = await Audio.Sound.createAsync(
        source as AVPlaybackSource,
        initialStatus
      );
      setSoundObject(sound);
      setStatusObject(status);
      try {
        soundObject?.replayAsync();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    if (soundObject.lastPosition) {
      return soundObject.lastPosition / (soundObject.duration * 1000);
    }

    return 0;
  }; */

  const convertTime = (minutes: number) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2), 10);
      const sec = Math.ceil((60 * percent) / 100);

      if (parseInt(minute, 10) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(minute, 10) < 10) {
        return `0${minute}:${sec}`;
      }

      if (sec < 10) {
        return `${minute}:0${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };

  const pause = async () => {
    await soundObject?.pauseAsync();
  };

  return (
    <>
      <Slider
        style={{ height: 90 }}
        minimumValue={0}
        maximumValue={1}
        value={currentPosition}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#FFF"
        onValueChange={(value) => {
          setCurrentPosition(value * statusObject?.durationMillis);
        }}
        onSlidingStart={async () => {
          try {
            await pause();
          } catch (error) {
            console.log('error inside onSlidingStart callback', error);
          }
        }}
        onSlidingComplete={() => {
          setCurrentPosition(0);
        }}
      />
      <Text onPress={() => loadContent()}>ALO </Text>
    </>
  );
}

export default AudioSlider;
