import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import * as Fonts from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: Fonts.typeMedium,
    fontSize: Fonts.largeFont,
    color: Colors.textColor,
    textAlign: 'center',
  },
});
