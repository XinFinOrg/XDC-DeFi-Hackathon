import { Text, TextProps } from './Themed';
import React from 'react';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
