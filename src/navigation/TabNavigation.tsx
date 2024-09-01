import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import ContactForm from '../screens/ContactForm/ContactForm';
import Dashboard from '../screens/Dashboard/Dashboard';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import SignUpList from '../screens/SignUpList/SignUpList';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Form" component={ContactForm} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="List" component={SignUpList} />
    </Tab.Navigator>
  );
}
