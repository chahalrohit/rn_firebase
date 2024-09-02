import functions from '@react-native-firebase/functions';
import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {FlatList, ListRenderItem, SafeAreaView, StyleSheet} from 'react-native';
import Header from '../../components/common/Header';
import Loader from '../../components/common/Loader';
import UserList from '../../components/list/UserList';
import Colors from '../../utils/Colors';
import {borderRadius2, horizontalSpace, resWidth} from '../../utils/Constants';
import * as Fonts from '../../utils/Fonts';

interface User {
  email: string;
  displayName?: string | null;
}

const SignUpList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      const result = await functions().httpsCallable<null, User[]>(
        'listAllUsers',
      )();
      const users: User[] = result.data;
      setData(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const renderItem: ListRenderItem<User> = useCallback(
    ({item, index}) => {
      return <UserList item={item} index={index} />;
    },
    [data],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Users List" />
      <Loader loading={loading} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default React.memo(SignUpList);
