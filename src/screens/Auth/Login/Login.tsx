import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast, {BaseToast, ToastConfig} from 'react-native-toast-message';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import LottieComponent from '../../../components/common/LottieComponent';
import {ToastMessage} from '../../../utils/Helpers';
import LottieFiles from '../../../utils/LottieFiles';
import {validateEmail} from '../../../utils/Validations';
import styles from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);

  const onLogin = () => {
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
      return;
    }
  };

  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={styles.successToast}
        text1NumberOfLines={3}
        contentContainerStyle={styles.toastContentContainer}
        text1Style={styles.toastText}
      />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <LottieComponent source={LottieFiles.login} />
        <Text style={styles.signInText}>Sign In</Text>
        <Input
          placeholder="Enter your email address"
          value={email}
          onChangeText={(value: string) => setEmail(value)}
          inputStyleExt={styles.inputMarginTop}
        />
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={(value: string) => setPassword(value)}
          inputStyleExt={styles.inputMarginTop}
          secureTextEntry
          visiblePassword={visiblePassword}
          setVisiblePassword={() => setVisiblePassword(!visiblePassword)}
          maxLength={8}
        />
        <Button
          buttonName="SIGN IN"
          onPress={onLogin}
          buttonStyle={styles.signInButton}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Toast visibilityTime={1500} position="bottom" config={toastConfig} />
    </SafeAreaView>
  );
};

export default Login;
