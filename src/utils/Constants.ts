import React from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const basicScale = (size: any) =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = (size: any) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size: any, factor: any = 0.5) =>
  size + (basicScale(size) - size) * factor;

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const getFontSize = (size: any) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const deviceHeight: number = Dimensions.get('screen').height;
export const deviceWidth: number = Dimensions.get('screen').width;

export const resHeight = (h: number): number => {
  return (deviceHeight * h) / 100;
};

export const resWidth = (w: number): number => {
  return (deviceWidth * w) / 100;
};

export const extraLargeFont: any =
  Platform.OS === 'ios' ? getFontSize(21) : getFontSize(22);
export const largeFont: any =
  Platform.OS === 'ios' ? getFontSize(16) : getFontSize(17);
export const headline1: any =
  Platform.OS === 'ios' ? getFontSize(14) : getFontSize(15);
export const headline2: any =
  Platform.OS === 'ios' ? getFontSize(13) : getFontSize(14);
export const titleFont: any =
  Platform.OS === 'ios' ? getFontSize(12) : getFontSize(13);
export const normalFont: any =
  Platform.OS === 'ios' ? getFontSize(11) : getFontSize(12);
export const smallFont: any =
  Platform.OS === 'ios' ? getFontSize(10) : getFontSize(11);
export const tinyFont: any =
  Platform.OS === 'ios' ? getFontSize(9) : getFontSize(10);

export const barBackground: string = '#fff';
export const barStyle: string = 'dark-content';

export const borderRadius1: number = resWidth(2);
export const borderRadius2: number = resWidth(3);
export const borderRadius3: number = resWidth(4);
export const cardRadius: number = resWidth(2);

export const horizontalSpace: number = resWidth(3);
export const verticalSpace: number = moderateScale(5);

export const typeLight: string = 'Poppins-Light';
export const typeExtraLight: string = 'Poppins-ExtraLight';
export const typeRegular: string = 'Poppins-Regular';
export const typeMedium: string = 'Poppins-Medium';
export const typeSemiBold: string = 'Poppins-SemiBold';
export const typeBold: string = 'Poppins-Bold';
export const typeExtraBold: string = 'Poppins-ExtraBold';

// export const showAlert = (
//   message: string,
//   text?: string,
//   snackAction?: () => void,
//   showTime?: string,
// ): void => {
//   Snackbar.show({
//     text: message,
//     duration:
//       showTime === undefined
//         ? Snackbar.LENGTH_SHORT
//         : showTime === 'long'
//         ? Snackbar.LENGTH_LONG
//         : showTime === 'infinte'
//         ? Snackbar.LENGTH_INDEFINITE
//         : Snackbar.LENGTH_SHORT,
//     action: {
//       text: 'OK',
//       onPress: snackAction,
//       // textColor: colors.whiteColor,
//     },
//     // backgroundColor: colors.baseColor,
//     fontFamily: typeRegular,
//     // textColor: colors.whiteColor,
//   });
// };

export const validateMobile = (mobile: string): boolean => {
  const regex = /^[0-9][0-9]{9}$/;
  return regex.test(mobile);
};

// ... (remaining functions, same pattern)

// function for email validation
export const validateEmail = (email: string) => {
  const regex =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
  return regex.test(email);
};

export const validateName = (name: string) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name);
};

export const validateNumber = (name: string) => {
  const regex = /^\d+$/;
  return regex.test(name);
};

export const greaterThanZero = (value: any) => {
  const regex = /^0*?[1-9]\d*$/;
  return regex.test(value);
};

export const validateGstNumber = (value: string) => {
  const regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  return regex.test(value);
};

export const validatePanNumber = (value: string) => {
  const regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  return regex.test(value);
};

export const validateCinNumber = (value: any) => {
  const regex =
    /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
  return regex.test(value);
};

export const validateAlphaNumeric = (value: any) => {
  const regex = /^[0-9a-zA-Z]+$/;
  return regex.test(value);
};

export const capitalizeFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};
