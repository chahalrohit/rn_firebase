import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';

// Define the props interface if needed
interface HeaderProps {
  onBackPress?: () => void; // Add a prop for handling back button press if needed
}

const Header: React.FC<HeaderProps> = ({onBackPress}) => {
  return (
    <View
      style={
        {
          height: resWidth(14),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        } as StyleProp<ViewStyle>
      }>
      <TouchableOpacity
        style={
          {
            flex: 0.15,
            alignItems: 'center',
            justifyContent: 'center',
          } as StyleProp<ViewStyle>
        }
        onPress={onBackPress}>
        <Icon name="arrow-back" size={resWidth(6)} color={Colors.textColor} />
      </TouchableOpacity>
      <View
        style={
          {
            flex: 0.85,
            alignItems: 'flex-start',
            justifyContent: 'center',
          } as StyleProp<ViewStyle>
        }>
        <Text
          style={
            {
              fontFamily: Fonts.typeSemiBold,
              fontSize: Fonts.largeFont,
              color: Colors.textColor,
            } as StyleProp<TextStyle>
          }>
          Home
        </Text>
      </View>
    </View>
  );
};

export default Header;
