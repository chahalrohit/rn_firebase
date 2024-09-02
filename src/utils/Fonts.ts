import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export const getFontSize = (size: any) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const typeLight: string = 'Poppins-Light';
export const typeExtraLight: string = 'Poppins-ExtraLight';
export const typeRegular: string = 'Poppins-Regular';
export const typeMedium: string = 'Poppins-Medium';
export const typeSemiBold: string = 'Poppins-SemiBold';
export const typeBold: string = 'Poppins-Bold';
export const typeExtraBold: string = 'Poppins-ExtraBold';

export const tinyFont: any =
  Platform.OS === 'ios' ? getFontSize(9) : getFontSize(8);
export const smallFont: any =
  Platform.OS === 'ios' ? getFontSize(10) : getFontSize(9);
export const normalFont: any =
  Platform.OS === 'ios' ? getFontSize(14) : getFontSize(13);
export const titleFont: any =
  Platform.OS === 'ios' ? getFontSize(15) : getFontSize(14);
export const buttonFont: any =
  Platform.OS === 'ios' ? getFontSize(14) : getFontSize(13);
export const largeFont: any =
  Platform.OS === 'ios' ? getFontSize(16) : getFontSize(15);
export const extraLargeFont: any =
  Platform.OS === 'ios' ? getFontSize(20) : getFontSize(19);
