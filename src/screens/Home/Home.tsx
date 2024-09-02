import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Header from '../../components/common/Header';
import styles from './styles';

const db = SQLite.openDatabase(
  {
    name: 'userDB',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log('Error opening database:', error);
  },
);

const Home = () => {
  const user = auth().currentUser;

  useEffect(() => {
    getUserInfo(user?.uid);
  }, []);

  const getUserInfo = (uid: any) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM UserInfo WHERE uid = ?',
        [uid],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            console.log(`User Information:`, user);
          } else {
            console.log('No user information found for the given UID');
          }
        },
        error => {
          console.log('Error retrieving user information:', error);
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome To Firebase Auth Services !!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
