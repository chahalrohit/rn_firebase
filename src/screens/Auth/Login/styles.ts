import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from '../../../utils/Colors';
import * as constants from '../../../utils/Constants';
import * as Fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    marginHorizontal: constants.horizontalSpace / 2,
  } as ViewStyle,
  scrollViewContent: {
    flexGrow: 1,
  } as ViewStyle,
  signInText: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.extraLargeFont,
    color: Colors.baseColor,
  } as TextStyle,
  inputMarginTop: {
    marginTop: constants.resWidth(5),
  } as ViewStyle,
  signInButton: {
    marginTop: constants.resWidth(25),
  } as ViewStyle,
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: constants.resWidth(3),
  } as ViewStyle,
  signUpText: {
    fontFamily: Fonts.typeRegular,
    fontSize: Fonts.titleFont,
    color: Colors.textColor,
    textAlign: 'center',
  } as TextStyle,
  signUpLink: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.titleFont,
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
