import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utils/Colors';
import * as constants from '../../utils/Constants';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

// Define the props interface
interface ButtonProps {
  buttonName: string;
  onPress: () => void;
  buttonStyle?: any;
}

// Convert the component to TypeScript
const Button: React.FC<ButtonProps> = ({buttonName, onPress, buttonStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={[Colors.gradient3, Colors.gradient2, Colors.gradient3]}
        style={
          {
            height: resWidth(14),
            width: resWidth(100) - constants.horizontalSpace,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: constants.borderRadius1,
            alignSelf: 'center',
          } as StyleProp<ViewStyle>
        }>
        <Text
          style={
            {
              fontFamily: Fonts.typeMedium,
              fontSize: Fonts.buttonFont,
              color: Colors.whiteColor,
            } as StyleProp<TextStyle>
          }>
          {buttonName}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginTop: resWidth(5),
  },
});
