import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import * as constants from '../../utils/Constants';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  scrollContainer: {
    paddingHorizontal: constants.horizontalSpace,
    justifyContent: 'flex-end',
  },
  updateText: {
    marginTop: constants.resWidth(5),
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.extraLargeFont,
    color: Colors.baseColor,
  },
  input: {
    marginTop: constants.resWidth(5),
  },
  button: {
    margin: resWidth(5),
  },
});
