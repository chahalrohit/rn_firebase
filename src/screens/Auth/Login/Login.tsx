import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SQLite from 'react-native-sqlite-storage';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Loader from '../../../components/common/Loader';
import LottieComponent from '../../../components/common/LottieComponent';
import {ToastMessage} from '../../../utils/Helpers';
import LottieFiles from '../../../utils/LottieFiles';
import {validateEmail} from '../../../utils/Validations';
import styles from './styles';

const db = SQLite.openDatabase(
  {
    name: 'MyDatabase.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database:', error);
  },
);

const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS UserInfo (
        uid TEXT PRIMARY KEY,
        displayName TEXT,
        email TEXT,
        emailVerified INTEGER,
        isAnonymous INTEGER,
        creationTime INTEGER,
        lastSignInTime INTEGER,
        phoneNumber TEXT,
        photoURL TEXT,
        providerId TEXT,
        tenantId TEXT
      )`,
      [],
      (tx, results) => {
        console.log('User table created successfully');
      },
      error => {
        console.log('Error creating user table:', error);
      },
    );
  });
};

// Call createUserTable to create the table
createUserTable();

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = props => {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onLogin = () => {
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
    } else {
      setLoading(true);
      signInWithEmailPassword(email, password);
    }
  };

  const signInWithEmailPassword = async (email: any, password: any) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User signed in:', JSON.stringify(userCredential.user));
      saveUserInfo(userCredential?.user);
      await AsyncStorage.setItem(
        'loginInfo',
        JSON.stringify(userCredential.user),
      );
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        }),
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
    }
  };

  const saveUserInfo = (userInfo: any) => {
    const {
      uid,
      displayName,
      email,
      emailVerified,
      isAnonymous,
      metadata: {creationTime, lastSignInTime},
      phoneNumber,
      photoURL,
      providerId,
      tenantId,
    } = userInfo;

    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO UserInfo (uid, displayName, email, emailVerified, isAnonymous, creationTime, lastSignInTime, phoneNumber, photoURL, providerId, tenantId) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          uid,
          displayName,
          email,
          emailVerified ? 1 : 0, // Store boolean as 1 or 0
          isAnonymous ? 1 : 0, // Store boolean as 1 or 0
          creationTime,
          lastSignInTime,
          phoneNumber,
          photoURL,
          providerId,
          tenantId,
        ],
        (tx, results) => {
          console.log('User information saved successfully');
        },
        error => {
          console.log('Error saving user information:', error);
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
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
