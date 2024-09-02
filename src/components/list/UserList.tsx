import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import Colors from '../../utils/Colors';
import * as constants from '../../utils/Constants';
import {resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

interface User {
  email: string;
  displayName?: string | null;
}

interface UserListProps {
  item: User;
  index: number;
}

const UserList: React.FC<UserListProps> = ({item, index}) => {
  return (
    <View style={styles.itemContainer}>
      {item?.displayName !== null && (
        <View style={styles.infoRow}>
          <Text style={styles.labelText}>Name :</Text>
          <Text style={styles.valueText}>{item?.displayName}</Text>
        </View>
      )}
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>Email :</Text>
        <Text style={styles.valueText}>{item?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    marginHorizontal: constants.horizontalSpace,
    justifyContent: 'center',
    paddingVertical: resWidth(2),
    borderRadius: constants.borderRadius2,
    marginVertical: resWidth(2),
  } as ViewStyle,
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: resWidth(3),
  } as ViewStyle,
  labelText: {
    fontFamily: Fonts.typeBold,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
  } as TextStyle,
  valueText: {
    fontFamily: Fonts.typeRegular,
    fontSize: Fonts.normalFont,
    color: Colors.textColor,
    marginLeft: resWidth(2),
  } as TextStyle,
});

export default UserList;
