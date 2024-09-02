import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContactForm from '../screens/ContactForm/ContactForm';
import Dashboard from '../screens/Dashboard/Dashboard';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import SignUpList from '../screens/SignUpList/SignUpList';
import Colors from '../utils/Colors';
import {resWidth} from '../utils/Constants';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';

type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Form: undefined;
  Profile: undefined;
  List: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<TabParamList, keyof TabParamList>;
      }): BottomTabNavigationOptions => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string | undefined;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return (
              <Ionicons name={iconName} size={resWidth(5)} color={color} />
            );
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={resWidth(5)}
                color={color}
              />
            );
          } else if (route.name === 'Form') {
            iconName = focused ? 'contacts' : 'contacts-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={resWidth(5)}
                color={color}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user-o';
            return (
              <FontAwesome name={iconName} size={resWidth(5)} color={color} />
            );
          } else {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
            return (
              <Ionicons name={iconName} size={resWidth(5)} color={color} />
            );
          }
        },
        tabBarActiveTintColor: Colors.baseColor,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: resWidth(2),
          height: resWidth(15),
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Form" component={ContactForm} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
        name="List"
        component={SignUpList}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}
