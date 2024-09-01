import {Dimensions} from 'react-native';

export const deviceHeight: number = Dimensions.get('screen').height;
export const deviceWidth: number = Dimensions.get('screen').width;

export const resHeight = (h: number): number => {
  return (deviceHeight * h) / 100;
};

export const resWidth = (w: number): number => {
  return (deviceWidth * w) / 100;
};

export const barBackground: string = '#fff';
export const barStyle: string = 'dark-content';

export const borderRadius1: number = resWidth(1);
export const borderRadius2: number = resWidth(2);
export const borderRadius3: number = resWidth(3);
export const cardRadius: number = resWidth(2);

export const horizontalSpace: number = resWidth(12);
export const verticalSpace: number = resWidth(3);
