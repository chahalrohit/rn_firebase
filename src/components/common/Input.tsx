import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../utils/Colors';
import * as constants from '../../utils/Constants';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/Feather';

// Define the props interface
interface InputProps {
  value: any;
  maxLength?: number;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean; // Optional prop for secure text entry
  inputTitle?: string;
  inputStyleExt?: any;
  visiblePassword?: boolean;
  setVisiblePassword?: (value: any) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  maxLength,
  onChangeText,
  placeholder,
  secureTextEntry,
  inputTitle,
  inputStyleExt,
  visiblePassword,
  setVisiblePassword,
}) => {
  return (
    <View
      style={
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderBottomWidth: resWidth(0.25),
          borderColor: Colors.grayColor,
        } as ViewStyle
      }>
      {inputTitle && (
        <Text
          style={
            {
              fontFamily: Fonts.typeRegular,
              fontSize: Fonts.titleFont,
              color: Colors.textColor,
              marginBottom: resWidth(1),
              alignSelf: 'flex-start',
              marginLeft: constants.horizontalSpace / 2,
            } as TextStyle
          }>
          {inputTitle}
        </Text>
      )}
      <TextInput
        style={[styles.textInput, inputStyleExt]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholderTextColor}
        onChangeText={onChangeText}
        secureTextEntry={visiblePassword}
        maxLength={maxLength}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={setVisiblePassword}>
          <Icon
            name={visiblePassword ? 'eye-off' : 'eye'}
            color={Colors.grayColor}
            size={resWidth(4.5)}
            style={{
              alignSelf: 'center',
              marginTop: resWidth(6),
              marginRight: resWidth(3),
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    width: resWidth(100) - constants.horizontalSpace,
    height: resWidth(13),
    borderRadius: constants.borderRadius1,
    // paddingLeft: resWidth(4),
    fontFamily: Fonts.typeRegular,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
  } as TextStyle,
});
