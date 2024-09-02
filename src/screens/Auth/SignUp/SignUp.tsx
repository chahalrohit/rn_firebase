import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Loader from '../../../components/common/Loader';
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

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);
  const [confirmVisiblePassword, setConfirmVisiblePassword] =
    useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSignUp = () => {
    if (!email) {
      ToastMessage({message: 'Please enter your email address'});
    } else if (!validateEmail(email)) {
      ToastMessage({message: 'Please enter a valid email address'});
    } else if (!password) {
      ToastMessage({message: 'Please enter your password'});
    } else if (password.length < 8) {
      ToastMessage({
        message: 'Password should be at least 8 characters long',
      });
    } else if (!confirmPassword) {
      ToastMessage({message: 'Please enter your password'});
    } else if (confirmPassword.length < 8) {
      ToastMessage({
        message: 'Password should be at least 8 characters long',
      });
    } else if (confirmPassword !== password) {
      ToastMessage({
        message: 'Password not confirmed',
      });
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            }),
          );
          setLoading(false);
          ToastMessage({message: 'User account created & signed in!'});
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            ToastMessage({
              message: 'That email address is already in use!',
            });
          }
          if (error.code === 'auth/invalid-email') {
            ToastMessage({message: 'That email address is invalid!'});
          }
          console.error(error);
        });
    }
  };

  // const signUpWithEmailAndPassword = async () => {
  //   try {
  //     // Create user with email and password
  //     const userCredential = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     const user = userCredential.user;

  //     // Update the user's profile with the name
  //     await user.updateProfile({
  //       displayName: name,
  //     });
  //   } catch (error) {
  //     console.error('Sign up failed:', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
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
        <Text style={[styles.signInText, {marginTop: resWidth(15)}]}>
          Create New Account
        </Text>
        {/* <Input
          placeholder="Name"
          value={name}
          onChangeText={(value: string) => setName(value)}
          inputStyleExt={styles.inputMarginTop}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChangeText={(value: string) => setPhone(value)}
          inputStyleExt={styles.inputMarginTop}
        /> */}
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
