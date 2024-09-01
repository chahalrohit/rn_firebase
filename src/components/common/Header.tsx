import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

interface HeaderProps {
  title: string;
  leftAction?: () => void;
}

const Header: React.FC<HeaderProps> = ({title, leftAction}) => {
  return (
    <View style={styles.container as StyleProp<ViewStyle>}>
      {leftAction && (
        <TouchableOpacity
          style={styles.leftButton as StyleProp<ViewStyle>}
          onPress={leftAction}>
          <Icon name="arrow-back" size={resWidth(6)} color={Colors.textColor} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer as StyleProp<ViewStyle>}>
        <Text style={styles.titleText as StyleProp<TextStyle>}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = {
  container: {
    height: resWidth(14),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
  } as ViewStyle,
  leftButton: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  titleContainer: {
    flex: 0.85,
    alignItems: 'flex-start',
    justifyContent: 'center',
  } as ViewStyle,
  titleText: {
    fontFamily: Fonts.typeSemiBold,
    fontSize: Fonts.largeFont,
    color: Colors.textColor,
  } as TextStyle,
};
