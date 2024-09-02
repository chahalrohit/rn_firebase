import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import {ToastMessage} from '../../utils/Helpers';
import styles from './styles';

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
    <SafeAreaView style={styles.container}>
      <Header title="Form" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titleText}>Add User Name</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          inputStyleExt={styles.inputStyle}
        />
        {/* <Input
          placeholder="Phone"
          value={phone}
          onChangeText={(value: string) => setPhone(value)}
          inputStyleExt={styles.inputStyle}
        /> */}
        <Button
          buttonName="Add Name"
          onPress={onAddUserName}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactForm;
