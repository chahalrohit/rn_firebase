import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
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

const Dashboard = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bgColor,
      }}>
      <Header title="Dashboard" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            fontFamily: Fonts.typeSemiBold,
            fontSize: Fonts.largeFont,
            color: Colors.textColor,
            textAlign: 'center',
          }}>
          Dashboard
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
