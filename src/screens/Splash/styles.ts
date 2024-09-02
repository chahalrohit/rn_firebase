import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import * as constants from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: constants.resWidth(60),
    width: constants.resWidth(60),
  },
  text: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.extraLargeFont,
    color: Colors.textColor,
  },
});
