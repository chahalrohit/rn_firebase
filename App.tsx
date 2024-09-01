import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Toast, {BaseToast, ToastConfig} from 'react-native-toast-message';

// import screens
import Login from './src/screens/Auth/Login/Login';
import SignUp from './src/screens/Auth/SignUp/SignUp';

const Stack = createNativeStackNavigator();

function App() {
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      <Toast visibilityTime={1500} position="bottom" config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: '#5DE3B3',
  } as ViewStyle,
  toastContentContainer: {
    paddingHorizontal: 15,
  } as ViewStyle,
  toastText: {
    fontSize: 12,
    fontWeight: '700',
  } as TextStyle,
});
