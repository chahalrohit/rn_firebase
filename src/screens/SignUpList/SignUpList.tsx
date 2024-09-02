import functions from '@react-native-firebase/functions';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, SafeAreaView} from 'react-native';
import Header from '../../components/common/Header';
import Loader from '../../components/common/Loader';
import UserList from '../../components/list/UserList';
import styles from './styles';

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
      console.log('users ==>> ', JSON.stringify(users));
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

export default React.memo(SignUpList);
