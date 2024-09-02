import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar, Text} from 'react-native';
import Colors from '../../utils/Colors';
import images from '../../utils/Images';
import styles from './styles';

interface Props {
  navigation: any;
}

const Splash: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkUserInfo();
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const checkUserInfo = async () => {
    try {
      const userdata = await AsyncStorage.getItem('loginInfo');
      console.log('\n');
      console.log('<<--splash userInfo-->> ');
      console.log(userdata);
      console.log('\n');

      if (userdata !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.whiteColor}
        barStyle={'dark-content'}
      />
      <Image source={images.firebase} style={styles.image} />
      <Text style={styles.text}>RN Firebase</Text>
    </SafeAreaView>
  );
};

export default Splash;
