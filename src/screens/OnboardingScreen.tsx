import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const OnboardingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: colors.text,
          }}>
          Welcome
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image 
        style={{ height: 300, width: 300}}
        source={require('../assets/backgrounds/Welcome.gif')} />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Let's Get You Setup
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color={colors.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
