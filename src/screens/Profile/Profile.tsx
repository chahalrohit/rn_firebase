import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, SafeAreaView, ScrollView, Text} from 'react-native';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import {ToastMessage} from '../../utils/Helpers';
import styles from './styles';

interface Props {
  navigation: any;
}

const Profile: React.FC<Props> = props => {
  const {navigation} = props;
  const user = auth().currentUser;

  const [name, setName] = useState(user?.displayName);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onUpdateName = async () => {
    if (user) {
      try {
        await user.updateProfile({
          displayName: name,
        });
        ToastMessage({message: 'User name updated successfully'});
      } catch (error) {
        console.error('Failed to update user name:', error);
      }
    } else {
      console.log('No user is signed in');
    }
  };

  const onLogout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        clearLocalStorage();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
        setLoading(false);
        console.log('User signed out!');
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  const clearLocalStorage = async () => {
    await AsyncStorage.removeItem('loginInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.updateText}>Update User Name</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          inputStyleExt={styles.input}
        />
        <Button
          buttonName="Update Name"
          onPress={onUpdateName}
          buttonStyle={styles.button}
        />
      </ScrollView>
      {!keyboardStatus && (
        <Button
          buttonName="Logout"
          onPress={onLogout}
          buttonStyle={styles.button}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
