import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native'

const SettingsScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{ color: colors.text }}>Settings</Text>
      
    </View>
  )
}

export default SettingsScreen