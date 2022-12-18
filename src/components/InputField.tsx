import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholderTextColor={colors.text}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, color: colors.text}}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholderTextColor={colors.text}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, color: colors.text, backgroundColor: colors.background }}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: colors.primary, fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
