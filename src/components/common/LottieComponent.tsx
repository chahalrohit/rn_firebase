import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import * as constants from '../../utils/Constants';
import Lottie, {AnimationObject} from 'lottie-react-native';
import lottieFiles from '../../utils/LottieFiles';

// Define the props interface
interface LottieComponentProps {
  style?: StyleProp<ViewStyle>; // Optional style prop for the container view
  lottieStyle?: StyleProp<ViewStyle>; // Optional style prop for the Lottie animation
  source: AnimationObject | number | any; // Source prop can be a JSON object or a require statement
}

const LottieComponent: React.FC<LottieComponentProps> = ({
  source,
  lottieStyle,
}) => {
  return (
    <Lottie
      style={[styles.lottie, lottieStyle]}
      source={source}
      autoPlay
      loop
    />
  );
};

export default LottieComponent;

const styles = StyleSheet.create({
  lottie: {
    width: constants.resWidth(100),
    height: constants.resWidth(100),
    alignSelf: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});
