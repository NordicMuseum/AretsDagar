/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Button, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CalendarScreen from './Screens/CalendarScreen';
import AlphabeticScreen from './Screens/AlphabeticScreen';
import { InfoScreen } from './Screens/InfoScreen';


class Calendar extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <CalendarScreen />
      </View>
    );
  }
}

class Alphabetic extends React.Component {
  render() {
    return (
      <View style={baseStyles}>
        <AlphabeticScreen />
      </View>
    );
  }
}

class Reminders extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Reminders Screen</Text>
      </View>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <InfoScreen />
      </View>
    );
  }
}

const RouteConfigs = {
  Calendar: {
    screen: Calendar,
  },
  Alphabetic: {
    screen: Alphabetic,
  },
  Reminders: {
    screen: Reminders,
  },
  Info: {
    screen: Info,
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Calendar',
  swipeEnabled: false,
  lazy: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#e26901',
    labelStyle: {
      fontSize: 12,
    },
    allowFontScaling: false,
  },
};

const baseStyles = {
  backgroundColor: '#1d1d1d',
  flex: 1,
  marginTop: 40,
}

const TabsView = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default createAppContainer(TabsView);
