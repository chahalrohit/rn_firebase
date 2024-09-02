import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {borderRadius2, horizontalSpace, resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  flatListContentContainer: {
    marginTop: resWidth(3),
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    marginHorizontal: horizontalSpace,
    justifyContent: 'center',
    paddingVertical: resWidth(2),
    borderRadius: borderRadius2,
    marginVertical: resWidth(2),
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: resWidth(3),
  },
  labelText: {
    fontFamily: Fonts.typeBold,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
  },
  valueText: {
    fontFamily: Fonts.typeRegular,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
    marginLeft: resWidth(2),
  },
});
