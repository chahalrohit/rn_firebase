import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import LottieComponent from '../../../components/common/LottieComponent';
import {resWidth} from '../../../utils/Constants';
import {ToastMessage} from '../../../utils/Helpers';
import LottieFiles from '../../../utils/LottieFiles';
import {validateEmail} from '../../../utils/Validations';
import styles from './styles';

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = props => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);
  const [confirmVisiblePassword, setConfirmVisiblePassword] =
    useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onSignUp = () => {
    navigation.navigate('SignUp');
    if (!email) {
      ToastMessage({message: 'Please enter your email address'});
      return;
    }

    if (!validateEmail(email)) {
      ToastMessage({message: 'Please enter a valid email address'});
      return;
    }

    if (!password) {
      ToastMessage({message: 'Please enter your password'});
      return;
    }

    if (password.length < 8) {
      ToastMessage({
        message: 'Password should be at least 8 characters long',
      });
    }

    if (!confirmPassword) {
      ToastMessage({message: 'Please enter your password'});
      return;
    }

    if (confirmPassword.length < 8) {
      ToastMessage({
        message: 'Password should be at least 8 characters long',
      });
    }

    if (confirmPassword !== password) {
      ToastMessage({
        message: 'Password not confirmed',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <LottieComponent
          source={LottieFiles.signup}
          lottieStyle={{
            height: resWidth(70),
            width: resWidth(70),
            marginTop: resWidth(10),
          }}
        />
        <Text style={[styles.signInText, {marginTop: resWidth(12)}]}>
          Create New Account
        </Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value: string) => setEmail(value)}
          inputStyleExt={styles.inputMarginTop}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(value: string) => setPassword(value)}
          inputStyleExt={styles.inputMarginTop}
          secureTextEntry
          visiblePassword={visiblePassword}
          setVisiblePassword={() => setVisiblePassword(!visiblePassword)}
          maxLength={8}
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(value: string) => setConfirmPassword(value)}
          inputStyleExt={styles.inputMarginTop}
          secureTextEntry
          visiblePassword={confirmVisiblePassword}
          setVisiblePassword={() =>
            setConfirmVisiblePassword(!confirmVisiblePassword)
          }
          maxLength={8}
        />
        <Button
          buttonName="SIGN UP"
          onPress={onSignUp}
          buttonStyle={styles.signUpButton}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signUpLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
