import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from '../../../utils/Colors';
import * as constants from '../../../utils/Constants';
import * as Fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  } as ViewStyle,
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: constants.horizontalSpace,
  } as ViewStyle,
  signInText: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.extraLargeFont,
    color: Colors.baseColor,
  } as TextStyle,
  inputMarginTop: {
    marginTop: constants.resWidth(5),
  } as ViewStyle,
  signUpButton: {
    marginTop: constants.resWidth(15),
  } as ViewStyle,
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: constants.resWidth(3),
  } as ViewStyle,
  signUpText: {
    fontFamily: Fonts.typeRegular,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
    textAlign: 'center',
  } as TextStyle,
  signUpLink: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.normalFont,
    color: Colors.baseColor,
    marginLeft: constants.resWidth(1),
  } as TextStyle,
  successToast: {
    borderLeftColor: '#5DE3B3',
  } as ViewStyle,
  toastContentContainer: {
    paddingHorizontal: 15,
  } as ViewStyle,
  toastText: {
    fontSize: 12,
    fontWeight: '700',
  } as TextStyle,
});
