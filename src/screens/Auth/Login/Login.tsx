import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import LottieComponent from '../../../components/common/LottieComponent';
import {ToastMessage} from '../../../utils/Helpers';
import LottieFiles from '../../../utils/LottieFiles';
import {validateEmail} from '../../../utils/Validations';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = props => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onLogin = () => {
    if (!email) {
      ToastMessage({message: 'Please enter your email address'});
      return;
    } else if (!validateEmail(email)) {
      ToastMessage({message: 'Please enter a valid email address'});
      return;
    } else if (!password) {
      ToastMessage({message: 'Please enter your password'});
      return;
    } else if (password.length < 8) {
      ToastMessage({
        message: 'Password should be at least 8 characters long',
      });
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
          ToastMessage({message: 'User account created & signed in!'});
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            ToastMessage({message: 'That email address is already in use!'});
          }
          if (error.code === 'auth/invalid-email') {
            ToastMessage({message: 'That email address is invalid!'});
          }
          console.error(error);
        });
    }
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
        <Button
          buttonName="SIGN IN"
          onPress={onLogin}
          buttonStyle={styles.signInButton}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
