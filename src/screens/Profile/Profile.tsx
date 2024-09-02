import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import * as constants from '../../utils/Constants';
import LottieComponent from '../../components/common/LottieComponent';
import {ToastMessage} from '../../utils/Helpers';
import LottieFiles from '../../utils/LottieFiles';
import {validateEmail} from '../../utils/Validations';
import Colors from '../../utils/Colors';
import * as Fonts from '../../utils/Fonts';
import Header from '../../components/common/Header';
import auth from '@react-native-firebase/auth';
import {resWidth} from '../../utils/Constants';
import {CommonActions} from '@react-navigation/native';
import Loader from '../../components/common/Loader';

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

    // Cleanup the listeners on unmount
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bgColor,
      }}>
      <Loader loading={loading} />
      <Header title="Profile" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: constants.horizontalSpace,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            marginTop: constants.resWidth(5),
            fontFamily: Fonts.typeSemiBold,
            fontSize: Fonts.extraLargeFont,
            color: Colors.baseColor,
          }}>
          Update User Name
        </Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          inputStyleExt={{marginTop: constants.resWidth(5)}}
        />
        <Button
          buttonName="Update Name"
          onPress={onUpdateName}
          buttonStyle={{margin: resWidth(5)}}
        />
      </ScrollView>
      {!keyboardStatus && (
        <Button
          buttonName="Logout"
          onPress={onLogout}
          buttonStyle={{margin: resWidth(5)}}
        />
      )}
    </SafeAreaView>
  );
};
export default Profile;
