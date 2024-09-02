import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LottieComponent from '../../components/common/LottieComponent';
import {ToastMessage} from '../../utils/Helpers';
import LottieFiles from '../../utils/LottieFiles';
import {validateEmail} from '../../utils/Validations';
import Colors from '../../utils/Colors';
import * as Fonts from '../../utils/Fonts';
import Header from '../../components/common/Header';
import * as constants from '../../utils/Constants';
import auth from '@react-native-firebase/auth';

interface Props {
  navigation: any;
}

const ContactForm: React.FC<Props> = props => {
  const {navigation} = props;
  const user = auth().currentUser;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState('');

  const onAddUserName = async () => {
    if (user?.displayName !== '') {
      ToastMessage({message: 'Already added please update!'});
    } else {
      const user = auth().currentUser;
      if (user) {
        try {
          await user.updateProfile({
            displayName: name,
          });
          ToastMessage({message: 'User name added successfully'});
        } catch (error) {
          console.error('Failed to update user name:', error);
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bgColor,
      }}>
      <Header title="Form" />
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
          Add User Name
        </Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          inputStyleExt={{marginTop: constants.resWidth(5)}}
        />
        {/* <Input
          placeholder="Phone"
          value={phone}
          onChangeText={(value: string) => setPhone(value)}
          inputStyleExt={{marginTop: constants.resWidth(5)}}
        /> */}
        <Button
          buttonName="Add Name"
          onPress={onAddUserName}
          buttonStyle={{marginTop: constants.resWidth(15)}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ContactForm;
